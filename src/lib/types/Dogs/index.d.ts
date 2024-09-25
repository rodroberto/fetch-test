type Dog = {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
}

type DogsSearch = {
    resultIds: string[];
    total: number;
    next?: string;
    prev?: string;
}

type Match = {
    match: string;
}