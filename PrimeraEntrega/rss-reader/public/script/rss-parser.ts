import Parser from "rss-parser";
import {NewsCardProps} from "../interface/NewsCardProps"

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
    const feed = await parser.parseURL('https://rss.nytimes.com/services/xml/rss/nyt/World.xml');
    // console.log(feed.image['url']); // feed will have a `foo` property, type as a string
    //console.log(feed.image.url);
    //parseString(
    //console.log(feed.items);


    //fetch get from https://api.thecatapi.com/v1/images/search    
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

      console.log('photoCat: '+photoCat);
      
      tittle = String(item.title);
      link = String(item.link);

      if(item.description === undefined){
        description = item.summary;
        summary = "this is the summary";
      }else{
        description = item.description;
        summary = "this is the summary2";
      }
        miarray[i]=(new cardProps(tittle, description, link, summary,"aux"));
        i++;
    });
    console.log(miarray);
  }

  function getDataFeed(){
    parserRRSFeed();
    console.log("RSS is");

  } export default getDataFeed;

