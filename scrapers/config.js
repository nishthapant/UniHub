const config = {
    mcgill: {
        ROOT :'https://www.mcgill.ca',
        SLUG : 'https://www.mcgill.ca/study/2020-2021/courses/search?page=',
        DIV : '#block-system-main > div > div > div > div.view-content',
        FILE : 'mcgill.txt',
        PAGES : 541
    },
    uoft:{
        ROOT : 'https://fas.calendar.utoronto.ca',
        SLUG : 'https://fas.calendar.utoronto.ca/search-courses?page=',
        DIV :'',
        FILE : 'uoft.txt',
        PAGES : 476
    },
    uwaterloo:{
        ROOT : 'http://ugradcalendar.uwaterloo.ca',
        SLUG : '/page/Course-Descriptions-Index',
        DIV :'body > center',
        FILE : 'uwaterloo.txt',
        PAGES : null
    },
    uofa:{
        ROOT : 'https://catalogue.ualberta.ca',
        SLUG : '',
        DIV :'#main > div > div',
        FILE : 'uofa.txt',
        PAGES : null
    },
}

module.exports = (config);
