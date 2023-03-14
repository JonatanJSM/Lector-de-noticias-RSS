import {News} from "public/interface/NewsInfo";

export class CardProps implements News {
    title: string;
    description: string;
    link: string;
    category: string;
    image: string;
    pubDate: string;

  public constructor(title: string, desdescription: string, link: string, category: string, image: string, pubDate: string) {
    this.title = title;
    this.description = desdescription;
    this.link = link;
    this.image = image;
    this.category = category;
    this.pubDate = pubDate;
  }
}