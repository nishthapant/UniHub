const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs') ;
const config = require("./config");

const root = config.uofa.ROOT;
const linksData = [];

function processSubject(subject){
  subject = subject.replace(/(\r\n|\n|\n\r)/gm,'');
  subject = subject.replace("                        ","");
  subject = subject.replace("                    ","");
  return subject;
}

async function scrape(Url){
    while(true){
       try{
           let pageHTML = await axios.get(Url);
           let $ = await cheerio.load(pageHTML.data);
           let courseObjects = $('#main > div > div > div.pure-g-r > div:nth-child(1) > table > tbody').children();
           promise = Promise.resolve();
           promise = promise.then(async function(){
             courseObjects.each(async function(){
               let link1 = root + $(this).find('a').attr('href');
               let pageHTML1 = await axios.get(link1);
               let courseSelect = await cheerio.load(pageHTML1.data);
               let courseObj = courseSelect('#main > div > div > div.pure-g-r > div:nth-child(1) > table > tbody > tr');
               promise = promise.then(function(){
                 courseObj.each(function(){
                   let links = {}
                   links.url = root + $(this).find('a').attr('href');
                   links.subject = $(this).children().eq(1).html().trim();
                   linksData.push(links);
                 });
               });
             });
           });
           if(courseObjects.length<linksData.length)
            return true;
       }
       catch(err){
         console.log(err);
       }
    }

}

async function run(){
    let url = root;
    let scraped = await scrape(url);
    if(scraped)
        fs.writeFileSync("uofaLinks.txt",JSON.stringify(linksData, null, 4));
}

run();
