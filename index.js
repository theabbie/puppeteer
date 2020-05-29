const puppeteer = require('puppeteer-core');
const axios = require("axios");

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto("https://theabbie.github.io");
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();
