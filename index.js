const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var urls = (await axios("https://del.dog/raw/iits")).data.split("\n");
  var page = await browser.newPage();
  for (url of urls) {
  try {
  await page.goto(url);
  await page.waitFor(3500);
  var content = await page.evaluate(() => {
    return document.body.innerText.toString().toLowerCase().split("[at]").join("@").split("[dot]").join(".").match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  });
  console.log(content.join("\n"));
  console.log("\n\n");
    } catch (e) {continue;}
  }
  await browser.close();
})();
