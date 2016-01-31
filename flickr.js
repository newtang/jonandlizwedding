"use strict";

var Flickr = require("flickrapi"),
	nconf = require("nconf"),
	flickrOptions = {
	  api_key: nconf.get("FLICKR_KEY"),
	  secret: nconf.get("FLICKR_SECRET")
	},
	GROUP_ID = "1509390@N21",
	PER_PAGE = 30,
	flickrLib = null;

function assert(obj, str){
	if(!obj){
		throw str || "Expected variable falsy";
	}
}

function constructPhotoJson(apiResults, tag){
	if(apiResults && apiResults.photos){
		apiResults.photos.photo = apiResults.photos.photo || [];
		return {
			page: apiResults.photos.page,
			total: parseInt(apiResults.photos.total, 10),
			tag: tag,
			photos: apiResults.photos.photo.map(function(item){
				return {
					title: item.title,
					url: buildImgUrl(item, 's')
				};
			})
		};
	}
	else{
		return {};
	}
}

function buildImgUrl(item, size){
	var type = "jpg";
	return "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/"+ item.id + "_" + item.secret;
}

module.exports = {
	init: function(callback){
		assert(callback, "Callback required");

		if(flickrLib){
			console.warn("Unnecessary call of init");
			callback(null, true);
		}
		else{
			Flickr.tokenOnly(flickrOptions, function(error, flickr) {
				if(error){
					callback(error);
				}
				else{
					flickrLib = flickr;
					callback(null, true);
				}
			});
		}
	},
	getPhotosDefault: function(callback){
		this.getPhotos(1, null, callback);
	},
	getPhotos: function(page, tag, callback){
		assert(flickrLib, "Init not called");
		assert(callback, "Callback required");

		var params = {
		  	group_id: GROUP_ID,
		  	per_page: PER_PAGE,
		  	page: page
		};

		if(tag && typeof tag === "string"){
			tag = tag.trim();
			if(tag !== "null" && tag !== "default"){
				params.tags = tag;
			}
		}

		flickrLib.groups.pools.getPhotos(params, function(err, result){
			if(err){
				console.log("err: " + err);
				callback(err, null);
			}
			else{
			  	var newJSON = constructPhotoJson(result, tag);

			  	callback(null, newJSON);
			}
		});

	}


};