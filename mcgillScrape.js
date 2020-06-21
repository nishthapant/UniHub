const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;

const config = require("./config");

const root = config.mcgill.ROOT;
const div = config.mcgill.DIV;
const slug = config.mcgill.SLUG;
const pages = config.mcgill.PAGES;
const file = config.mcgill.FILE;

async function scrape(url){
    while(true){
        try{
            let pageHTML = await axios.get(url);
            let $ = cheerio.load(pageHTML.data);

            let courseObjects = $(div).children();
            courseObjects.find('a').each(function(){
                let course = {};
                course.title = $(this).text();
                course.url = root+$(this).attr('href');
                catalogue.push(course);
            })
            return true;
        }
        catch(err){
            console.log("Could not scrape.");
        }
    }
    
};

async function getAllCourses(pages){
    
    for(let pg=0;pg<=pages;pg++){
        let url = slug+pg;
        let scraped = await scrape(url);
        if(scraped)
            fs.writeFileSync(file,JSON.stringify(catalogue, null, 4));
   }
}

let catalogue = [];
getAllCourses(pages);