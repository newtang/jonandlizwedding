var nconf = require("nconf"),
	express = require('express'),
	Flickr = require("flickrapi"),
	app = express();

nconf.env().file({file: ".env"});

var flickrOptions = {
  api_key: nconf.get("FLICKR_KEY"),
  secret: nconf.get("FLICKR_SECRET")
},
port = nconf.get("PORT");

function constructPhotoJson(apiResults){
	var json = {
		page: apiResults.photos.page,
		total: apiResults.photos.total,
		tag: apiResults.photos.tag,
		photos: [apiResults.photos.photo.map(function(item){
			return {
				title: item.title,
				url: buildImgUrl(item)
			}
		})];


	};
}

 public function buildImgUrl($size = self::SIZE_240PX) {
        $type = 'jpg';
        $sizeStr = "_$size";

        switch ($size) {
        case self::SIZE_500PX:
            $sizeStr = '';
            break;

        case self::SIZE_ORIGINAL:
            $sizes = $this->getSizes();
            return $sizes[self::SIZE_ORIGINAL]['source'];
        }

        $url = sprintf("http://farm%d.static.flickr.com/%d/%d_%s%s.%s",
            $this->getFarm(), $this->getServer(), $this->getId(), $this->getSecret(), $sizeStr, $type);
        return $url;
    }

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
	if(error){
		console.log("Error retrieving flickr api.", error);
	}
	else if(flickr){
		console.log("Flickr apis retrieved successfully");
	}
	else{
		console.log("No error, and no flickr api. Weird");
	}


	 /*
	  array(
		     'group_id' => self::GROUP_ID,
//		     'user_id' => $api->getUserId(),
		     'per_page' => self::PER_PAGE,
		     'page' => $page
		    );

		if($tag != NULL && $tag != self::DEFAULT_TAG){
			$args['tags'] = $tag;
		}
	  */

	app.get("/getPhotos", function(req, res){
		  flickr.groups.pools.getPhotos({
		  	group_id: "1509390@N21",
		  	per_page: 30,
		  	page: 1
		  }, function(err, result){
		  	console.log(result);




		  	res.send(result);
		  });
  	});

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