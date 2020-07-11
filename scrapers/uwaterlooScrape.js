const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("./config");



class uwaterlooScrape {

  constructor(){
    this.root = config.uwaterloo.ROOT;
    this.div = config.uwaterloo.DIV;
    this.slug = config.uwaterloo.SLUG;
    this.pages = config.uwaterloo.PAGES;
    this.file = config.uwaterloo.FILE;
    this.catalogue = [];
  }

  async scrape(url, subject){
      while(true){
          try{
              let pageHTML = await axios.get(url);
              let $ = cheerio.load(pageHTML.data);
              let classConfig = this;
              let courseObjects = $(classConfig.div).children();
              //console.log(courseObjects.length);
            //   var promise = Promise.resolve();
            //   console.log(courseObjects.length);
              courseObjects.find('tbody').each(function(){
                let course = {};
            //     promise = promise.then(function(){
            //       //console.log(url)
                //console.log($(this).html());
                // console.log($(this).children()[1]);
                course.tile = $(this).children().eq(1).text();
                course.url = url;
                course.subject = subject;
            //       //     course.title = $(this).text();
            //       //     course.url = classConfig.root+$(this).attr('href');
            //       //     classConfig.catalogue.push(course);
                classConfig.catalogue.push(course);
            //     });
              });
              if(classConfig.catalogue.length>=courseObjects.length)
            //     console.log("Returning....");
                return true;
              }

          catch(err){
            console.log(err);
          }
      }

  }

  async run(){
    let filePath = 'uwaterlooLinks.txt';
    let urlList = fs.readFileSync(filePath);
    urlList = JSON.parse(urlList);
    urlList.map(async(url,idx) => {
      let scraped = await this.scrape(url.url, url.subject);
      if(scraped)
          console.log(url.url);
          console.log(this.catalogue.length);
          fs.writeFileSync(this.file,JSON.stringify(this.catalogue, null, 4));
    });
  }

}
module.exports = {
  uwaterlooScrape
}
