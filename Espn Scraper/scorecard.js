const url="https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard"

const request=require('request');
const cheerio=require('cheerio');

request(url,function(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        extract_match_details(html);
    }
})
function  extract_match_details(html){
    let $=cheerio.load(html);

    let detail=$('.header-info .description');

    let result=$('.match-info.match-info-MATCH.match-info-MATCH-half-width .status-text').text();

    
    let descArr=detail.text().split(',');
    let venue=descArr[1].trim();
    let date=descArr[2].trim();
    console.log("venue :",venue,"date :",date);
    console.log(result);


}
