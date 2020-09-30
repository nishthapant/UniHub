const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("../config");

let courseCatalogue = [];

class utScrape {

  // get configuration for the Universty of Toronto
  constructor(){
    this.root = config.uoft.ROOT;
    this.mainDiv = config.uoft.MAIN_DIV;
    this.mainLinkDiv = config.uoft.MAIN_LINK_DIV;
    this.slug = config.uoft.SLUG;
    this.pages = config.uoft.PAGES;
    this.linkFile = config.uoft.LINK_FILE;
    this.courseFile = config.uoft.COURSE_FILE;
    this.linkCatalogue = [];
  }

  async scrapeCoursePage(link){
    // Description: For each course(link),
    //               1. Create an object literal containing title, url, subject 
    //               2. Add it to a course catalogue

    while(true){
      try{
        console.log(link);
        let pageHTML = await axios.get(link);
        let $ = cheerio.load(pageHTML.data);

        let course = {};
        course.title = $('#page-title').text().trim;
        course.url = link;
        course.subject = $('.field-name-field-section-link').find('.field-item').text().trim;
        courseCatalogue.push(course);

        return course;
      }
      catch(err){
          console.log(err);
      }
    }
  }

  
   // CODE FOR GETTING LINK AND SCRAPING EACH COURSE LINK

  // async getLinks(url){
  //     while(true){
  //         try{
  //           let pageHTML = await axios.get(url);
  //           let $ = cheerio.load(pageHTML.data);

  //           var classConfig = this;
  //           let courseObjects = $(classConfig.mainDiv).children();
  //           courseObjects.each(function(){
  //             let courseLink = classConfig.root + $($(this).find(classConfig.mainLinkDiv)).attr('href');
  //             classConfig.scrapeCoursePage(courseLink);
  //           });
        
  //             return true;
  //         }
  //         catch(err){
  //             console.log(err);
  //         }
  //     }

  // }

  async run(){
     
      let linksObject = JSON.parse(fs.readFileSync(this.linkFile));
      let linkIndex = linksObject.length;
      for(let idx=0;idx<linkIndex;idx++){
        await this.scrapeCoursePage(linksObject[idx]);
      }
      fs.writeFileSync(this.courseFile,JSON.stringify(courseCatalogue, null, 4));



      // CODE FOR GETTING LINK AND SCRAPING EACH COURSE LINK

          // for(let pg=0;pg<=this.pages;pg++){
          //     let url = this.slug+pg;
          //     await this.getLinks(url);
          // }

    }
  }

module.exports = {
  utScrape
}
