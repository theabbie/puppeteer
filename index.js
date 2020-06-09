const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

var urls = ["https://www.quora.com/Is-Be-YouNick-Indian-YouTube-Channel-overrated/answer/TheAbbie","https://www.quora.com/Why-is-TVF-not-releasing-Pitchers-Season-2/answer/TheAbbie","https://www.quora.com/What-are-the-differences-between-Quora-and-Stack-Overflow/answer/TheAbbie","https://www.quora.com/Is-it-possible-to-create-Android-Apps-without-using-Android-Studio/answer/TheAbbie","https://www.quora.com/Why-should-I-use-DuckDuckGo-instead-of-Google/answer/TheAbbie","https://www.quora.com/What-makes-Mithila-Palkar-so-popular/answer/TheAbbie","https://www.quora.com/What-is-the-fastest-website-in-the-world/answer/TheAbbie","https://www.quora.com/Is-it-only-me-or-others-that-also-feel-that-Kaneez-Surka-is-not-funny/answer/TheAbbie","https://www.quora.com/Whats-your-take-on-nepotism-in-Bollywood/answer/TheAbbie","https://www.quora.com/Who-is-a-Google-Maps-Level-10-Local-Guide-How-long-did-it-take-to-reach-Level-10-and-what-have-been-the-best-strategies/answer/TheAbbie","https://www.quora.com/Do-celebrities-watch-Bhuvan-Bams-wedding-mimicry-videos-If-yes-how-do-they-react/answer/TheAbbie","https://www.quora.com/Who-is-better-Amit-bhadana-or-Bhuvan-Bam/answer/TheAbbie","https://www.quora.com/Why-do-BB-Ki%E2%80%99s-vines-have-more-views-than-AIB/answer/TheAbbie"];

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage();
  while(true) {
  var url = urls[Math.floor(urls.length*Math.random())];
  await page.goto(url);
  console.log(url);
  }
  await browser.close();
})();
