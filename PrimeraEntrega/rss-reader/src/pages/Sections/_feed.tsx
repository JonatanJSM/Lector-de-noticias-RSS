import { useEffect, useRef, useState } from "react"
import NewsCard from "../../abstractComponents/NewsCard"
import { WebNews } from 'public/interface/WebNews';
import  { News }  from 'public/interface/NewsInfo';

export default function _feed(){
    const newsProviders = useRef<WebNews[]>([]);
    const [news, setNews] = useState<News[]>([]);

    useEffect(()=>{
        fetch('api/newsEP',{method: 'GET',headers: {
            'Content-Type': 'application/json',
          }})
          .then(async response=>{
            const data = await response.json();
            newsProviders.current = data.response;            
            getNewsProvider();
            })
    },[])

    function getNewsProvider(){
        newsProviders.current.forEach((item,index)=>{getListOfNews(item.newsItems,index.toString())})
    }

    function getListOfNews(arrayOfNews: News[],id:string){
        console.log(arrayOfNews.length);
        
        setNews(news=>[...news,...arrayOfNews]);            
    }    

    return(
        <div className="vstack gap-3 justify-content-center">
            <h1>Feed: {news.length}</h1>
            
            {
               news.length > 0 && news.map((item,index)=>{return <NewsCard key={index} news={item} />})
            }
        </div>
    )
}