import { WebNews } from "public/interface/WebNews";
import {CardProps} from "public/classes/CardProps";

export class web implements WebNews{
    title: string;
    urlWebPage: string;
    newsItems: CardProps[];
    
    public constructor(title: string, newsItems: CardProps[], urlWebPage: string) {
      this.title = title;
      this.urlWebPage = urlWebPage;
      this.newsItems = newsItems;
    }
  }