const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var page = await browser.newPage();
  var url = "https://devrant.com/rants/2948571/i-think-the-fact-that-even-apple-cant-unlock-your-phone-if-you-forget-your-passc";
  await page.goto(url);
  await page.waitFor(3500);
  var content = await page.evaluate(() => {
    return document.body.textContent.toString().toLowerCase().replace(/[^a-zA-Z0-9\s\:]*/g,"").replace(/\r\n/g, '\n').split('\n').filter(x => /\w/.test(x)).join(' ');
  });
  var ctr = {};
  content.split(" ").forEach(x => ctr[x] = (ctr[x] || 0) + 1);
  var count = [];
  for (t in ctr) count.push([t,ctr[t]]);
  console.log(count.sort((a,b) => (+b[1]) - (+a[1])).map(l => l[0]+": "+l[1]).join("\n"));
  await browser.close();
})();
