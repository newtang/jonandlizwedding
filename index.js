"use strict";

var nconf = require("nconf");
nconf.env().file({file: ".env"});

var express = require('express'),
	flickr = require("./flickr.js"),
	fs = require("fs"),
	app = express(),
	port = nconf.get("PORT");

app.use(require("./enforceHttps.js"));
flickr.init(function(err){
	if(err){
		console.error("Error retrieving flickr api.", error);
		throw err;
	}
	else{
		console.log("Flickr apis are ready");
	}
	

	app.get("/getPhotos.php", function(req, res){
		var page = req.query.page || 1,
			tag = req.query.tag;
		flickr.getPhotos(page, tag, function(err, results){
			res.send(results);
		});
  	});

	var handleHome = function(req, res){
		fs.readFile("./html/index.html", "utf8", function(fileErr, fileContents){
			if(err){
				console.error("Error reading file", fileErr);
				res.status(404);
			}
			else{
				flickr.getPhotosDefault(function(photoErr, results){
					if(err){
						console.error("Error fetching photos", photoErr);
						results = "{}";
					}

					//lame template, but it's the only place I need it.
					fileContents = fileContents.split("//STARTING_DATA_HERE").join(JSON.stringify(results));
					res.send(fileContents);
				});
				
			}

		});
	};

	app.get('/', handleHome);
	app.get('/index.html', handleHome);
	app.use('/', express.static(__dirname + "/html"));

	//javascript files
	app.use("/js", express.static(__dirname + "/js"));

	//css files
	app.use("/css", express.static(__dirname + "/css"));

	//static images
	app.use("/img", express.static(__dirname + "/img"));

	app.listen(port, function() {
	  console.log("Listening on " + port);
	});	

});