/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//Used to get the difference in days between now and the tweet post date
function getTweetDaysAgo(tweetTime) {
    var timeDiff = Date.now() - tweetTime;
    var daysDiff = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

    return daysDiff;
}

//Create a section of the DOM using JQuery and return the HTML for a new tweet
function createTweetElement(tweetObj) {
    let $tweetEl = $('<article>');
    let $headerEl = $("<header>");
    let $avatarEl = $("<img>");
    let $headerh1 = $("<h1>");
    let $authorLink = $("<a>");
    let $tweetBody = $("<div>").addClass("tweet-body");
    let $footerEl = $("<footer>");
    let $footerTimeEl = $("<time>");
    let $footerLinksEl = $("<div>").addClass("tweet-action-btns");
    let $reportLink = $("<a>").addClass("tweet-act-btn");
    let $retweetLink = $("<a>").addClass("tweet-act-btn");
    let $favoriteLink = $("<a>").addClass("tweet-act-btn");
    let $reportIcon = $("<i>").addClass("fas fa-flag");
    let $retweetIcon = $("<i>").addClass("fas fa-retweet");
    let $favoriteIcon = $("<i>").addClass("fas fa-heart");
    let timeDaysAgo = getTweetDaysAgo(tweetObj.created_at);

    //Assign all inner texts
    $tweetBody.text(tweetObj.content.text);
    $authorLink.text(tweetObj.user.handle);
    $headerh1.text(tweetObj.user.name);
    $footerTimeEl.text(timeDaysAgo + " days ago");

    //Assign all HTML element attributes
    $avatarEl.attr("src", tweetObj.user.avatars.small);
    $avatarEl.attr("alt", `${tweetObj.user.name}'s Avatar`);
    $authorLink.attr("href", "#");
    $reportLink.attr("href", "#");
    $retweetLink.attr("href", "#");
    $favoriteLink.attr("href", "#");

    //Append user handle and link header
    $headerEl.append($authorLink);

    //Append avatar image and user name to header
    $headerEl.append($avatarEl);
    $headerEl.append($headerh1);

    //Append header to tweet
    $tweetEl.append($headerEl);

    //Append body to tweet
    $tweetEl.append($tweetBody);

    //Append post date to footer rlement
    $footerEl.append($footerTimeEl);

    //Append footer action links
    $reportLink.append($reportIcon);
    $retweetLink.append($retweetIcon);
    $favoriteLink.append($favoriteIcon);
    $footerLinksEl.append($reportLink);
    $footerLinksEl.append($retweetLink);
    $footerLinksEl.append($favoriteLink);

    //Append action links wrapper to footer
    $footerEl.append($footerLinksEl);

    //Append footer to tweet
    $tweetEl.append($footerEl);

    return $tweetEl;
}

// Loops through tweets
// Calls createTweetElement for each tweet
// Takes return value and appends it to the tweets container
function renderTweets(tweets) {
    let tweetArr = [];
    for (let tweetObj of tweets) {
        let tweetElement = createTweetElement(tweetObj);
        tweetArr.push(tweetElement);
        tweetArr.reverse();
    }
    $("#tweets-container").append(tweetArr);
}

// Fake data taken from tweets.json
const data = [
    {
        user: {
            name: "Bill Fields",
            avatars: {
                small: "/images/profile_1.jpg",
                regular: "/images/profile_1.jpg",
                large: "/images/profile_1.jpg"
            },
            handle: "@MrFields"
        },
        content: {
            text: "Little tweet here"
        },
        created_at: 1554869365
    },
    {
        user: {
            name: "Newton",
            avatars: {
                small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
                regular: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
                large: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
            },
            handle: "@SirIsaac"
        },
        content: {
            text:
                "If I have seen further it is by standing on the shoulders of giants"
        },
        created_at: 1461116232227
    },
    {
        user: {
            name: "Descartes",
            avatars: {
                small: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
                regular: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
                large: "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
            },
            handle: "@rd"
        },
        content: {
            text: "Je pense , donc je suis"
        },
        created_at: 1461113959088
    },
    {
        user: {
            name: "Johann von Goethe",
            avatars: {
                small: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
                regular: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
                large: "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
            },
            handle: "@johann49"
        },
        content: {
            text: "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        created_at: 1461113796368
    }
];

//Load Tweets
function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
        .then(function (receivedHtml) {
            renderTweets(receivedHtml);
        });
}

// Render all tweets in the dataset
$(document).ready(function () {
    var maxTweetLength = 140;

    // Load tweets list
    loadTweets();

    // Make AJAX call to fetch requested data
    $("#new-tweet-form").submit(function (e) {
        event.preventDefault();
        if (!$(this).context.elements[0].value) {
            alert("You must enter a text before submitting.");
            return;
        }
        else if ($(this).context.elements[0].value.length > maxTweetLength) {
            alert("Your text cannot exceed 140 characters!");
            return;
        }
        $.post("/tweets", $(this).serialize()).done(datab => {
            $("#tweets-container").empty();
            loadTweets();

            // let rData = data.reverse()[0];
            // console.log(rData[Object.keys(rData)]);
            // let tweetAdded = createTweetElement(rData[Object.keys(rData)]);
            //renderTweets(tweetAdded);
        });
    });

    // Make AJAX call to fetch requested data
    $("#compose-btn").click(function () {
        $(".new-tweet").slideToggle();
    });

});

// $(document).ready(function () {
//     $("#new-tweet-form").submit(function (e) {
//         event.preventDefault();
//         $.post("/tweets", $(this).serialize());
//         //loadTweets();
//     });
// });

// $(document).ready(() => {
//     renderTweets(data);

//     // Make AJAX call to fetch requested data
//     $("#new-tweet-form").submit(e => {
//         event.preventDefault();
//         $.post("/tweets", $(this).serialize());
//         //loadTweets();
//     });
// });