import { News } from "./NewsInfo";

export interface WebNews {
    _id?: string;
    title?: string;
    urlWebPage?: string;
    newsItems: News[];
}