require('dotenv').config()
const request = require('request');
const twit = require('twit');

const config = {
 consumer_key: process.env.consumer_key,
 consumer_secret: process.env.consumer_secret,
 access_token: process.env.access_token,
 access_token_secret: process.env.access_token_secret
}

const  personal_token = process.env.personal_token

const Twitter = new twit(config);

const userID = "102773464"

const stream = Twitter.stream('statuses/filter', {follow: [userID]})


stream.on('tweet', function (tweet) {

    if(tweet.user.id_str === userID){

        let tweetId = tweet.id_str
        let tweetBody = tweet.text
        let suspended = tweetBody.includes("suspended")

        sendStatus(tweetBody, suspended)

        if(suspended) {
            retweet(tweetId)
        }
    }
});

const retweet = function(id) {
    Twitter.post('statuses/retweet/:id', {id: id}, function(err, res) {
            if(res){
                console.log(`Successfully Retweeted "${res.text}"`)
            } else {
                console.log(error.message)
            }
        })
        
}

const sendStatus = function(body, suspended) {
    request.post(
        "https://alternate-side-twilio.herokuapp.com/status", 
        {
            'auth': {'bearer': personal_token},
            'json': {'status': {'body': body, 'suspended': suspended}}
        }, function(error, response, body) {
            console.log("Error "+error)
            console.log("Response "+response.statusCode)
            console.log("Body "+body)
        }
    )
}


// Prevent Heroku from falling asleep

setInterval(() => console.log('Listening...'), 1740000)