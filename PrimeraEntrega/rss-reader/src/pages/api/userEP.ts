import type { NextApiRequest, NextApiResponse } from 'next'
//@ts-ignore
import clientPromise from 'lib/mongo/index';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        
        //@ts-ignore
        const client = await clientPromise;
        const db = client.db(process.env.MONGO_DB);
        if(req.method === 'GET'){
            const posts = await db.collection("user").find({}).toArray();
            res.json({ status: 200, data: posts });
        }

        if(req.method === 'POST'){
            console.log('post',req.body)
            const { user } = req.body;
            const posts = await db.collection("user").insertOne(user);
            res.json({ status: 200, data: posts });
        }

        if(req.method === 'DELETE'){    
            const { user } = req.body;
            const posts = await db.collection("user").deleteOne(user);
            res.json({ status: 200, data: posts });
        }
    } catch (error:any) {
        res.json({ status: 500, error: new Error(error).message });
    }
    
  }

//export default handler;
