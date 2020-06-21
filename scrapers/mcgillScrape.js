// require axios, cheerio, fs libraries
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;

// require site configuration of university
const config = require("./config");

// require useful constants
const root = config.mcgill.ROOT;
const div = config.mcgill.DIV;
const subDiv = config.mcgill.SUBJECT_DIV;
const slug = config.mcgill.SLUG;
const pages = config.mcgill.PAGES;
const file = config.mcgill.FILE;


// Function: To scrape a given url based on provided configuration
// Returns: true if successfull, throws error if failed and tries again
async function scrape(url){
    while(true){
        try{
            let pageHTML = await axios.get(url);
            let $ = cheerio.load(pageHTML.data);

            let courseObjects = $(div).children();

            courseObjects.each(function(){
                let course = {};
                course.title = $($(this).find('a')).text();
                course.url =  root + $($(this).find('a')).attr('href');
                course.subject =  $($(this).find(subDiv)).text();
                catalogue.push(course);
            })

            return true;
        }
        catch(err){
            console.log("Could not scrape.");
        }
    }
    
};


// Function: To scrape a url and get the following information about all courses in the university:
//           1. Course Title
//           2. Course href
//           3. Subject of that course
// Returns: Nothing
async function getAllCourses(pages){
    
    for(let pg=0;pg<=pages;pg++){
        let url = slug+pg;
        let scraped = await scrape(url);
        if(scraped)
            fs.writeFileSync(file,JSON.stringify(catalogue, null, 4));
   }
}


// initialize a catalogue to collect information
// call scraper function
let catalogue = [];
getAllCourses(pages);


// getAllCourses(1);
