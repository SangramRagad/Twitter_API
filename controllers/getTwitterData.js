var Twitter = require("twitter");

//Setup tokens
const client = new Twitter({
  consumer_key: "SKNTXjX9dJ8keXzkuF5JSPHrl",
  consumer_secret: "h7TtSogIWNVyCfnbxxmtYQzGZEhAQyvjglA7YfbkfKnS2vDvNl",
  access_token_key: "1268175955333267457-tJhxz6A4aFnRNmSsuzmo7THVGhgjoj",
  access_token_secret: "UXXXsH2MY4zpoD7wIRVT5JNvlQZ7CgZ9VorctI8ourMEV",
});

// Set up your search parameters

// var params = {
//   q: "#cyclone",
//   count: 5,
//   lang: "en",
// };

var params = {
  screen_name: "@nitin_gadkari",
};

exports.getTweets = (req, res) => {
  console.log("===gettweets Method called===");
  client.get("search/tweets", params, (err, tweets) => {
    if (!err) {
      //const twitters = tweets;
      let text, user;
      const twitters = tweets.statuses.map(twit => {
        const data = {
          Name: twit.user.name,
          UserName: twit.user.screen_name,
          Follwing: twit.user.friends_count,
          Followers: twit.user.followers_count,
          JoinedAt: twit.user.created_at,
          Likes: twit.user.favourites_count,
          Tweet: twit.text,
          CreateAt: twit.created_at,
          RetweetedBy: twit.retweeted_status.user.name,
        };
        return data;
      });
      res.status(200).json({
        result: tweets.statuses.length,
        twitters,
      });
    } else {
      res.status(500).json({ error: err });
    }
  });
};

exports.getUser = (req, res) => {
  client.get("users/show", params, (err, Tusers) => {
    if (!err) {
      const user = Tusers;
      res.status(200).json({
        status: "Success",
        user,
      });
    } else {
      res.status(500).json({
        status: "Fail",
        Error: err,
      });
    }
  });
};
