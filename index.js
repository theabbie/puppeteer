const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

var urls = ["https://www.quora.com/Is-Be-YouNick-Indian-YouTube-Channel-overrated/answer/TheAbbie","https://www.quora.com/Why-is-TVF-not-releasing-Pitchers-Season-2/answer/TheAbbie","https://www.quora.com/What-are-the-differences-between-Quora-and-Stack-Overflow/answer/TheAbbie","https://www.quora.com/Is-it-possible-to-create-Android-Apps-without-using-Android-Studio/answer/TheAbbie","https://www.quora.com/Why-should-I-use-DuckDuckGo-instead-of-Google/answer/TheAbbie","https://www.quora.com/What-makes-Mithila-Palkar-so-popular/answer/TheAbbie","https://www.quora.com/What-is-the-fastest-website-in-the-world/answer/TheAbbie","https://www.quora.com/Is-it-only-me-or-others-that-also-feel-that-Kaneez-Surka-is-not-funny/answer/TheAbbie","https://www.quora.com/Whats-your-take-on-nepotism-in-Bollywood/answer/TheAbbie","https://www.quora.com/Who-is-a-Google-Maps-Level-10-Local-Guide-How-long-did-it-take-to-reach-Level-10-and-what-have-been-the-best-strategies/answer/TheAbbie","https://www.quora.com/Do-celebrities-watch-Bhuvan-Bams-wedding-mimicry-videos-If-yes-how-do-they-react/answer/TheAbbie","https://www.quora.com/Who-is-better-Amit-bhadana-or-Bhuvan-Bam/answer/TheAbbie","https://www.quora.com/Why-do-BB-Ki%E2%80%99s-vines-have-more-views-than-AIB/answer/TheAbbie"];

(async function() {
  while(true) {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  //var url = urls[Math.floor(urls.length*Math.random())];
  urls.map(async (url, i) => {
  var page = await browser.newPage();

 const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
    await page.setViewport({
      'width': 375,
      'height': 812,
      'deviceScaleFactor': 3,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    });
    await page.evaluateOnNewDocument(() => {
  Object.defineProperty(navigator, 'webdriver', {
    get: () => false,
  });
});
    await page.evaluateOnNewDocument(() => {
  // We can mock this in as much depth as we need for the test.
  window.navigator.chrome = {
    runtime: {},
    // etc.
  };
});
    await page.evaluateOnNewDocument(() => {
  const originalQuery = window.navigator.permissions.query;
  return window.navigator.permissions.query = (parameters) => (
    parameters.name === 'notifications' ?
      Promise.resolve({ state: Notification.permission }) :
      originalQuery(parameters)
  );
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'plugins', {
    // This just needs to have `length > 0` for the current test,
    // but we could mock the plugins too if necessary.
    get: () => [1, 2, 3, 4, 5],
  });
});
    await page.evaluateOnNewDocument(() => {
  // Overwrite the `plugins` property to use a custom getter.
  Object.defineProperty(navigator, 'languages', {
    get: () => ['en-US', 'en'],
  });
});

  await page.goto(url,{waitUntil: 'networkidle0'});
  await page.evaluate(() => {
   window.scrollTo(0,document.body.scrollHeight);
  });
  console.log(url);
  });
  await browser.close();
 }
})();
