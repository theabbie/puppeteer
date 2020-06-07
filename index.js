const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

(async function() {
  var browser = await puppeteer.launch({userDataDir: './myUserDataDir', args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto("https://www.picuki.com/following/sasta_abbie");
  await page.evaluate(function() {
    setInterval(function() {
      window.scrollTo(0,document.body.scrollHeight);
    },100);
  });
  await page.waitFor(25000);
  var code = await page.evaluate(() => document.body.innerHTML);
  await save("/code.txt", code);
  await browser.close();
})();
