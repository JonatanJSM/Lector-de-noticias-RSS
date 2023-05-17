import { ButtonHTMLAttributes, useEffect, useRef, useState } from "react"
import NewsCard from "../../abstractComponents/NewsCard"
import { WebNews } from 'public/interface/WebNews';
import  { News }  from 'public/interface/NewsInfo';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import IconButton from '@mui/material/IconButton';
import { FormControl } from "@mui/material";

export default function _feed(data?:any){
    var debounce = require('lodash.debounce');
    const newsProviders = useRef<WebNews[]>([]);
    const [news, setNews] = useState<News[]>([]);
    const [filteredNews, setFilteredNews] = useState<News[]>([]);

    useEffect(()=>{
        newsProviders.current = data;
        getNewsProvider();
    },[])

    function getNewsProvider(){
        newsProviders.current.forEach((item,index)=>{getListOfNews(item.newsItems,index.toString())})
    }

    function getListOfNews(arrayOfNews: News[],id:string){   
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

    function createCompareFn<T extends Object>(
        property: keyof T,
        sort_order: "asc" | "desc"
      ) {
        const compareFn = (a: T, b: T) => {
          const val1 = a[property];
          const val2 = b[property];
          const order = sort_order !== "desc" ? 1 : -1;
          switch (typeof val1) {
            case "number": {
              const valb = val2 as number;
              const result = val1 - valb;
              return result * order;
            }
            case "string": {
              const valb = val2 as string;
              const result = val1.localeCompare(valb);
              return result * order;
            }
            default:
              return 0;
          }
        };
        return compareFn;
      }

    const [type, setType] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
        var x = (event.target.value.length);
        if(x == 0){
            setFilteredNews(news);
        } else {            
            setOrderNews(String(event.target.value),"asc", news);
        }
    };

    const OrderAsc = () => {
        setOrderNews(type,"asc",news);
    };

    const OrderDes = () => {
        setOrderNews(type,"desc",news);
    };

    function setOrderNews(atribute: string, order: string, arr:any){
        const copyOfDynos = [...arr]; 
        if(order == "asc"){
            copyOfDynos.sort(createCompareFn(atribute, "asc"));
        }else{
            copyOfDynos.sort(createCompareFn(atribute, "desc")); 
        }        
        setFilteredNews(copyOfDynos);
    }

    return(
        <div className="vstack gap-3 justify-content-center">
            <center>
            <h1>Feed</h1>
            <input id="search" type={'text'} placeholder="Buscar..." className='form-control' style={{width:'300px'}}  onChange={(event:any)=>{debounceSearch(event)}} autoComplete={"off"}/>
            <br></br>
                <InputLabel id="label">Ordenar por:</InputLabel>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                    value={type}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        <MenuItem value="title">Título</MenuItem>
                        <MenuItem value="category">Categoría</MenuItem>
                        <MenuItem value="description">Descripción</MenuItem>
                    </Select>
             </FormControl>
            <IconButton aria-label="asc" color="inherit" onClick={OrderAsc}>
            <ArrowUpwardIcon/>
            </IconButton>
            <IconButton aria-label="des" color="inherit" onClick={OrderDes}>
            <ArrowDownwardIcon/>
            </IconButton>
            <br></br><br></br><br></br>
            {
               filteredNews.length > 0 && filteredNews.map((item,index)=>{return <NewsCard key={index} news={item} />})
            }
            </center>
        </div>
    )
}