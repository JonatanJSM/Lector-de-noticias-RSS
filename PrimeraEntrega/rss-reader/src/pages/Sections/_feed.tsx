import { useEffect } from "react"
import NewsCard from "../CustomComponents/NewsCard"

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
        
    })

    return(
        <div>
            <h1>Feed</h1>
            {NewsCard(news)}
        </div>
    )
}