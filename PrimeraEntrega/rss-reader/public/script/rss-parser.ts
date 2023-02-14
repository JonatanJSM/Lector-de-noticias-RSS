import Parser from "rss-parser";
import {News} from "../interface/NewsInfo"
import { WebNews } from "public/interface/WebNews";
import sanitizeHtml from 'sanitize-html';

class cardProps implements News {
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
  newsItems: cardProps[];
  

public constructor(title: string, newsItems: cardProps[], urlWebPage: string) {
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
    summary : string;
};

const parser: Parser<CustomFeed, CustomItem> = new Parser({
    customFields: {
      feed: ['foo'],
      item: ['description', 'summary']
    }
});
  
async function parserRRSFeed(urlss: string) {
    console.log("parserRSSFeed");
    
    let photoCat : string = "";
    const arrayNews: cardProps[] = [];
    let feed:any;
    try {
       feed = await parser.parseURL(urlss);

    } catch (error) {
      return "error"
    }
    console.log("feed")
    let feedTitle = feed.title;
    // console.log(feed.image['url']); 
    //console.log(feed.image.url);
  
    await fetch('https://api.thecatapi.com/v1/images/search',
      {
         method: 'GET',
         headers: {'Content-Type': 'application/json'}
      })
      .then(response => response.json())
      .then(data => {
      photoCat = data[0].url;
    });
    
    let i = 0;
    feed.items.forEach((item:any) => {
      let tittle: string;
      let description: string;
      let link: string;
      let summary: string;
      let date: string;
      let category: string;
      let categories: string[] =[];

      tittle = String(item.title);
      link = String(item.link);
      date = String(item.isoDate);

      if(item.description === undefined){
        description = sanitizeHtml(item.summary);
        summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan. Donec et libero sed arcu ornare feugiat eu pharetra nunc. Donec fermentum neque at ipsum maximus, et ullamcorper odio pellentesque.";
        if(description === ""){
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan.";
        }
      }else{
        description = sanitizeHtml(item.description);
        if(description === ""){
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan.";
        }
        summary = "Proin egestas efficitur nisl, sit amet cursus augue sollicitudin nec. Phasellus euismod nec tellus lobortis feugiat. Cras hendrerit vel tortor ac cursus. Morbi tortor mauris, aliquam eget mauris viverra, porta varius leo.";
      }

      categories  = Object.assign([], item.categories);
      if("NYT > World News" === String(feedTitle)){
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
        arrayNews[i]=(new cardProps(tittle, description, link, category, photoCat, date));
        i++;
    });

    var objWebNews = new web(String(feedTitle), arrayNews, urlss);
    var arrayJSON = JSON.stringify(objWebNews);
    return arrayJSON;
  } export default parserRRSFeed;

