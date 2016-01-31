"use strict";

var env = require("./env.js");

module.exports = function(req, res, next){

	var doRedirect = false,
		hostHeaderValue = req.header("host"),
		forwardHeaderValue = req.header('x-forwarded-proto'); //This header is what our app sees in Heroku.


	//if people navigate to jonandlizwedding.herokuapp.com, I'd like to redirect them to jonandlizwedding.com.
	if(env.get("HEROKUAPP_REDIRECT") && (!hostHeaderValue || hostHeaderValue.toLowerCase().indexOf("herokuapp") !== -1)){
		hostHeaderValue = "plumfeed.com";
		doRedirect = true;
	}
	
	//redirect from http to https if setting is on
	if(env.get("HTTPS_REDIRECT") && forwardHeaderValue && forwardHeaderValue !== "https"){
		doRedirect = true;
	}
		
	if(doRedirect){

		var protocol = "https://";
		if(!env.get("HTTPS_REDIRECT")){
			protocol = "http://";
		}

		res.redirect(protocol + hostHeaderValue +req.url);
	}
	else{
		next();
	}
};