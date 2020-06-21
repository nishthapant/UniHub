const {mcgillScrape} = require('./mcgillScrape');

const universityToScrape = mcgillScrape;

function trigger(){
  const scraper = new universityToScrape();
  scraper.run();
}

trigger();
