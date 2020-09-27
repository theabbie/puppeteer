const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
var cheerio = require("cheerio");
const util = require("util");
var url = require("url");
var devRant = require("rantscript");
const save = util.promisify(fs.writeFile);
var imgur = require("imgur");

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36');
  await page.goto('https://www.quora.com');
  await page.type('input[tabindex="1"][name="email"]', "assmaster@srvrr.tk");
  await page.type('input[tabindex="2"][name="password"]', process.argv[2]);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.click('a.deny_push_notif-button');
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
})();
