const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("../config");

class utLinks {

  // get configuration for the Universty of Toronto
  constructor(){
    this.root = config.uoft.ROOT;
    this.mainDiv = config.uoft.MAIN_DIV;
    this.mainLinkDiv = config.uoft.MAIN_LINK_DIV;
    this.slug = config.uoft.SLUG;
    this.pages = config.uoft.PAGES;
    this.linkFile = config.uoft.LINK_FILE;
    this.linkCatalogue = [];
  }


  async getLinks(url){
      while(true){
          try{
            let pageHTML = await axios.get(url);
            let $ = cheerio.load(pageHTML.data);

            var classRef = this;
            let courseObjects = $(classRef.mainDiv).children();
            courseObjects.each(function(){
              let courseLink = classRef.root + $($(this).find(classRef.mainLinkDiv)).attr('href');
              classRef.linkCatalogue.push(courseLink);
            });
        
              return true;
          }
          catch(err){
              console.log(err);
          }
      }

  }

  async run(){
      for(let pg=0;pg<=this.pages;pg++){

          let url = this.slug+pg;
          await this.getLinks(url);
      }

      fs.writeFileSync(this.linkFile,JSON.stringify(this.linkCatalogue, null, 4));

    }
  }

module.exports = {
  utLinks
}
