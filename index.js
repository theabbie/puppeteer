const puppeteer = require('puppeteer-core');
const chrome = require('chrome-aws-lambda');
const axios = require("axios");

(async function() {
  const browser = await puppeteer.launch({
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
    });
  //var browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto("https://theabbie.github.io");
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();
