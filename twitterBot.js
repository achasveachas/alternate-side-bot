require('dotenv').config()
const twit = require('twit');

const config = {
 consumer_key: process.env.consumer_key,
 consumer_secret: process.env.consumer_secret,
 access_token: process.env.access_token,
 access_token_secret: process.env.access_token_secret
}

const Twitter = new twit(config);

let since_id = 1

const getTweets = function() {
    let params = {
        screen_name: "NYCASP",
        since_id: since_id
    }

    Twitter.get('/statuses/user_timeline', params, function(err, data) {
        if(!err) {
            for (let i = 0; i < data.length; i++) {
                let tweet = data[i];
                since_id = tweet.id + 1
                if(tweet.text.includes("suspended")) {
                    retweet(tweet.id_str)
                }
            }
        } else {
            console.log("could not retrieve tweets becuase ", err)
        }
    })
}

const retweet = function(id) {
    Twitter.post('statuses/retweet/:id', {id: id}, function(err, res) {
        if(err)
            console.log(err)
        
        if(res)
            console.log("Successfully Retweeted")
        })
        
}


getTweets()

setInterval(getTweets, 1800000)