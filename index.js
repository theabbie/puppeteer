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
  await page.goto("https://theabbie.github.io");
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
})();
