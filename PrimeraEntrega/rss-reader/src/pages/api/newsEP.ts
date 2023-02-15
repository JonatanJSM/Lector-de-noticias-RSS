import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore
import clientPromise from 'lib/mongo/index';
import parserRSS from 'public/script/rss-parser'
import { WebNews } from 'public/interface/WebNews';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let newss: WebNews[]=[];

    try {
        //@ts-ignore
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        let newsParsed: string[] =[];
        
        if(req.method === 'GET'){
            const newsDb = await db.collection("news").find({}).toArray();
            newss = newsDb;
        }

        if(req.method === 'POST'){
            //https://www.buzzfeed.com/mx  url de fallo

            let aux = JSON.stringify(req.body);
            let arrayURL = JSON.parse(aux);
            //console.log(arrayURL.input.length);
            for(let i = 0; i<arrayURL.input.length; i++){
                let feedParsed = await parserRSS(arrayURL.input[i].urls);
                //console.log(JSON.parse(feedParsed));
                if(feedParsed == "error") throw new Error(arrayURL.input[i].urls);
                //await db.collection("news").insertOne(JSON.parse((feedParsed)));
                newsParsed[i] = feedParsed;
            }

            for(let i = 0; i<newsParsed.length; i++){
                await db.collection("news").insertOne(JSON.parse((newsParsed[i])));
            }
            
        }

        if(req.method === 'DELETE'){}

        if(req.method === 'PUT'){}

    } catch (error:any) {
        res.status(500).json({response:(error.message)});
        return;
    }
     
    req.method === 'GET' ? res.json({status:200,response:newss}) : res.json({status:200});
  }