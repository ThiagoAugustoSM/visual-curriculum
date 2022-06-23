import sys, fitz
import re, json
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
    if "SEM PERIODIZAÇÃO" == string: return 0
    return int(re.findall("[0-9]+", string)[0])

def get_equivalences(string: str) -> list:
    equivalence_list = []
    if "NÃO" in string:
        return equivalence_list

    splitted_string = string.strip().split("\n")
    for discipline in splitted_string:
        discipline_splitted = discipline.split("- ")
        disc_cod = discipline_splitted[0].strip()
        disc_name = "- ".join(discipline_splitted[1:])
        if disc_name == "": continue
        equivalence_list.append({
            "code": disc_cod,
            "name": disc_name,
        })
    return equivalence_list

def general_course_infos(document) -> "tuple[str, str, int, int, int]":
    total_hours = 0
    elective_hours = 0
    university_name = ""
    obligatory_hours = 0
    
    search_hours = False
    search_curso = False
    hour_list = []

    last_page = document.pageCount - 1
    course_name = document.name

    for string in get_page_text(document, last_page):
        string = string.upper().strip()
        if search_curso and "CURSO:" in string:
            course_name = string.replace("CURSO: ", "")
            search_curso = False
        elif "UNIVERSIDADE" in string:
            university_name = string
            search_curso = True
        elif search_hours:
            try:
                hour_list.extend(get_hours(string))
            except: pass
        elif "OBSERVAÇÃO PERFIL:" in string:
            search_hours = True
            try:
                hour_list.extend(get_hours(string))
            except: pass
    hour_list = sorted(hour_list, reverse = True)
    total_hours = hour_list[0]
    obligatory_hours = hour_list[1]
    elective_hours = hour_list[0] - obligatory_hours
    
    return (university_name, course_name, total_hours, 
            elective_hours, obligatory_hours)

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
        is_co_req: bool, disc_prerequisites: list,
        disc_equivalences: list
    ) -> "tuple[bool, bool, bool, list, list]":
    if is_equivalence:
        disc_equivalences = get_equivalences(string)
        is_equivalence = False
    elif is_prerequisite:
        splitted_string = string.split("CO-REQUISITO:")
        if len(splitted_string) == 2:
            pre_req, co_req = splitted_string
            if "NÃO" not in co_req:
                is_co_req = True
        else: pre_req = splitted_string[0]
        disc_prerequisites = get_equivalences(pre_req)
        is_prerequisite = False
    return (is_equivalence, is_prerequisite, is_co_req,
            disc_prerequisites, disc_equivalences)

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

def get_dependents_value(discipline_list: list) -> list:
    dependents = {}

    for discipline in discipline_list:
        for requisite in discipline['prerequisites']:
            code = requisite['code']
            if code not in dependents:
                dependents[code] = []
            dependents[code].append({
                'code': discipline['code'],
                'name': discipline['name']
            })

    for discipline in discipline_list:
        discipline['dependents'] = []
        code = discipline['code']
        if code in dependents:
            discipline['dependents'] = dependents[code]
        
    return discipline_list

def append_discipline(disciplines: list, disc_name: str, disc_cod: str,
    ementa: str, disc_hours: int, semester: int, disc_credits: int,
    disc_type: bool, disc_equivalences: list, disc_prerequisites: list
    ) -> "tuple[list, str, list, list]":
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
        "dependents": [],
    })
    ementa = ""
    disc_equivalences = []
    disc_prerequisites = []
    return (disciplines, ementa, 
            disc_equivalences, 
            disc_prerequisites)

def ufpe_pdf_to_json(document):
    """
    Scraps the PDF file getting the information and
    writing it to a JSON file. This version was made
    to Computer Engineering/Information system courses.
    """
    current_semester = 0
    new_semester = 0
    disciplines = []
    semesters = 0

    is_co_req = False
    missing_infos = False
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
            elif "PERÍODO" in string or "SEM PERIODIZAÇÃO" in string:
                if len(disciplines) > 0 and disc_cod != disciplines[-1]["code"]:
                    new_semester = get_semester(string)
                else:
                    current_semester = get_semester(string)
                    new_semester = current_semester
                semesters = max(current_semester, semesters)
            elif is_title:
                splitted = string.split("\n") 
                string = "\n".join(splitted[-6:])
                if is_equivalence:
                    if "NÃO" not in splitted[0]:
                        disc_equivalences = [{
                            "code": each.split("- ")[0].strip(),
                            "name": each.split("- ")[1].strip()
                        } for each in splitted[:-6]]
                    is_equivalence = False
                if disc_cod != "":
                    (disciplines, ementa, disc_equivalences, 
                    disc_prerequisites) = append_discipline(disciplines,
                        disc_name, disc_cod, ementa, disc_hours, 
                        current_semester, disc_credits, disc_type, 
                        disc_equivalences, disc_prerequisites)
                    current_semester = new_semester
                
                (name, _type, _, _, total, credits) = string.split("\n")
                name = name.split("- ")
                disc_cod = name[0].strip()
                disc_name = "- ".join(name[1:])
                disc_credits = int(float(credits))
                disc_type = "OBRIG" in _type
                disc_hours = int(total)
            elif re.match("\w+\d+-", string) and (
                "CO-REQUISITO" not in string and
                "EQUIVALÊNCIA" not in string and
                "PRÉ-REQUISITO" not in string and
                not is_equivalence and not is_co_req
                and not is_prerequisite):
                (disciplines, ementa, disc_equivalences, 
                disc_prerequisites) = append_discipline(disciplines,
                    disc_name, disc_cod, ementa, disc_hours, 
                    current_semester, disc_credits, disc_type, 
                    disc_equivalences, disc_prerequisites)
                current_semester = new_semester
                name = string.split("- ")
                disc_cod = name[0].strip()
                disc_name = "- ".join(name[1:]).replace("\n", " ")
                missing_infos = True
            elif missing_infos:
                (_type, _, _, total, credits) = string.split("\n")
                disc_credits = int(float(credits))
                disc_type = "OBRIG" in _type
                disc_hours = int(total)
                missing_infos = False
            else:
                is_co_req = False
                (is_equivalence, is_prerequisite, is_co_req,
                disc_prerequisites, disc_equivalences
                ) = get_equivalence_and_prereq_values(string,
                    is_equivalence, is_prerequisite, is_co_req,
                    disc_prerequisites, disc_equivalences)

    (disciplines, _, _, _) = append_discipline(disciplines,
            disc_name, disc_cod, ementa, disc_hours, 
            current_semester, disc_credits, disc_type, 
            disc_equivalences, disc_prerequisites)
    
    return semesters, disciplines

def ufpe_ec_pdf_to_json(document):
    """
    Scraps the PDF file getting the information and
    writing it to a JSON file. This version was made
    to Computer Engineering course.
    """
    added_disciplines = set()
    disciplines = []
    semesters = 0
    semester = 0

    co_req = False
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
                            "code": each.split("- ")[0].strip(),
                            "name": each.split("- ")[1].strip()
                        } for each in splitted[:-7]]
                    is_equivalence = False
                if disc_cod != "" and disc_cod not in added_disciplines:
                    (disciplines, ementa, disc_equivalences, 
                    disc_prerequisites) = append_discipline(disciplines,
                        disc_name, disc_cod, ementa, disc_hours, semester, 
                        disc_credits, disc_type, disc_equivalences, 
                        disc_prerequisites)
                    added_disciplines.add(disc_cod)
                
                (name, _type, period, 
                _, _, total, credits) = string.split("\n")
                disc_cod, disc_name = name.split("- ")
                disc_credits = int(float(credits))
                disc_type = "OBRIG" in _type
                disc_cod = disc_cod.strip()
                disc_hours = int(total)
                semester = int(period)
                semesters = max(semester, semesters)
            else:
                (is_equivalence, is_prerequisite, co_req,
                disc_prerequisites, disc_equivalences
                ) = get_equivalence_and_prereq_values(string,
                    is_equivalence, is_prerequisite, co_req,
                    disc_prerequisites, disc_equivalences)
    if disc_cod not in added_disciplines:
        (disciplines, _, _, _) = append_discipline(disciplines,
            disc_name, disc_cod, ementa, disc_hours, semester, 
            disc_credits, disc_type, disc_equivalences, 
            disc_prerequisites)

    return semesters, disciplines


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python3 pdf_to_json.py <course_type> <pdf_path> <output_json>")
        print("course_type: ec for Computer Engineering and cc or si for Computer Science or Information systems")
    else:
        document = fitz.open(sys.argv[2])

        (university_name, course_name, 
        total_hours, elective_hours, 
        obligatory_hours) = general_course_infos(document)

        if sys.argv[1].lower() == 'ec':
            semesters, disciplines = ufpe_ec_pdf_to_json(document)
        else:
            semesters, disciplines = ufpe_pdf_to_json(document)

        get_dependents_value(disciplines)
        save_json_file(sys.argv[3], university_name, course_name,
                    total_hours, elective_hours, obligatory_hours,
                    semesters, disciplines)