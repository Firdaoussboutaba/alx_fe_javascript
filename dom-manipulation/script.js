
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






function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.id = 'addQuoteForm';

  const quoteInput = document.createElement('input');
  quoteInput.id = 'newQuoteText';
  quoteInput.type = 'text';
  quoteInput.placeholder = 'Enter a new quote';

  const categoryInput = document.createElement('input');
  categoryInput.id = 'newQuoteCategory';
  categoryInput.type = 'text';
  categoryInput.placeholder = 'Enter quote category';

  const addButton = document.createElement('button');
  addButton.textContent = 'Add Quote';
  addButton.addEventListener('click', addQuote);

  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

document.addEventListener('DOMContentLoaded', () => {
  createAddQuoteForm();
  loadQuotes();
  loadLastViewedQuote();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  document.getElementById('exportQuotesBtn').addEventListener('click', exportQuotes);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
});

 


function populateCategoryFilter() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  const categories = quotes.reduce((cats, quote) => {
      if (!cats.includes(quote.category)) {
          cats.push(quote.category);
      }
      return cats;
  }, []);
  
  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}


function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  quotes.forEach(quote => {
      if (selectedCategory === 'all' || quote.category === selectedCategory) {
          const quoteElement = document.createElement('p');
          quoteElement.textContent = `${quote.text} - ${quote.category}`;
          quoteDisplay.appendChild(quoteElement);
      }
  });

  localStorage.setItem('selectedCategory', selectedCategory);
}


document.addEventListener('DOMContentLoaded', () => {
  populateCategoryFilter();
  const savedCategory = localStorage.getItem('selectedCategory') || 'all';
  document.getElementById('categoryFilter').value = savedCategory;
  filterQuotes();
});



function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value.trim();
  const quoteCategory = document.getElementById('newQuoteCategory').value.trim();
  
  if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      saveQuotes();
      populateCategoryFilter(); 
      filterQuotes(); 
  }
}


function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  const categories = quotes
      .map(quote => quote.category)
      .filter((value, index, self) => self.indexOf(value) === index);

  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}




const quotes = [
  { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
  { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", category: "Humor" },
  { text: "Be the change that you wish to see in the world.", category: "Motivation" },
  { text: "If you tell the truth, you don't have to remember anything.", category: "Wisdom" },
  { text: "A day without sunshine is like, you know, night.", category: "Humor" }
];

function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  const categories = quotes
      .map(quote => quote.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  
  categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  quotes.forEach(quote => {
      if (selectedCategory === 'all' || quote.category === selectedCategory) {
          const quoteElement = document.createElement('p');
          quoteElement.textContent = `${quote.text} - ${quote.category}`;
          quoteDisplay.appendChild(quoteElement);
      }
  });

  localStorage.setItem('selectedCategory', selectedCategory);
}

document.addEventListener('DOMContentLoaded', () => {
  populateCategories();
  const savedCategory = localStorage.getItem('selectedCategory') || 'all';
  document.getElementById('categoryFilter').value = savedCategory;
  filterQuotes();
});


});

  