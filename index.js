const puppeteer = require('puppeteer');
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const save = util.promisify(fs.writeFile);

(async function() {
  var browser = await puppeteer.launch({args: ['--no-sandbox']});
  var urls = ["https://www.nitsri.ac.in/Department/department_facultylist.aspx?nDeptID=ec","https://www.nitsri.ac.in/Department/Department_FacultyList.aspx?nDeptID=cs","https://www.nitsri.ac.in/Department/Department_FacultyList.aspx?nDeptID=c"];
  var page = await browser.newPage();
  for (url of urls) {
  try {
  await page.goto(url);
  await page.waitFor(3500);
  var content = await page.evaluate(() => {
    return document.body.innerText.toString().match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  });
  console.log(content.join("\n"));
    } catch (e) {continue;}
  }
  await browser.close();
})();
