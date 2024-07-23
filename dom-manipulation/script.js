
let quotes = [];


function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
  
    quotes = [
      { text: "The best way to predict the future is to invent it.", category: "Motivation" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "You miss 100% of the shots you don't take.", category: "Motivation" }
    ];
    saveQuotes(); 
  }
}


function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
}

function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes(); 
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    alert('Quote added successfully!');
  } else {
    alert('Please enter both quote text and category.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadQuotes();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);




function saveLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewedQuote', JSON.stringify(quote));
  }
  
  function loadLastViewedQuote() {
    const storedQuote = sessionStorage.getItem('lastViewedQuote');
    if (storedQuote) {
      const quote = JSON.parse(storedQuote);
      document.getElementById('quoteDisplay').innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
    }
  }
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerHTML = `<p>${quote.text}</p><p><em>${quote.category}</em></p>`;
    saveLastViewedQuote(quote);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    loadLastViewedQuote();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
  });

  


function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    loadLastViewedQuote();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
    document.getElementById('exportQuotesBtn').addEventListener('click', exportQuotes);
  });

  

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      try {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } catch (error) {
        alert('Error importing quotes. Please ensure the file is in the correct format.');
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    loadLastViewedQuote();
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
    document.getElementById('exportQuotesBtn').addEventListener('click', exportQuotes);
    document.getElementById('importFile').addEventListener('change', importFromJsonFile);
  });
  



});

  