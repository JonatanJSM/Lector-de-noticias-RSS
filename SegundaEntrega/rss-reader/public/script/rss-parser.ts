import Parser from "rss-parser";
import sanitizeHtml from 'sanitize-html';
import {CardProps} from "public/classes/CardProps";
import {web} from "public/classes/web";
import * as fs from 'fs';
import path from 'path';

const photoCat: string = "newsDefault.svg";
let directoryFiles: string[] = [];
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
  //   public/imgNews/
  const dir = path.resolve('./public', "imgNews");
    fs.readdir(dir,(err,files)=>{
      if (err) {
        console.error(err);
        return "error";
      }
      directoryFiles = files;
    });

    let photosNews: string;
    const arrayNews: CardProps[] = [];
    let feed:any;
    try {
       feed = await parser.parseURL(urlss);
    } catch (error) {
      return "error";
    }

    let auxNamePhoto = urlss.replace(/[:/,;<>]/g, '');
    auxNamePhoto += ".gif";
    directoryFiles.includes(auxNamePhoto)?photosNews=auxNamePhoto:"";

    let feedTitle = String(feed.title);
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

      let auxItemDescription = item.description;
      if(auxItemDescription === undefined){
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan.";
      }else{
        description = sanitizeHtml(auxItemDescription);
        if(description === ""){
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec molestie ultrices dolor vel accumsan.";
        }
      }

      categories  = Object.assign([], item.categories);
      if(feedTitle.includes('NYT')){
        photosNews = "NYT.gif";
        if(item.categories === undefined){
          category="News";
        }else{
          let x = categories[0];
          var result = JSON.parse(JSON.stringify(x)) as NYT;
          category = String(result._);
        }
      }else{
        if(categories[0] === undefined){
          category = "News";
        }else{
          category = String(categories[0]);
        }
      }

      if(photosNews === undefined){
        arrayNews[i]=(new CardProps(tittle, description, link, category, photoCat, date));
      }else{
        arrayNews[i]=(new CardProps(tittle, description, link, category, photosNews, date));
      }
        i++;
    });
    var objWebNews = new web(String(feedTitle), arrayNews, urlss);
    var arrayJSON = JSON.stringify(objWebNews);
    return arrayJSON;
  } export default parserRRSFeed;
