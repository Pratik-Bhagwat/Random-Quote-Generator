"use strict";
let apiQuotes = [];

const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

// Show new Quote
function newQuote() {
  // pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //check if author field is blank and replace it with 'Unknown'
  authorText.textContent = quote.author || "Unknown";
  if (quote.text.length > 50) quoteText.classList.add("long-quote");
  else quoteText.classList.remove("long-quote");
  quoteText.textContent = quote.text;
}

// get Quotes from API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    //await waits until data is fetched then assign it to variable
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catching the error
  }
}

// tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on Load
getQuotes();
