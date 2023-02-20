import { useEffect } from "react"
import NewsCard from "../CustomComponents/NewsCard"
import handler from "../api/newsEP"

export default function _feed(){
    
    const news = {
        title: "Titulo",
        description: "Descripcion...",
        summary: "Resumen",
        link: "Link",
        pubDate: "Fecha",
        image: "Imagen",
        url: "https://cdn2.thecatapi.com/images/3mo.jpg"
    }
    useEffect(()=>{
        fetch('api/newsEP',{method: 'GET',headers: {
            'Content-Type': 'application/json',
          }})
          .then(async response=>{
            const data = await response.json();
            console.log(data);
            })
    })

    
    return(
        <div>
            <h1>Feed</h1>
            {NewsCard(news)}
        </div>
    )
}