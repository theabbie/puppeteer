const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
var cheerio = require("cheerio");
const util = require("util");
var url = require("url");
var devRant = require("rantscript");
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
  
  for (p of maps) {
     var k = cheerio.load((await axios(p,{headers: {"User-Agent": "Googlebot-News"}})).data,{xmlMode: true})
     rants = [...rants, ...k("loc").map((i,x)=>+url.parse(k(x).text(),true).pathname.split("/")[2]).get()]
  }
  
  var i = 1;
  var token = (await devRant.login('-assmaster', process.argv[2]))["auth_token"];
  var vote_token = (await devRant.login('god-of-newbies', process.argv[2]))["auth_token"];

  for (rant of rants) {
     if (i%30==0) {
        var ctr = (await devRant.profile("-assmaster",vote_token,"comments")).content.content.comments.map(x=>x.id)
        for(x of ctr) {
           var vote = await devRant.voteComment(1,+x,vote_token);
        }
     }
     await devRant.postComment("Nice",rant,token);
     console.log(rant)
     i++;
  }
})();
