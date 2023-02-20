import { useEffect, useRef, useState } from "react"
import NewsCard from "../../abstractComponents/NewsCard"
import { WebNews } from 'public/interface/WebNews';
import  { News }  from 'public/interface/NewsInfo';

export default function _feed(){
    var debounce = require('lodash.debounce');
    const newsProviders = useRef<WebNews[]>([]);
    const [news, setNews] = useState<News[]>([]);
    const [filteredNews, setFilteredNews] = useState<News[]>([]);

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
        // let newss = [...news,...arrayOfNews];
        // let dcinsdiuc = [...filteredNews,...arrayOfNews]; 
        // setNews(news=>[...news,...arrayOfNews].sort((a,b)=>{
        //     //console.log(a.pubDate.substring(0,10));
        //     let aDate = new Date(a.pubDate);
        //     let bDate = new Date(b.pubDate);
        //     if (bDate > aDate) return 1;
        //     if (bDate < aDate) return -1;
        //     return 0;
        // }));  
        // setFilteredNews(filteredNews=>[...filteredNews,...arrayOfNews].sort((a,b)=>{
        //     let aDate = new Date(a.pubDate);
        //     let bDate = new Date(b.pubDate);
        //     if (bDate > aDate) return 1;
        //     if (bDate < aDate) return -1;
        //     return 0;
        // }));       
        setNews(news=>[...news,...arrayOfNews]); 
        setFilteredNews(filteredNews=>[...filteredNews,...arrayOfNews]);
    }    

    function getSearchInput(event:any){
        console.log(event.target.value);
        if(event.target.value.length == 0)
            setFilteredNews(news);
        else {            
            setFilteredNews(filterObjects(news,event.target.value));
        }
    }

    function filterObjects(arr:any, search:any) {
        return arr.filter(function(obj:any) {
            return Object.values(obj).some(function(val) {
              if (typeof val === "string") {
                return val.toLowerCase().includes(search.toLowerCase());
              }
              return false;
            });
          });
    }

    const debounceSearch = (event:any) => {
        const debounced = debounce(() => {
            getSearchInput(event);
        }, 800);
        
        debounced();
    };

    return(
        <div className="vstack gap-3 justify-content-center">
            <h1>Feed</h1>
            <input id="search" type={'text'} className='form-control' style={{width:'300px'}}  onChange={(event:any)=>{debounceSearch(event)}} autoComplete={"off"}/>
            {
               filteredNews.length > 0 && filteredNews.map((item,index)=>{return <NewsCard key={index} news={item} />})
            }
        </div>
    )
}