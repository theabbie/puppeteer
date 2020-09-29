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
  await page.setCookie(...[
  {
    name: 'm-b_lax',
    value: 'gDKDBMVil4gi-uswyPsDbg==',
    domain: '.quora.com',
    path: '/',
    expires: 1664299362.980879,
    size: 31,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'Lax'
  },
  {
    name: 'm-s',
    value: 'y_D5-g74W9JieNiEn5f2Gg==',
    domain: '.quora.com',
    path: '/',
    expires: 1664299362.98091,
    size: 27,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'm-lat',
    value: '5YhsgSH-y5JZQ1gCpPum3g==',
    domain: '.quora.com',
    path: '/',
    expires: 1664299361.186446,
    size: 29,
    httpOnly: true,
    secure: true,
    session: false
  },
  {
    name: 'm-uid',
    value: '1305000855',
    domain: '.quora.com',
    path: '/',
    expires: 1664342561.487394,
    size: 15,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-css_v',
    value: 'main-e5a39c6f58816226',
    domain: '.quora.com',
    path: '/',
    expires: 1632763360,
    size: 28,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-tz',
    value: '0',
    domain: '.quora.com',
    path: '/',
    expires: 1632763363,
    size: 5,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-b',
    value: 'gDKDBMVil4gi-uswyPsDbg==',
    domain: '.quora.com',
    path: '/',
    expires: 1664299362.980838,
    size: 27,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'None'
  },
  {
    name: 'm-early_v',
    value: '57f768eb9618f0e6',
    domain: '.quora.com',
    path: '/',
    expires: 1664342559.887239,
    size: 25,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-ans_frontend_early_version',
    value: '608eb973920cb9b6',
    domain: '.quora.com',
    path: '/',
    expires: 1664342559.887233,
    size: 44,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-login',
    value: '1',
    domain: '.quora.com',
    path: '/',
    expires: 1664342561.186458,
    size: 8,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'G_ENABLED_IDPS',
    value: 'google',
    domain: '.www.quora.com',
    path: '/',
    expires: 253402257600,
    size: 20,
    httpOnly: false,
    secure: false,
    session: false
  },
  {
    name: 'm-b_strict',
    value: 'gDKDBMVil4gi-uswyPsDbg==',
    domain: '.quora.com',
    path: '/',
    expires: 1664299362.980894,
    size: 34,
    httpOnly: true,
    secure: true,
    session: false,
    sameSite: 'Strict'
  }
  ]);
  try {
  /*await page.type('input[tabindex="1"][name="email"]', "assmaster@srvrr.tk");
  await page.type('input[tabindex="2"][name="password"]', process.argv[2]);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');*/
    
  var q = "Mukesh Ambani";
    
  await page.goto('https://google.com/search?q='+q+" quora", {
    waitUntil: 'networkidle0',
  });
    
  await page.evaluate(function() {
  	document.querySelectorAll("div.r a")[0].click();
  })
  await page.waitFor(5000);
  
  var question = await page.evaluate(function() {
  	document.body.querySelector("title").innerHTML.slice(0,-8);
 })
   
  var google = await browser.newPage();
    
  await google.goto('https://google.com/search?q='+question, {
    waitUntil: 'networkidle0',
  });
    
  await google.evaluate(function() {
  	document.querySelectorAll("div.r a")[0].click();
  });
  
  await google.waitFor(5000);
  
  var content = await google.evaluate(function() {
  	document.body.querySelectorAll("script").forEach(x=>x.remove())
  	document.body.querySelectorAll("style").forEach(x=>x.remove())
  	return [...new Set(Array.from(document.body.querySelectorAll("*")).filter(x=>x.textContent.length/x.innerHTML.length>0.5).map(x=>(x.textContent.match(/\w+/g) || []).join(" ")).filter(t=>t.length>150).filter(a=>{len = a.length/a.split(" ").length; return len>3 && len<10}))].join(" ");
  })

  await page.evaluate(function() {
  	document.querySelectorAll("button[tabindex='0']")[2].click();
  });

  await page.waitFor(1500);

  await page.evaluate(function(content) {
  	document.querySelector(".doc").innerHTML=content;
  },content);

  await page.waitFor(1500);

  await page.evaluate(function() {
  	document.querySelectorAll("button[tabindex='0']")[9].click();
  });
    
  await page.waitFor(1500);
    
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
  }
  catch (e) {
  console.log(e.message);
  await page.screenshot({path: 'ss.png'});
  var link = (await imgur.uploadFile('ss.png')).data.link;
  console.log(link);
  }
  await browser.close();
})();
