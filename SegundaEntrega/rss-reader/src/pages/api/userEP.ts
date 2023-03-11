//https://stackoverflow.com/questions/40884153/try-catch-blocks-with-async-await
import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore
import clientPromise from 'lib/mongo/index';
import { ObjectId } from 'mongodb';
import parserRSS from 'public/script/rss-parser'

interface User {
    _id?: string;
    name?: string;
    age?: number;
    height?: number;
}

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    let users: User= {};
    try {
        //@ts-ignore
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        
        if(req.method === 'GET'){
            const usersDb = await db.collection("user").find({}).toArray();
            users = usersDb;
            // res.json({ status: 200, data: usersDb });
        }

        if(req.method === 'POST'){
            const user = req.body;

            await db.collection("user").insertOne( user );
            //res.json({ status: 200 });
        }

        if(req.method === 'DELETE'){    
            const user = req.body;
            await db.collection("user").deleteOne(user);
            //res.json({ status: 200 });
        }

        if(req.method === 'PUT'){    
            const user = req.body;
            const updatedId = JSON.parse(req.headers.values as string);
            console.log({_id: `ObjectId(${updatedId})`},{$set: user});
            await db.collection("user").updateOne({_id: new ObjectId(updatedId) },{$set: user});
            //res.json({ status: 200 });
        }

    } catch (error:any) {
        res.json({ status: 500, error: new Error(error).message });
    }
     
    req.method === 'GET' ? res.json({status:200,response:users}) : res.json({status:200});
  }

//export default handler;
