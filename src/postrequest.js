'use strict';

const postRequest = async (event) => {
  const fs = require('fs');
  const lighthouse = require('lighthouse');
  const chromeLauncher = require('chrome-launcher');
  let reportHtml;
  (async () => {
    const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
    // const options = {logLevel: 'info', output: 'json', onlyCategories: ['performance'], port: chrome.port};
    // const runnerResult = await lighthouse('https://thesageboard.com', options);

    // // `.report` is the HTML report as a string
    // reportHtml = runnerResult.report;
    // console.log(reportHtml);
    console.log(chrome);
    await chrome.kill();
  })();
  return {
    statusCode: 200,
    body: reportHtml,
  };
};
module.exports = {
  handler: postRequest
}