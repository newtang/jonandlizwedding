var nconf = require("nconf"),
	express = require('express'),
	app = express();

nconf.env().file({file: ".env"});

var port = nconf.get("PORT");

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