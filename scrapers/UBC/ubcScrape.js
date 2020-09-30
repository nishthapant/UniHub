// Title: Web scraper for the University of British Columbia
// Author: Nishtha Pant

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("../config");

class ubcScrape {

  constructor(){

    // get configuration for the Universty of British Columbia
    this.root = config.ubc.ROOT;
    this.subLinksFile = config.ubc.SUBLINKS;
    this.courseLinksFile = config.ubc.COURSE_FILE;
    this.courseCatalogue = [];
  }

  async getCourses(url, sub){
    // Description: For each course in a subject(sub):
    //               1. Create an object literal containing url, name, subject 
    //               2. Add it to course catalogue


      while(true){
          try{
            let pageHTML = await axios.get(url);
            let $ = cheerio.load(pageHTML.data);
            let courseLinks = $('#mainTable > tbody').children();
            let classRef = this;

            // create an object literal to hold course information
            courseLinks.each(function(){
                let course = {};
                course.title = $(this).children().eq(1).html().trim();
                course.url = classRef.root+$(this).find('a').attr('href');
                course.subject = sub;

                // add object literal to course catalogue
                classRef.courseCatalogue.push(course);
            });

            return true;
          }
          catch(err){
              console.log(err);
          }
      } 

  }

  async run(){

    // get urls of course catalogue for all subject codes
    let subjects = JSON.parse(fs.readFileSync(this.subLinksFile));


    // for each subject code, get url and name of each course offered
    for(let sub=0;sub<subjects.length;sub++){
        await this.getCourses(subjects[sub].url, subjects[sub].name);
    }

    // write information for all courses into a file
    fs.writeFileSync(this.courseLinksFile,JSON.stringify(this.courseCatalogue, null, 4));

    }
  }

module.exports = {
  ubcScrape
}