// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { NextApiRequest, NextApiResponse } from 'next';

// const targetUrls = [
//   'https://lector-de-noticias-rss-git-aordonez-jonatanjsm.vercel.app/',
//   'https://lector-de-noticias-rss-git-jsantana-jonatanjsm.vercel.app/',
//   'https://lector-de-noticias-rss-git-fcetina-jonatanjsm.vercel.app/',
//   'https://lector-de-noticias-rss-git-anatali-jonatanjsm.vercel.app/'
// ];

// const proxy = createProxyMiddleware({
//   target: targetUrls[Math.floor(Math.random() * 4)],
//   changeOrigin: true,
// });


// export default (req: NextApiRequest, res: NextApiResponse) => {
//   proxy(req, res);
// };
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const proxy1 = createProxyMiddleware({
  target: 'https://lector-de-noticias-rss-git-aordonez-jonatanjsm.vercel.app/',
  changeOrigin: true,
});

const proxy2 = createProxyMiddleware({
  target: 'https://lector-de-noticias-rss-git-fcetina-jonatanjsm.vercel.app/',
  changeOrigin: true,
});

let currentProxy = proxy1;

const chooseProxy = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  currentProxy = currentProxy === proxy1 ? proxy2 : proxy1;
   // currentProxy(req, res, next);
};

export default chooseProxy;
