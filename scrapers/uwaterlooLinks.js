const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("./config");



const root = config.uwaterloo.ROOT;
const div = config.uwaterloo.DIV;
const slug = config.uwaterloo.SLUG;
const pages = config.uwaterloo.PAGES;
const file = config.uwaterloo.FILE;
const linksData = [];

function processCategory(category){
  if (category.includes('<'))
    category = category.split('<')[0];
  if (category.includes('&'))
    category = category.split('&')[0];
  if (category.includes('/'))
    category = category.split('/')[0];
  return category;
}

async function scrape(Url){
    while(true){
       try{
           let pageHTML = await axios.get(Url);
           let $ = cheerio.load(pageHTML.data);
           let courseObjects = $('#ctl00_contentMain_lblContent > table:nth-child(9) > tbody > tr');

           courseObjects.each(async function(){
             if($(this).find('h3').html() === null){
               let links = {}
               links.url = root + $(this).find('a').attr('href');
               links.subject = processCategory($(this).find('td').html());
               linksData.push(links);
             }
           });
          return true;
       }
       catch(err){
         console.log(err);
       }
    }

}

async function run(){
    let url = root+slug;
    console.log(url);
    let scraped = await scrape(url);
    if(scraped)
        fs.writeFileSync("uwaterlooLinks.txt",JSON.stringify(linksData, null, 4));
}

run();
