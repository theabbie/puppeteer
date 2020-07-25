const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var urls = ["https://www.iitm.ac.in/faculty/cs","https://www.iitm.ac.in/faculty/ee"];
  var page = await browser.newPage();
  for (url of urls) {
  await page.goto(url);
  await page.waitFor(3500);
  var content = await page.evaluate(() => {
    return document.body.innerText.toString().match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  });
  console.log(content.join("\n"));
  }
  await browser.close();
})();
