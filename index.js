const puppeteer = require('puppeteer');
const axios = require("axios");

(async function() {
var browser = await puppeteer.launch({args: ['--no-sandbox']});
const page = await browser.newPage();
await page.goto("https://is.gd/xxxxp");
console.log(page.url());
await browser.close();
})();
