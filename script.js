const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { text: "If you are working on something exciting, it will keep you motivated.", author: "Unknown" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Dream bigger. Do bigger.", author: "Unknown" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" }
];

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const saveQuoteBtn = document.getElementById('save-quote-btn');
const favoritesList = document.getElementById('favorites-list');

let currentQuote = null;

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function displayQuote(quote) {
  quoteText.textContent = `"${quote.text}"`;
  quoteAuthor.textContent = `– ${quote.author}`;
  currentQuote = quote;
}

function loadFavorites() {
  return JSON.parse(localStorage.getItem('favoriteQuotes') || '[]');
}

function saveFavorites(favorites) {
  localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
}

function renderFavorites() {
  const favorites = loadFavorites();
  favoritesList.innerHTML = '';
  favorites.forEach((quote, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>${quote.text}</div>
      <div class="favorite-author">– ${quote.author}</div>
      <button class="remove-btn" onclick="removeFavorite(${index})">Remove</button>
    `;
    favoritesList.appendChild(li);
  });
}

function removeFavorite(index) {
  const favorites = loadFavorites();
  favorites.splice(index, 1);
  saveFavorites(favorites);
  renderFavorites();
}

newQuoteBtn.addEventListener('click', () => {
  const quote = getRandomQuote();
  displayQuote(quote);
});

saveQuoteBtn.addEventListener('click', () => {
  if (!currentQuote) return alert('No quote to save!');
  const favorites = loadFavorites();
  // Avoid duplicate saves
  if (favorites.some(q => q.text === currentQuote.text)) {
    alert('Quote already saved!');
    return;
  }
  favorites.push(currentQuote);
  saveFavorites(favorites);
  renderFavorites();
  alert('Quote saved to favorites!');
});

// Initialize
displayQuote(getRandomQuote());
renderFavorites();

// Make removeFavorite global to use in onclick
window.removeFavorite = removeFavorite;
