require('dotenv').config()
const twit = require('twit');

const config = {
 consumer_key: process.env.consumer_key,
 consumer_secret: process.env.consumer_secret,
 access_token: process.env.access_token,
 access_token_secret: process.env.access_token_secret
}

const Twitter = new twit(config);

const userID = "102773464"

const stream = Twitter.stream('statuses/filter', {follow: [userID]})


stream.on('tweet', function (tweet) {
        if(tweet.text.includes("suspended")) {
            retweet(tweet.id_str)
        } else {
            console.log("Nothing to tweet here...")
        }
  });

const retweet = function(id) {
    Twitter.post('statuses/retweet/:id', {id: id}, function(err, res) {
            if(res){
                console.log("Successfully Retweeted")
            } else {
                console.log(error.message)
            }
        })
        
}

// Prevent Heroku from falling asleep

setInterval(() => console.log('Listening...'), 1740000)