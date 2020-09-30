const config = {
    mcgill: {
        ROOT :'https://www.mcgill.ca',
        SLUG : 'https://www.mcgill.ca/study/2020-2021/courses/search?page=',
        DIV : '#block-system-main > div > div > div > div.view-content',
        SUBJECT_DIV: 'span.views-field.views-field-field-dept-code  span',
        FILE : 'McGill/mcgill.txt',
        PAGES : 541
    },

    uoft: {
        ROOT : 'https://fas.calendar.utoronto.ca',
        SLUG : 'https://fas.calendar.utoronto.ca/search-courses?page=',
        MAIN_DIV :'#block-system-main > div > div > div.view-content > table > tbody',
        MAIN_LINK_DIV : 'td.views-field.views-field-title a',
        LINK_FILE : 'UofT/uoftLinks.txt',
        COURSE_FILE : 'UofT/uoft.txt',
        PAGES : 476
    },

    ubc: {
        ROOT: 'https://courses.students.ubc.ca',
        SLUG_W :'https://courses.students.ubc.ca/cs/courseschedule?tname=subj-all-departments&sessyr=2020&sesscd=W&pname=subjarea',
        SLUG_S :'https://courses.students.ubc.ca/cs/courseschedule?tname=subj-all-departments&sessyr=2020&sesscd=S&pname=subjarea',
        SUBLINKS : 'UBC/ubcSubLinks.txt',
        COURSE_FILE : 'UBC/ubc.txt'
    },
    uwaterloo: {
        ROOT : 'http://ugradcalendar.uwaterloo.ca',
        SLUG : '/page/Course-Descriptions-Index',
        DIV :'body > center',
        FILE : 'UW/uwaterloo.txt',
        PAGES : null
    },
    uofa: {
        ROOT : 'https://catalogue.ualberta.ca',
        SLUG : '',
        DIV :'#main > div > div',
        FILE : 'UofA/uofa.txt',
        PAGES : null
    },
}

module.exports = (config);
