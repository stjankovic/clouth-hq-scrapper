const request = require('request');
const cheerio = require('cheerio');

let pnum = 1;
const page = `https://clouthq.com/members/index?page=${pnum}`;
const names = new Array;
var t;


function start(counter){
  if(counter < 174){
    setTimeout(function(){
      pnum++;
      counter++;
      request(page, (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
          
          $('.items').each((i, el) => {
            
            const name = $(el)
            .find('.title')
            .text();
      
            names.push(name.split('@'));
          });
      
          t = [].concat.apply([], names);   
          console.log(t);
        }
      });
      console.log(`Request #${counter}`);
      start(counter);
    }, 100);
  }
  
}

start(0);


