/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Create and return HTML for a new tweet
function createTweetElement(tweetObj) {
    let $tweetEl = $('<article>');
    let $headerEl = $("<header>");
    for (properties in tweetObj) {
        if (tweetObj[properties].avatars) {
          $tweetEl.append(
            `<img src="${tweetObj[properties].avatars.small}>"</img>`
          );
        }
        $headerEl.append(tweetObj[properties].handle);
        $headerEl.append(`<h1> ${tweetObj[properties].name} </h1>`);
        $headerEl.append(`<a href="${tweetObj[properties].name}"></a>`);
        $tweetEl.append(headerEl);

    }
    return $tweetEl;
}

// <article>
//   <header>
//     <img src="/images/profile_1.jpg" alt="MrFields profile image" />
//     <h1>Bill Fields</h1>
//     <a href="http://localhost:8080/" rel="author">
//       @MrFields
//     </a>
//   </header>
//   <div class="tweet-body">
//     <p>Little tweet here</p>
//   </div>
//   <footer>
//     <time>10 days ago</time>
//     <div class="tweet-action-btns">
//       <a class="tweet-act-btn" href="#">
//         <i class="fas fa-flag" />
//       </a>
//       <a class="tweet-act-btn" href="#">
//         <i class="fas fa-retweet" />
//       </a>
//       <a class="tweet-act-btn" href="#">
//         <i class="fas fa-heart" />
//       </a>
//     </div>
//   </footer>
// </article>;

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
    "user": {
        "name": "Newton",
        "avatars": {
            "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
            "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
            "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
    },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);

$(document).ready(function () {
    console.log($tweet);
});

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $(document).ready(function () {
//     $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// });