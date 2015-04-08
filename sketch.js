var baseurl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
var q = 'native american';
var apikey = '2725e091dd46a84e0271e663cf082a43:3:71776969';
var hits = [];
var firstYear = 1880;
var lastYear = 2015;
var minHits=10000;
var maxHits;


function getHits(year) {
    var beginDate = year + '0101';
    var endDate = year + '1231';
    var url = baseurl + '?q=' + q + '&api-key=' + apikey + '&begin_date=' + beginDate + '&end_date=' + endDate
    loadJSON(url, function(data) {
        var hit = {
            year: year,
            total: data.response.meta.hits
        };
        hits.push(hit);

        if (year < lastYear) {
	        setTimeout(function(){
	        	getHits(year+1);
	        }, 200);
	    }
    })
}

function setup() {
	getHits(firstYear);
    createCanvas(displayWidth, displayHeight);
}

function draw() {
    background(0);
    for (var i = hits.length - 1; i >= 0; i--) {
        var hit = hits[i];
        var ran = random(255); 
        var r = map(hit.total, 0, 2000, 10, height/2);
        fill(76, 76, ran, 100);
        noStroke();
        ellipse(map(hit.year, firstYear, lastYear, 0, width), height / 2, r, r)
    };


}