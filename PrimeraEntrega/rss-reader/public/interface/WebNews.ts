import { News } from "./NewsInfo";

export interface WebNews {
    _id?: string;
    title: string;
    newsItems: News[];
}