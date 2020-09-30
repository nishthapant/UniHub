const {mcScrape} = require('./McGill/mcScrape');

const {utLinks} = require('./UofT/utLinks');
const {utScrape} = require('./UofT/utScrape');

const {ubcLinks} = require('./UBC/ubcLinks');
const {ubcScrape} = require('./UBC/ubcScrape');

const {uwaterlooScrape} = require('./UW/uwaterlooScrape');
const {uofaScrape} = require('./UofA/uofaScrape');

const initScrape = utScrape;

function trigger(){
  const scraper = new initScrape();
  scraper.run();
}

trigger();
