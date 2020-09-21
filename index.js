const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
var cheerio = require("cheerio");
const util = require("util");
var url = require("url");
const save = util.promisify(fs.writeFile);

(async function() {
  /*var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var page = await browser.newPage();
  var url = "https://devrant.com/rants/2948571/i-think-the-fact-that-even-apple-cant-unlock-your-phone-if-you-forget-your-passc";
  await page.goto(url);
  await page.waitFor(3500);
  var content = await page.evaluate(() => {
    return document.body.textContent.toString().toLowerCase();
  });
  var ctr = {};
  content.split(" ").forEach(x => ctr[x] = (ctr[x] || 0) + 1);
  var count = [];
  for (t in ctr) count.push([t,ctr[t]]);
  console.log(count.sort((a,b) => (+b[1]) - (+a[1])).map(l => l[0]+": "+l[1]).join("\n"));
  await browser.close();*/
  var rants = [];
  var maps = ["https://devrant.com/static/devrant/sitemaps/current/devrant_com_sitemap.xml","https://devrant.com/static/devrant/sitemaps/current/devrant_com_sitemap_2.xml","https://devrant.com/static/devrant/sitemaps/current/devrant_com_sitemap_3.xml","https://devrant.com/static/devrant/sitemaps/current/devrant_com_sitemap_4.xml","https://devrant.com/static/devrant/sitemaps/current/devrant_com_sitemap_5.xml"]
  
  for (x of maps) {
     var k = cheerio.load((await axios(x,{headers: {"User-Agent": "Googlebot-News"}})).data,{xmlMode: true})
     rants = [...rants, ...k("loc").map((i,x)=>url.parse(k(x).text(),true).pathname.split("/")[2]).get()]
  }
  
  console.log(rants);
})();
