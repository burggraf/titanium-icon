# getIcon

## Get an icon from a saved IcoMoon font file as a Titanium Label object
 	
### setup
1. create a font using the IcoMoon App located at http://icomoon.io
2. download your font
3. copy your font.ttf file to /app/assets/fonts
4. copy your selection.json file to /app/assets and name it <fontname>.json
5. copy this file (icon.js) to /app/lib
6. call getIcon() from your app

### usage
getIcon(fontname, iconname, size, options)
	
	fontname: this is the name of the font file matching <fontname>.ttf and <fontname>.json

	iconname: this is the name of the icon you want to retrieve

	size: the size of the icon you want in dp (it'll be square by default)

	options: an optional object of Ti.UI.label properties to apply to the label object that is returned
			
### example
	var icon = require("icon");
	var win = Ti.UI.createWindow({});
	// create a 32dp x 32dp red dog icon
	var myicon = icon.getIcon("icomoon","big_red_dog",32,{color:red}); 
	win.add(myicon);

