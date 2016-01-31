"use strict";

var nconf = require("nconf");
nconf.env().file({file: ".env"});

/**
	file based config can return all types, but env variables tend to only return strings.
*/

function convert(value){
	if(typeof value === "string"){
		value = value.trim();
		var lc = value.toLowerCase();
		if(lc === "true"){
			return true;
		}
		else if(lc === "false"){
			return false;
		}

		var num = parseInt(value);
		if (!isNaN(num) && num.toString() === value){
			return num;
		}

		num = parseFloat(value);
		if (!isNaN(num) && num.toString() === value){
			return num;
		}
	}

	return value;

}


module.exports = {
	get: function(key){
		key = key.toUpperCase();

		var value = nconf.get(key);
		if(value !== null && value !== undefined){
			return convert(value);
		}

		throw "Invalid Key: " + key;
	}
};