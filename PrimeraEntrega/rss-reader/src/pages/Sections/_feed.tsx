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
        url: "https://www.vidactual.com/rcpmaker/wp-content/uploads/2020/10/Paella.png"
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