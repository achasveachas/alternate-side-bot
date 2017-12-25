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

let retweet = function() {
    let params = {
        screen_name: "NYCASP",
        since_id: since_id
    }

    Twitter.get('/statuses/user_timeline', params, function(err, data) {
        if(!err) {
            for (let i = 0; i < data.length; i++) {
                let tweet = data[i];
                since_id = tweet.id_str
                if(tweet.text.includes("suspended")) {
                    Twitter.post('statuses/retweet/:id', {id: tweet.id_str}, function(err, res) {
                        if(err)
                            console.log(err)
                        
                        if(res)
                            console.log("Successfully Retweeted")
                    })
                }
            }
        } else {
            console.log("could not retrieve tweets becuase ", err)
        }
    })
}

retweet()