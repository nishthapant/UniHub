const config = {
    mcgill: {
        ROOT :'https://www.mcgill.ca',
        SLUG : 'https://www.mcgill.ca/study/2020-2021/courses/search?page=',
        DIV : '#block-system-main > div > div > div > div.view-content',
        SUBJECT_DIV: 'span.views-field.views-field-field-dept-code  span',
        FILE : 'mcgill.txt',
        PAGES : 541
    },

    uoft:{
        ROOT : 'https://fas.calendar.utoronto.ca',
        SLUG : 'https://fas.calendar.utoronto.ca/search-courses?page=',
        DIV :'',
        FILE : 'uoft.txt',
        PAGES : 476
    }
} 




module.exports = (config)
