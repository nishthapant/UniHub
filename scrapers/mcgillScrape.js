const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("./config");



class mcgillScrape {

  constructor(){
    this.root = config.mcgill.ROOT;
    this.div = config.mcgill.DIV;
    this.slug = config.mcgill.SLUG;
    this.pages = config.mcgill.PAGES;
    this.file = config.mcgill.FILE;
    this.catalogue = [];
  }

  async scrape(url){
      while(true){
          try{
              let pageHTML = await axios.get(url);
              let $ = cheerio.load(pageHTML.data);

              var classConfig = this;
              let courseObjects = $(classConfig.div).children();

              courseObjects.find('a').each(function(){
                  let course = {};
                  course.title = $(this).text();
                  course.url = classConfig.root+$(this).attr('href');
                  classConfig.catalogue.push(course);
              })

              return true;
          }
          catch(err){
              console.log(err);
          }
      }

  };

  async run(){
      for(let pg=0;pg<=this.pages;pg++){
          let url = this.slug+pg;
          let scraped = await this.scrape(url);
          if(scraped)
              fs.writeFileSync(this.file,JSON.stringify(this.catalogue, null, 4));
     }
  }

}

module.exports = {
  mcgillScrape
}
