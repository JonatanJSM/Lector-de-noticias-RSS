const { createProxyMiddleware } = require('http-proxy-middleware');

const nextjsInstances = [
    'https://lector-de-noticias-rss-git-aordonez-jonatanjsm.vercel.app/',
    'https://lector-de-noticias-rss-git-jsantana-jonatanjsm.vercel.app/',
    'https://lector-de-noticias-rss-git-fcetina-jonatanjsm.vercel.app/',
    'https://lector-de-noticias-rss-git-anatali-jonatanjsm.vercel.app/'
];

function getRandomInstance() {
  return nextjsInstances[Math.floor(Math.random() * nextjsInstances.length)];
}

module.exports = createProxyMiddleware({
  target: getRandomInstance(),
  changeOrigin: true,
  pathRewrite: {
    '^/api/load-balancer': '',
  },
  router: () => getRandomInstance(),
});
