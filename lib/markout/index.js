"use strict";

var cheerio = require("../cheerio-loader");

var cheerioMarkoutMethods = require("./cheerio-markout-methods");
var normalizeMarkers = require("./normalize-markers");
var convertMarkers = require("./convert-markers");
var constructSliders = require("./construct-sliders");
var constructImages = require("./construct-images");
var constructMath = require("./construct-math");
var constructAudio = require("./construct-audio");
var constructVideos = require("./construct-videos");
var constructTables = require("./construct-tables");
var constructReveals = require("./construct-reveals");
var constructComments = require("./construct-comments");
var invalidMarkers = require("./report-invalid-markers");

var markoutMap = null;

module.exports = function (htmlArray, markoutMapPath) {
	if (markoutMap === null) {
		markoutMap = require(markoutMapPath);
	}
	htmlArray = htmlArray.map(function (item) {
		return markout(item, markoutMap);
	});
	
	return htmlArray;
};

function markout(html, markoutMap) {
	var $ = cheerio.load("<temp>" + html + "</temp>");

	cheerioMarkoutMethods($);
	normalizeMarkers($, markoutMap);
	invalidMarkers($, markoutMap);
    convertMarkers($, markoutMap);
    constructSliders($, markoutMap);
	constructImages($, markoutMap);
	constructMath($, markoutMap);
	constructAudio($);
	constructVideos($);
	constructTables($, markoutMap);
	constructReveals($);
	constructComments($);

	return $("temp").html();
}