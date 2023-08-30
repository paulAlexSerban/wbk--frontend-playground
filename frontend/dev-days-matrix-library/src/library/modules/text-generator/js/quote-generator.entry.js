// const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];


//Show New Quote
function newQuote() {
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if Author field is blank and replace it with 'Unknown''
  if(!quote.author){
    authorText.textContent = 'Unknown';
  }
  else{
  authorText.textContent = quote.author;
  }
  //Check the quote length to determine styling
  if(quote.text.length >120){
      quoteText.classList.add('long-quote');
  } 
  else{
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent =  quote.text;
  //Stop Loader, Show Quote
  loader.hidden = true;
  loader.classList.add('isHidden');
}


// For local quotes instead of API
// function newQuote() {
//     //Pick a random quote from apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
//   }


// Get Quotes from API
 async function getQuotes(){
     const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
     try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
     }catch(error){
        //  alert(error);
         //Catch Error Here
     }
 }


 //tweet a code
 function tweetQuote(){
     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterUrl, '_blank');
 }
 //Event Listeners

 newQuoteBtn.addEventListener('click',newQuote);
 twitterBtn.addEventListener('click',tweetQuote);
    
 //On Load
 getQuotes();

//  newQuote(); (For local quotes instead of API)