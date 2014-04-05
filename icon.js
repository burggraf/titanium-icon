/*
 	getIcon - Get an icon from a saved IcoMoon font file as a Titanium Label object
 	
 	setup:	1. create a font using the IcoMoon App located at http://icomoon.io
 			2. download your font
 			3. copy your font.ttf file to /app/assets/fonts
 			4. copy your selection.json file to /app/assets and name it <fontname>.json
 			5. copy this file (icon.js) to /app/lib
 			5. call getIcon() from your app

	usage:	getIcon(fontname, iconname, size, options)
	
			fontname: this is the name of the font file matching <fontname>.ttf and <fontname>.json
			iconname: this is the name of the icon you want to retrieve
			size: the size of the icon you want in dp (it'll be square by default)
			options: an optional object of Ti.UI.label properties to apply to the label object that is returned
			
	example:
	
				var icon = require("icon"); // this file (icon.js), which should be copied to your /app/lib folder
 				var win = Ti.UI.createWindow({});
 				var myicon = icon.getIcon("icomoon","big_red_dog",32,{color:red}); // returns a 32dp x 32dp red dog icon
 				win.add(myicon);
 */
var fontMaps = {};

function initializeFont(fontname) {
	if (typeof fontMaps[fontname] == "undefined") fontMaps[fontname] = {};
	try {
		var obj = JSON.parse(Titanium.Filesystem.getFile(fontname + '.json').read().text);
		var fontmap = obj.icons;
		for (var i = 0; i < fontmap.length; i++) {
			var font = fontmap[i].properties.name;
			var code = fontmap[i].properties.code;
			console.log("Found: " + fontname + " / " + font + " / " + code);
			fontMaps[fontname][font] = String.fromCharCode(code);
		}
	} catch (fontParseError) {
		console.log("*** There was a font parsing error.  " +
					"Did you copy your font's selection.json file "+
					"into the assets folder of your application and name it " + fontname + ".json?");
		console.log("*** fontParseError: " + fontParseError);
	}
}

var getIcon = function(fontname, iconname, size, options) {
	if (typeof fontMaps[fontname] == "undefined") initializeFont(fontname);
	var label = Ti.UI.createLabel({
		height : size + "dp",
		width : size + "dp",
		font : {
			fontFamily : fontname,
			fontSize : size + "dp"
		},
		text : ( typeof iconname == "string" ? fontMaps[fontname][iconname] : String.fromCharCode(iconname)),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		color : "black"
	});
	if ( typeof options == "object") {
		for (var attr in options) {
			label[attr] = options[attr];
		}
	}
	return label;
};
exports.getIcon = getIcon; 

