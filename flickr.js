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

function constructPhotoJson(apiResults){
	if(apiResults && apiResults.photos){
		apiResults.photos.photo = apiResults.photos.photo || [];
		return {
			page: apiResults.photos.page,
			total: apiResults.photos.total,
			tag: apiResults.photos.tag,
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
		flickrLib.groups.pools.getPhotos({
		  	group_id: GROUP_ID,
		  	per_page: PER_PAGE,
		  	tag: tag,
		  	page: page
		}, function(err, result){
			if(err){
				callback(result, newJSON);
			}
			else{
			  	var newJSON = constructPhotoJson(result);

			  	callback(null, newJSON);
			}
		});

	}


};