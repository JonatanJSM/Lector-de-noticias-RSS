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

const api_key = "live_eDuSRdTTQbgyRCDkOVVhgBy93zJyTZFFqvXXbkqysVv2BSJSkzanx0aj69SNXNfH"
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
    //console.log("parserRSSFeed");
    let photoCat: string = "https://cdn2.thecatapi.com/images/7e7.jpg";
    let photosCats : string[] = [];
    const arrayNews: CardProps[] = [];
    let feed:any;
    try {
       feed = await parser.parseURL(urlss);

    } catch (error) {
      return "error"
    }
    //console.log("feed")
    let feedTitle = feed.title;
    // console.log(feed.image['url']); 
    //console.log(feed.image.url);

    console.log("hay noticas"+feed.items.length);
    let numPhotosCat = feed.items.length;
    console.log("hola?"+numPhotosCat)
    
    await fetch('https://api.thecatapi.com/v1/images/search?limit='+numPhotosCat,
      {
         method: 'GET',
         headers: {'Content-Type': 'application/json','x-api-key': api_key}
      })
      .then(response => response.json())
      .then((data) => {
        let imagesData = data;
        let i = 0;
        imagesData.map(function(imageData: { url: any; }) {
          photosCats[i] = imageData.url;
          //console.log("hye",imageData.url,"   ", imageData.url.length)
          i++;
        });
      })

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

      if(photosCats[i] === undefined){
        arrayNews[i]=(new CardProps(tittle, description, link, category, photoCat, date));
      }else{
        arrayNews[i]=(new CardProps(tittle, description, link, category, photosCats[i], date));
      }
        i++;
    });

    var objWebNews = new web(String(feedTitle), arrayNews, urlss);
    var arrayJSON = JSON.stringify(objWebNews);
    return arrayJSON;
  } export default parserRRSFeed;

