import Parser from "rss-parser";
import {NewsCardProps} from "../interface/NewsCardProps"
const sanitizeHtml = require('sanitize-html');

class cardProps implements NewsCardProps {
    title: string;
    description: string;
    link: string;
    summary: string;
    image: string;

  public constructor(title: string, desdescription: string, link: string, summary: string, image: string) {
    this.title = title;
    this.description = desdescription;
    this.link = link;
    this.summary = summary;
    this.image = image
  }
}

var arrayNews: string="";

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
  
async function parserRRSFeed() {
    let photoCat : string = "";
    const miarray: cardProps[] = [];
    const feed = await parser.parseURL('https://timesofindia.indiatimes.com/rssfeeds/296589292.cms');
    // console.log(feed.image['url']); 
    //console.log(feed.image.url);
    //console.log(feed.items);
  
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
    feed.items.forEach(item => {
      let tittle: string;
      let description: string;
      let link: string;
      let summary: string;

      tittle = String(item.title);
      link = String(item.link);
      

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
        miarray[i]=(new cardProps(tittle, description, link, summary,photoCat));
        i++;
    });

    console.log(miarray);
    var arrayJSON = JSON.stringify(miarray);
    return arrayJSON;
  }

  function getDataFeed(){
    parserRRSFeed()
      .then(jsonnn =>{
        arrayNews = jsonnn
      });
  } 

  //Es para probar la función intermediaria
  function callGetDataFeed(){
    getDataFeed();
    setTimeout(() => {
      console.log("Hello "+arrayNews)
  }, 1000)
    
  }export default callGetDataFeed;

