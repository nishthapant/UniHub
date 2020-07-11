const {mcgillScrape} = require('./mcgillScrape');
const {uwaterlooScrape} = require('./uwaterlooScrape');
const {uofaScrape} = require('./uofaScrape');
const universityToScrape = uofaScrape;

function trigger(){
  const scraper = new universityToScrape();
  scraper.run();
}

trigger();
