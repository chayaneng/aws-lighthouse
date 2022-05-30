'use strict';

const lighthouse = require('lighthouse');
const log = require('lighthouse-logger');
const chromeLauncher = require('chrome-launcher');
const chromium = require('chrome-aws-lambda');


const chromeFlags = [
  '--headless',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--no-zygote',
  '--no-sandbox',
  '--single-process',
  '--hide-scrollbars',
];

// utility function to run lighthouse
const postRequest = async (event) => {
  let chrome = null;
  let chromePath = await chromium.executablePath;
  let body = JSON.parse(event.body)
  try {
    chrome = await chromeLauncher.launch({ chromeFlags, chromePath });

    const options = {
      output: "json",
      preset: 'mobile',
      onlyCategories: ["performance"],
      port: chrome.port,
      logLevel: 'info',
    };

    log.setLevel(options.logLevel);

    const results = await lighthouse(body.url, options);
    return {
      statusCode : 200,
      body: {
        'url': url,
        'Performance': report['categories']['performance']['score'],
      }
    };
  } finally {
    if (chrome) {
      await chrome.kill();
    }
  }
};

// do something with runLighthouse
module.exports = {
  handler: postRequest
}