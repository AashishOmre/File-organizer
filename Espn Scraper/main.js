const url="https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const request=require('request');
const cheerio=require('cheerio');

request(url,cb);

function cb(err , response ,html){

    if(err){
        console.log(err);
    }
    else{
       // console.log(html);
       extractLink(html);
    }

}

function extractLink(html){
    let $=cheerio.load(html);
    let anch_ele=$('a[data-hover="View All Results"]');
    
    let link=anch_ele.attr('href');
    let full_link="https://www.espncricinfo.com/"+link;
    //console.log(full_link);
    get_allmatches_link(full_link);

}

function get_allmatches_link(full_link){
    request(full_link,function(err,response,html){
        if(err){
            console.log(err);
        }
        else{
            extract_all_links(html);
        }
    })

}

function extract_all_links(html){
    let $=cheerio.load(html);
    let scoreCardArr=$('a[data-hover="Scorecard"]');


    for(let i=0;i<scoreCardArr.length;i++){
    let link=$(scoreCardArr[i]).attr('href');
    let full_link="https://www.espncricinfo.com/"+link;

    console.log(full_link);
    
    }
}

