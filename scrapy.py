HEADER_FONT_SIZE = 59.808998107910156

def get_block_info(block: tuple) -> tuple:
    is_title = block[0] == HEADER_FONT_SIZE
    try:
        if is_title:
            float(block[4].strip().split("\n")[-1])
            is_title = True
    except: 
        is_title = False
    return is_title, block[4]

def get_page_blocks(document, page_number: int) -> "list[str]":
    page = document[page_number]
    page_blocks = page.get_text("blocks")
    return list(map(get_block_info, page_blocks))

def get_page_text(document, page_number: int) -> "list[str]":
    page = document[page_number]
    return page.get_text().split("\n")

def get_hours(string: str) -> int:
    gt_ten = lambda x: x > 10
    string = re.sub("[ \.]", "", string)
    string = re.findall("[0-9]+", string)
    number = filter(gt_ten, map(int, string))
    return list(number)

def get_semester(string: str) -> int:
    return int(re.findall("[0-9]+", string)[0])

def get_discipline_infos(string: str) -> "tuple[str]":
    (name, _type, _, _, total, credits) = string.split("\n")
    disc_cod, disc_name = name.split("- ")
    disc_credits = int(float(credits))
    disc_type = _type == "OBRIG"
    disc_hours = int(total)
    
    return (disc_cod, disc_name, disc_type, 
            disc_hours, disc_credits)

def get_equivalences(string: str) -> list:
    equivalence_list = []
    if "NÃO" in string:
        return equivalence_list

    splitted_string = string.strip().split("\n")
    for discipline in splitted_string:
        discipline_splitted = discipline.split("- ")
        if len(discipline_splitted) != 2: continue
        code, name = discipline_splitted
        equivalence_list.append({
            "code": code,
            "name": name
        })
    return equivalence_list

def general_course_infos(document) -> "tuple[str, str, int, int, int]":
    total_hours = 0
    elective_hours = 0
    university_name = ""
    obligatory_hours = 0

    last_page = document.pageCount - 1
    course_name = document.name

    for string in get_page_text(document, last_page):
        string = string.upper().strip()
        if "PLENA" in string:
            total_hours = get_hours(string)[0]
        elif "CURSO:" in string:
            course_name = string.replace("CURSO: ", "")
        elif "UNIVERSIDADE" in string:
            university_name = string
        elif "ELETIVOS" in string and "OBRIGATÓRIOS" in string:
            try:
                obligatory_hours, elective_hours = get_hours(string)
            except:
                print("[WARNING] Could not get elective and obligatory hours")
    return university_name, course_name, total_hours, elective_hours, obligatory_hours

def get_equivalence_and_prereq_controls(string: str, 
        is_equivalence: bool, is_prerequisite: bool,
        ementa: str, disc_equivalences: list
    ) -> "tuple[bool, tuple[bool, bool, str, list]]":
    continue_flag = True
    if "EQUIVALÊNCIA" in string:
        is_equivalence = True
        continue_flag = False
    elif "PRÉ-REQUISITO:" in string and "NÃO" not in string:
        is_prerequisite = True
        continue_flag = False
    elif "EMENTA:" in string:
        equivalences, ementa = string.split("EMENTA:")
        if equivalences:
            disc_equivalences = get_equivalences(equivalences)
        ementa = ementa.replace("\n", " ").strip()
        is_equivalence = False
        continue_flag = False
    return continue_flag, (is_equivalence, is_prerequisite, 
                           ementa, disc_equivalences)

def get_equivalence_and_prereq_values(string: str, 
        is_equivalence: bool, is_prerequisite: bool,
        disc_prerequisites: list, disc_equivalences: list
    ) -> "tuple[bool, bool, list, list]":
    if is_equivalence:
        disc_equivalences = get_equivalences(string)
        is_equivalence = False
    elif is_prerequisite:
        splitted_string = string.split("CO-REQUISITO:")
        if len(splitted_string) == 2:
            pre_req, _ = splitted_string
        else: pre_req = splitted_string[0]
        disc_prerequisites = get_equivalences(pre_req)
        is_prerequisite = False
    return is_equivalence, is_prerequisite, disc_prerequisites, disc_equivalences

def save_json_file(output_path: str, university_name: str, course_name: str,
                   total_hours: int, elective_hours: int, obligatory_hours: int,
                   semesters: int, disciplines: list):
    with open(output_path, "w", encoding="UTF-8") as file:
        json.dump({
            "university": university_name,
            "course": course_name,
            "semesters": semesters,
            "totalHours": total_hours,
            "totalHoursElective": elective_hours,
            "totalHoursObligatory": obligatory_hours,
            "disciplines": disciplines,
        }, file, ensure_ascii=False, indent=2)

def fill_disciplines_dependents(disciplines_list: list) -> list:
    for discipline_i in disciplines_list:
        discipline_i["dependents"] = []
        for discipline_j in disciplines_list:
            if discipline_i == discipline_j:
                continue
            else:
                for item in discipline_j.prerequisites:
                    if discipline_i.code == item["code"]:
                        discipline_i["dependents"].append({
                            "code": discipline_j.code
                            })
    return discipline_i

def pdf_to_json(pdf_path: str, output_json: str):
    document = fitz.open(pdf_path)

    current_semester = 0
    disciplines = []
    semesters = 0

    (university_name, course_name, 
    total_hours, elective_hours, 
    obligatory_hours) = general_course_infos(document)

    is_equivalence = False
    disc_equivalences = []
    is_prerequisite = False
    disc_prerequisites = []
    ementa, disc_type = "", ""
    disc_cod, disc_name = "", ""
    disc_credits, disc_hours = 0, 0
    for page in range(document.pageCount):
        for is_title, string in get_page_blocks(document, page):
            string = string.upper().strip()
            continue_flag, infos = get_equivalence_and_prereq_controls(string, 
                is_equivalence, is_prerequisite, ementa, disc_equivalences)
            if not continue_flag:
                is_equivalence, is_prerequisite, ementa, disc_equivalences = infos
            elif "PERÍODO" in string:
                current_semester = get_semester(string)
                semesters = max(current_semester, semesters)
            elif is_title:
                splitted = string.split("\n") 
                string = "\n".join(splitted[-6:])
                if is_equivalence:
                    if "NÃO" not in splitted[0]:
                        disc_equivalences = [{
                            "code": each.split("- ")[0],
                            "name": each.split("- ")[1]
                        } for each in splitted[:-6]]
                    is_equivalence = False
                if disc_cod != "":
                    disciplines.append({
                        "name": disc_name,
                        "code": disc_cod,
                        "ementa": ementa,
                        "hours": disc_hours,
                        "credits": disc_credits,
                        "isObligatory": disc_type,
                        "semester": current_semester,
                        "equivalences": disc_equivalences,
                        "prerequisites": disc_prerequisites,
                    })
                    ementa = ""
                    disc_equivalences = []
                    disc_prerequisites = []
                
                (name, _type, _, _, total, credits) = string.split("\n")
                disc_cod, disc_name = name.split("- ")
                disc_credits = int(float(credits))
                disc_type = "OBRIG" in _type
                disc_hours = int(total)
            else:
                (is_equivalence, is_prerequisite, 
                disc_prerequisites, disc_equivalences
                ) = get_equivalence_and_prereq_values(string,
                    is_equivalence, is_prerequisite, 
                    disc_prerequisites, disc_equivalences)

    disciplines.append({
        "name": disc_name,
        "code": disc_cod,
        "ementa": ementa,
        "hours": disc_hours,
        "credits": disc_credits,
        "isObligatory": disc_type,
        "semester": current_semester,
        "equivalences": disc_equivalences,
        "prerequisites": disc_prerequisites,
    })

    save_json_file(output_json, university_name, course_name,
                   total_hours, elective_hours, obligatory_hours,
                   semesters, disciplines)

def pdf_to_json_2(pdf_path: str, output_json: str):
    """
    Scraps the PDF file getting the information and
    writing it to a JSON file. This version was made
    to Computer Engineering course.
    """
    document = fitz.open(pdf_path)

    disciplines = []
    semesters = 0
    semester = 0

    (university_name, course_name, 
    total_hours, elective_hours, 
    obligatory_hours) = general_course_infos(document)

    is_equivalence = False
    disc_equivalences = []
    is_prerequisite = False
    disc_prerequisites = []
    ementa, disc_type = "", ""
    disc_cod, disc_name = "", ""
    disc_credits, disc_hours = 0, 0
    for page in range(document.pageCount):
        for is_title, string in get_page_blocks(document, page):
            string = string.upper().strip()
            continue_flag, infos = get_equivalence_and_prereq_controls(string, 
                is_equivalence, is_prerequisite, ementa, disc_equivalences)
            if not continue_flag:
                is_equivalence, is_prerequisite, ementa, disc_equivalences = infos
            elif is_title:
                splitted = string.split("\n") 
                string = "\n".join(splitted[-7:])
                if is_equivalence:
                    if "NÃO" not in splitted[0]:
                        disc_equivalences = [{
                            "code": each.split("- ")[0],
                            "name": each.split("- ")[1]
                        } for each in splitted[:-7]]
                    is_equivalence = False
                if disc_cod != "":
                    disciplines.append({
                        "name": disc_name,
                        "code": disc_cod,
                        "ementa": ementa,
                        "hours": disc_hours,
                        "semester": semester,
                        "credits": disc_credits,
                        "isObligatory": disc_type,
                        "equivalences": disc_equivalences,
                        "prerequisites": disc_prerequisites,
                    })
                    ementa = ""
                    disc_equivalences = []
                    disc_prerequisites = []
                
                (name, _type, period, 
                _, _, total, credits) = string.split("\n")
                disc_cod, disc_name = name.split("- ")
                disc_credits = int(float(credits))
                disc_type = "OBRIG" in _type
                disc_hours = int(total)
                semester = int(period)
                semesters = max(semester, semesters)
            else:
                (is_equivalence, is_prerequisite, 
                disc_prerequisites, disc_equivalences
                ) = get_equivalence_and_prereq_values(string,
                    is_equivalence, is_prerequisite, 
                    disc_prerequisites, disc_equivalences)
    disciplines.append({
        "name": disc_name,
        "code": disc_cod,
        "ementa": ementa,
        "hours": disc_hours,
        "semester": semester,
        "credits": disc_credits,
        "isObligatory": disc_type,
        "equivalences": disc_equivalences,
        "prerequisites": disc_prerequisites,
    })
    print(disciplines)   
    save_json_file(output_json, university_name, course_name,
                   total_hours, elective_hours, obligatory_hours,
                   semesters, disciplines)

if __name__ == "__main__":
    pdf_to_json_2(sys.argv[1], sys.argv[2])
