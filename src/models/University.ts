type Course = {
    key: string;
    name: string;
    logo: string;
}

export type University = {
    key: string;
    name: string;
    website: string;
    logo: string;
    courses: Course[];
};