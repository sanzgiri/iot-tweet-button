var Twitter = require('twitter');
const config = require('./config.json');

//DotEnv allows us to create a .env file to hold our private credentials in lieu of environment variables that can't be set in AWS Lambda
require('dotenv').load();

//Reference environment variables saved in .env file
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

//This is the function we're invoking in Lambda
exports.handler = function(event, context) {

	var myTweet = config.tweet.single;

	if (event.clickType == "DOUBLE") {
	    myTweet = config.tweet.double;
	} else if (event.clickType == "LONG") {
	    myTweet = config.tweet.long;
	}

        myTweet += ' The time is now: '+Date();
	
	//Post the new status update
	client.post('statuses/update', {status: myTweet }, function(error, tweet, response){
	  if (!error) {
	  	console.log(tweet);
	  	//Context succeed notifies Lambda that the function succeeded.
	    context.succeed(tweet.id+" successfully sent.");
	  }
	  if (error) {
	  	//Context fail notifies Lambda that the function failed and it's safe to exit (as opposed to waiting for the Lambda timeout).
	  	console.log(error);
	  	context.fail(error);
	  }
	});


}
