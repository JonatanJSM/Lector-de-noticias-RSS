import Parser from "rss-parser";
import {News} from "../interface/NewsInfo"
import { WebNews } from "public/interface/WebNews";
import sanitizeHtml from 'sanitize-html';

class CardProps implements News {
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
    this.image = image
    this.category = category;
    this.pubDate = pubDate;
  }
}

class web implements WebNews{
  title: string;
  urlWebPage: string;
  newsItems: CardProps[];
  
  public constructor(title: string, newsItems: CardProps[], urlWebPage: string) {
    this.title = title;
    this.urlWebPage = urlWebPage;
    this.newsItems = newsItems;
  }
}

type NYT  = {
  _: number;
  '$': string;
};

type CustomFeed = {foo: string};
type CustomItem = {
    description: string;
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      feed: ['foo'],
      item: ['description']
    }
});
  
async function parserRRSFeed(urlss: string) {
    let photoCat: string = "https://cdn2.thecatapi.com/images/7e7.jpg";
    let phtosNews: string;
    const arrayNews: CardProps[] = [];
    let feed:any;
    try {
       feed = await parser.parseURL(urlss);
    } catch (error) {
      return "error"
    }
    let feedTitle = feed.title;
    phtosNews = feed.image['url'];
    console.log(feed.image);
    

    let i = 0;
    feed.items.forEach((item:any) => {
      let tittle: string;
      let description: string;
      let link: string;
      let date: string;
      let category: string;
      let categories: string[] =[];

      tittle = String(item.title);
      link = String(item.link);
      date = String(item.isoDate);

      if(item.description === undefined){
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan.";
      }else{
        description = sanitizeHtml(item.description);
        if(description === ""){
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan.";
        }
      }

      categories  = Object.assign([], item.categories);
      if(String(feedTitle).includes('NYT')){
        if(item.categories === undefined){
          category="News";
        }else{
          let x = categories[0];
          var result = JSON.parse(JSON.stringify(x)) as NYT;
          category = String(result._);
        }
      }else{
        if(categories[0] === undefined){
            category="News";
        }else{
          category = String(categories[0]);
        }
      }

      if(phtosNews === undefined){
        arrayNews[i]=(new CardProps(tittle, description, link, category, photoCat, date));
      }else{
        arrayNews[i]=(new CardProps(tittle, description, link, category, phtosNews, date));
      }
        i++;
    });

    var objWebNews = new web(String(feedTitle), arrayNews, urlss);
    var arrayJSON = JSON.stringify(objWebNews);
    return arrayJSON;
  } export default parserRRSFeed;
