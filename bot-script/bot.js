const Twit = require("twit");
const twit = new Twit(require("./config.js"));
const hashtags = { q: "#science", result_type: "recent", lang:'en' };

const retweetLatest = async() => {
  try {
       twit.get("search/tweets", hashtags, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {

      const retweetId = data.statuses[0].id_str; //grabbing ID of the tweet
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
        if (error) {                            //printing errors during twitter calls
          console.log(error.message);
        } else if (response) {
          console.log("Success! Retweeted!");
        }
      });
    }
  });
  } catch(error) {
     // Handle errors
    console.log(error)
  }
};

retweetLatest();
setInterval(retweetLatest, 2700000); //Set this for an interval of 45 mins
