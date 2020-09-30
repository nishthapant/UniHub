const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("../config");

class ubcLinks {

  constructor(){
    this.root = config.ubc.ROOT;
    this.slugW = config.ubc.SLUG_W;
    this.slugS = config.ubc.SLUG_S;
    this.subLinksFile = config.ubc.SUBLINKS;
    this.subjectCatalogue = [];
  }

  async getLinks(url){
      while(true){
          try{
            let pageHTML = await axios.get(url);
            let $ = cheerio.load(pageHTML.data);

            let subjectNames = $('#mainTable > tbody').children();
            let classRef = this;
            subjectNames.each(function(){
                if($(this).find('a').html() != null){
                    let subject = {};
                    subject.url = classRef.root+$(this).find('a').attr('href');
                    subject.name = $(this).children().eq(1).html().trim();
                    classRef.subjectCatalogue.push(subject);
                };
            })
              return true
              ;
          }
          catch(err){
              console.log(err);
          }
      }

  }

  async run(){
    let terms = [this.slugW];
    for(let term=0;term<terms.length;term++){
        let url = terms[term];
        await this.getLinks(url);
    }
    fs.writeFileSync(this.subLinksFile,JSON.stringify(this.subjectCatalogue, null, 4));

    }
  }

module.exports = {
  ubcLinks
}