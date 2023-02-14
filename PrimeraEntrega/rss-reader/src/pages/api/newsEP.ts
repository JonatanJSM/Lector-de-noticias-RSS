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
        
        if(req.method === 'GET'){
            const newsDb = await db.collection("news").find({}).toArray();
            newss = newsDb;
             // res.json({ status: 200, data: usersDb });
        }

        if(req.method === 'POST'){
            //https://www.buzzfeed.com/mx  NO METER ESTA URL

            let aux = JSON.stringify(req.body);
            let arrayURL = JSON.parse(aux);
            console.log(arrayURL.input.length);
            for(let i = 0; i<arrayURL.input.length; i++){
                let feedParsed = await parserRSS(arrayURL.input[i].urls);
                console.log(feedParsed);
                //await db.collection("news").insertOne(JSON.parse((feedParsed)));
            }
            
            //res.json({ status: 200 });
        }

        if(req.method === 'DELETE'){}

        if(req.method === 'PUT'){}

    } catch (error:any) {
        res.json({ status: 500, error: new Error(error).message });
    }
     
    req.method === 'GET' ? res.json({status:200,response:newss}) : res.json({status:200});
  }