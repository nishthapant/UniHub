const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("../config");

class uofaScrape {

  constructor(){
    this.root = config.uofa.ROOT;
    this.div = config.uofa.DIV;
    this.file = config.uofa.FILE;
    this.catalogue = [];
    this.recordsWritten = 0;
  }

  processTitle(title){
    title = title.replace(/(\r\n|\n|\n\r)/gm,'');
    title = title.replace("                    ","");
    title = title.replace("                ","");
    return title;
  }

  async scrape(url, subject){
      while(true){
          try{
              let pageHTML = await axios.get(url);
              let $ = cheerio.load(pageHTML.data);
              let classConfig = this;
              let courseObjects = $(classConfig.div).children();
              courseObjects.each(function(index, element){
                if(index>3 && index<courseObjects.length-1){
                  let course = {};
                  course.tile = classConfig.processTitle($(this).children().eq(0).children().eq(1).text());
                  course.url = classConfig.root + $(this).find('a').attr('href');
                  course.subject = subject;
                  classConfig.catalogue.push(course);
                }
              });
              if(classConfig.catalogue.length>=courseObjects.length-3)
                return true;
          }
          catch(err){
            console.log(err);
          }
      }
  }

  async run(){
    let filePath = 'UofA/uofaLinks.txt';
    let urlList = fs.readFileSync(filePath);
    urlList = JSON.parse(urlList);
    urlList.map(async(url,idx) => {
      let scraped = await this.scrape(url.url, url.subject);
      if(scraped)
          fs.writeFileSync(this.file,JSON.stringify(this.catalogue, null, 4));
          this.recordsWritten = this.catalogue.length;
          console.log(this.recordsWritten);
    })
  }

}

module.exports = {
  uofaScrape
}
