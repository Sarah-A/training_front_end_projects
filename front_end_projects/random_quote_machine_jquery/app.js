"use strict";

const QUOTE = "quote";
const AUTHOR = "author";
const WIKI_LINK = "wikiLink";
const TWITTER_HREF = "https://twitter.com/intent/tweet";

const quotes = [
    {
        QUOTE: "Life is 10% what happens to you and 90% how you react to it.", 
        AUTHOR: "Charles R. Swindoll", 
        WIKI_LINK: "https://en.wikipedia.org/wiki/Chuck_Swindoll"
    },
    {
        QUOTE: "For it was not into my ear that you whispered, but into my heart. It was not my lips you kissed, but my soul", 
        AUTHOR: "Judy Garland", 
        WIKI_LINK: "https://en.wikipedia.org/wiki/Judy_Garland"
    },
    {
        QUOTE: "Keep your face to the sunshine and you cannot see a shadow", 
        AUTHOR: "Helen Keller", 
        WIKI_LINK: "https://en.wikipedia.org/wiki/Helen_Keller"
    },
    {
        QUOTE: "With the new day comes new strength and new thoughts", 
        AUTHOR: "Eleanor Roosevelt", 
        WIKI_LINK: "https://en.wikipedia.org/wiki/Eleanor_Roosevelt"
    },
    {
        QUOTE: "Success is a lousy teacher. It seduces smart people into thinking they can't lose", 
        AUTHOR: "Bill Gates", 
        WIKI_LINK: "https://en.wikipedia.org/wiki/Bill_Gates"
    },    
];


const colors = ["#32CD32", "#20B2AA", "#B8860B", "#800000","#ff9900"];

function randomInt(fromInt, toInt) {
    return (Math.floor(Math.random() * (toInt - fromInt + 1)) + fromInt);    
}

function newRandomQuote() {    
    const randomQuote = quotes[randomInt(0, quotes.length - 1)];
    const randomColor = colors[randomInt(0, colors.length - 1)];
      
    
    $(".blockquote").fadeOut(200, function() {        
        $("button").css("background-color", randomColor);
        $(".fa-twitter").css("color", randomColor);
        $("#text").text(randomQuote.QUOTE);
        $("#author").text(randomQuote.AUTHOR);
        $(".blockquote,.blockquote-footer").css("color", randomColor);
        $("#tweet-quote").prop("href", `${TWITTER_HREF}?text="${randomQuote.QUOTE}". ${randomQuote.AUTHOR}.`);
        $(".blockquote").fadeIn(400);
    });
  
}

$(document).ready(newRandomQuote);

