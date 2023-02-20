import { useEffect, useRef, useState } from "react"
import {NewsCard} from "../CustomComponents/NewsCard"
import handler from "../api/newsEP"
import { WebNews } from 'public/interface/WebNews';
import  { News }  from 'public/interface/NewsInfo';

export default function _feed(){
    const newsProviders = useRef<WebNews[]>([]);
    const listOfNews = useRef<News[]>([]);
    const [news, setNews] = useState<News[]>([]);

    useEffect(()=>{
        fetch('api/newsEP',{method: 'GET',headers: {
            'Content-Type': 'application/json',
          }})
          .then(async response=>{
            const data = await response.json();
            console.log(data);
            newsProviders.current = data.response;
            getNewsProvider();
            })
    },[])

    function getNewsProvider(){
        newsProviders.current.forEach((item,index)=>{getListOfNews(item.newsItems,index.toString())})
    }

    function getListOfNews(arrayOfNews: News[],id:string){
        if(id==='0'){
            setNews(arrayOfNews);
            listOfNews.current = [...arrayOfNews];
        }

        // listOfNews.current = [...arrayOfNews];
        // setNews([...arrayOfNews]);
    }    

    return(
        <div>
            <h1>Feed</h1>
            {/* {
                listOfNews.current.map((item,index)=>{return NewsCard(item)})
                news.map((item,index)=>{return NewsCard(item)})
            } */}
            
            {
               news.length > 0 && news.map((item,index)=>{return <NewsCard key={index} news={item} />})
            }
        </div>
    )
}