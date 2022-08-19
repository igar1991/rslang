import { Word } from "../types/types";
import { url } from "./utils";

export const fetchGetWords = async (page: number, group: number): Promise<Word[]>=>{
    const response = await fetch(`${url}/words?page=${page}&group=${group}`);
    const res = await response.json();
    return res;
};

export const fetchGetWord = async (id: string): Promise<Word>=>{
    const response = await fetch(`${url}/words/${id}`);
    const res = await response.json();
    return res;
};