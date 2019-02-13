const QUOTE = "quote";
const AUTHOR = "author";
const WIKI_LINK = "wikiLink";
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

function newQuote() {
    $("body").css("background", `url(${images[1]}) no-repeat`);
    $("#text").html(quotes[3].QUOTE);
    $("#author").html(quotes[3].AUTHOR);
}

$(document).ready(newQuote);