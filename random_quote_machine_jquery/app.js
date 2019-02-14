"use strict";

const QUOTE = "quote";
const AUTHOR = "author";
const WIKI_LINK = "wikiLink";
const TWITTER_HREF = "https://twitter.com/intent/tweet";

const quotes = [
    {QUOTE: "Life is 10% what happens to you and 90% how you react to it.", AUTHOR: "Charles R. Swindoll", WIKI_LINK: "https://en.wikipedia.org/wiki/Chuck_Swindoll"},
    {QUOTE: "For it was not into my ear that you whispered, but into my heart. It was not my lips you kissed, but my soul", AUTHOR: "Judy Garland", WIKI_LINK: "https://en.wikipedia.org/wiki/Judy_Garland"},
    {QUOTE: "Keep your face to the sunshine and you cannot see a shadow", AUTHOR: "Helen Keller", WIKI_LINK: "https://en.wikipedia.org/wiki/Helen_Keller"},
    {QUOTE: "With the new day comes new strength and new thoughts", AUTHOR: "Eleanor Roosevelt", WIKI_LINK: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt"},
    {QUOTE: "Success is a lousy teacher. It seduces smart people into thinking they can't lose", AUTHOR: "Bill Gates", WIKI_LINK: "https://en.wikipedia.org/wiki/Bill_Gates"},    
];

const images = [
    "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    "http://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max",
    "http://images.unsplash.com/photo-1491416658434-2dc561becd92?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
];

const colors = ["#32CD32", "#20B2AA", "#B8860B", "#800000","#ff9900"];

function randomInt(fromInt, toInt) {
    return (Math.floor(Math.random() * (toInt - fromInt + 1)) + fromInt);    
}

function newRandomQuote() {    
    const randomQuote = quotes[randomInt(0, quotes.length - 1)];
    const randomImage = images[randomInt(0, images.length - 1)];
    const randomColor = colors[randomInt(0, colors.length - 1)];
       
    $(".card-body").fadeOut(200, function() {        
        $("#text").text(randomQuote.QUOTE);
        $("#author").text(randomQuote.AUTHOR);
        $("#quote-box").css("color", randomColor);
        $(".blockquote-footer").css("color", randomColor);
        $("button").css("background-color", randomColor);
        $("#tweet-quote").prop("href", `${TWITTER_HREF}?text="${randomQuote.QUOTE}". ${randomQuote.AUTHOR}.`);
        $(".fa-twitter").css("color", randomColor);
        $(".card-body").fadeIn(200);
    });
}

$(document).ready(newRandomQuote);

