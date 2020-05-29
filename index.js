const puppeteer = require('puppeteer-core');
const axios = require("axios");

(async function() {
var browser = puppeteer.launch({args: ['--no-sandbox']});
const page = await browser.newPage();
await page.goto("https://is.gd/xxxxp");
console.log(page.url());
await browser.close();
})();
