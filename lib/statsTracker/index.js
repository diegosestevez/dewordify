var cheerio = require("cheerio");
var cheerioOptions = {
	normalizeWhitespace: true,
	xmlMode: false,
	decodeEntities: false
};
var stats = require("./stats.js");

var markoutMap = require("../../markoutMap.json");




module.exports = function(html) {
	$ = cheerio.load(html, cheerioOptions);
	
	console.log("Markout Stats:");
	
	stats["markout"] = {};
	stats.markout["wrappers"] = {};
	for (m of markoutMap.wrappers) {
		var starts = $(`p:contains(${markoutMap.start + m.token})`).length;
		var ends = $(`p:contains(${markoutMap.end + m.token})`).length;
		
		stats.markout.wrappers[m.token] = starts === ends ? starts : `[ERROR] ${starts}:${ends}`;

		console.log(`	${m.token}	= ${stats.markout.wrappers[m.token]}`);
	}
	

	stats["images"] = $("img").length;

	console.log("Images:");
	console.log(`	img = ${stats.images}`);
	
	
	stats["headings"] = {};
	stats.headings["h1"] = $("h1").length;
	stats.headings["h2"] = $("h2").length;
	stats.headings["h3"] = $("h3").length;
	stats.headings["h4"] = $("h4").length;
	stats.headings["h5"] = $("h5").length;
	stats.headings["h6"] = $("h6").length;

	console.log("Headings:");
	console.log(`	h1 = ${stats.headings.h1}`);
	console.log(`	h2 = ${stats.headings.h2}`);
	console.log(`	h3 = ${stats.headings.h3}`);
	console.log(`	h4 = ${stats.headings.h4}`);
	console.log(`	h5 = ${stats.headings.h5}`);
	console.log(`	h6 = ${stats.headings.h6}`);
	
	console.log("Stats Object:");
	console.log(JSON.stringify(stats,null,"  "));
	
	return;
}