import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore
import clientPromise from 'lib/mongo/index';
import { ObjectId } from 'mongodb';
import parserRSS from 'public/script/rss-parser'
import { News } from 'public/interface/NewsInfo';

interface User {
    _id?: string;
    name?: string;
    age?: number;
    height?: number;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let newss: News= {};
    try {
        //@ts-ignore
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        
        if(req.method === 'GET'){}

        if(req.method === 'POST'){
            let aux = JSON.stringify(req.body);
            let json = JSON.parse(aux);
            console.log(json.cart[0].urls);
            //var x = parserRSS(json.cart[0].urls);
            // const user = req.body;
            // const x = await parserRSS("https://feeds.24.com/articles/news24/World/rss");
            // console.log("terminé\n\n");
            // console.log(JSON.parse((x)));
            //await db.collection("news").insertOne( user );
            //res.json({ status: 200 });
        }

        if(req.method === 'DELETE'){}

        if(req.method === 'PUT'){}

    } catch (error:any) {
        res.json({ status: 500, error: new Error(error).message });
    }
     
    req.method === 'GET' ? res.json({status:200,response:"buena"}) : res.json({status:200});
  }