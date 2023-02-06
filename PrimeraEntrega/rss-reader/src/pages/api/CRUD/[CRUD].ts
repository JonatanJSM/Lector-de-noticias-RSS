// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import parserRSS from 'public/script/rss-parser'

type Data = {
  name: string,
  query: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let aux = JSON.stringify(req.body);
  let json = JSON.parse(aux);
  console.log(json.cart[0].urls);
  parserRSS(json.cart[0].urls);

  
  res.status(200).json({ name: 'John Doe', query: req.query })
}
