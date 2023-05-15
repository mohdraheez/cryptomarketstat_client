const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const fs = require('fs');

// Define the base URL of your website
const baseUrl = 'https://cryptomarketstat.tech/';

// Create a sitemap object
const sm = new SitemapStream({ hostname: baseUrl });

// Add URLs to the sitemap
sm.write({ url: '/', changefreq: 'hourly', priority: 1.0 });
sm.write({ url: '/wishlist', changefreq: 'daily', priority: 0.7 });
sm.write({ url: '/news', changefreq: 'hourly', priority: 0.9 });

// Make a request to the API to get the list of coins
const fetch = require('node-fetch');
const getCoins = async () => {
  const response = await fetch('https://api.coincap.io/v2/assets?offset=0&limit=2000');

  if (response.ok) {
    const coins = await response.json();

    // Add URLs for each coin
    coins.data.forEach((coin) => {
      sm.write({ url: `/Details/${coin.symbol} ${coin.id}`, changefreq: 'hourly', priority: 0.9 });
    });
  } else {
    console.log(`Error fetching coins: ${response.status} - ${response.statusText}`);
  }
};

// Generate the sitemap
const generateSitemap = async () => {
  await getCoins();

  sm.end();

  // Convert the sitemap stream to a string
  const sitemap = await streamToPromise(sm).then((data) => data.toString());

  // Compress the sitemap
  const compressedSitemap = createGzip();

  // Write the sitemap to a file
  const writeStream = fs.createWriteStream('sitemap.xml.gz');

  writeStream.on('error', (error) => console.error(error));
  writeStream.on('finish', () => console.log('Sitemap generated successfully'));

  compressedSitemap.pipe(writeStream);
  compressedSitemap.write(sitemap);
  compressedSitemap.end();
};

generateSitemap();
