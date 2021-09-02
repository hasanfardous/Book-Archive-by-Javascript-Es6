// Defining variables for future uses
const allBooks = document.getElementById('books');
const searchBook = document.getElementById('search-book');
const searchButton = document.getElementById('search-button');
const loadingElement = document.getElementById('loading');

// Loads books
const loadBooksFunction = keyword => {
    const url = `https://openlibrary.org/search.json?q=${keyword}`;     // Calling API
    fetch(url)
        .then(response => response.json())
        .then(books => displayBooks(books));
}

// Search books
const searchBooksFunction = () => {
    allBooks.innerHTML = '';                    // Empty the dom first
    loadingElement.style.opacity = '1';
    loadingElement.innerText = `Loading..`;     // Showing loading text while searching
    const keyword = searchBook.value;
    loadBooksFunction(keyword);
    searchBook.value = '';                      // Empty the input field
}

// Get cover image
const getCoverImage = coverImage => {
    const coverImageUrl = `https://covers.openlibrary.org/b/id/${coverImage}-L.jpg`;
    const coverImageSource = coverImage !== undefined ? coverImageUrl : 'https://via.placeholder.com/300x385.png?text=Image+not+available!';
    return coverImageSource;
}

// Display books
const displayBooks = books => {
    if (books.numFound === 0) {
        loadingElement.innerText = `Sorry! No books found!`;
        return;
    }
    loadingElement.innerText = `${books.numFound} books found!`;      // Showing the result
    const showTwelveBooks = books.docs.slice(0, 12);                  // Only show first 12 books
    showTwelveBooks.forEach(book => {
        const bookPublisher = book.publisher !== undefined ? book.publisher : 'N/A';
        const bookFirstPublishYear = book.first_publish_year !== undefined ? book.first_publish_year : 'N/A';
        const bookElement = document.createElement('div');
        bookElement.classList.add('col-sm-3');
        bookElement.innerHTML = `
        <div class="card mb-4">
            <img src="${getCoverImage(book.cover_i)}" class="card-img-top" alt="${book.title}">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text"><b>Author Name:</b> ${book.author_name}</p>
                <p class="card-text"><b>Publisher:</b> ${bookPublisher}</p>
                <p class="card-text"><b>First Published:</b> ${bookFirstPublishYear}</p>
            </div>
        </div>
        `;
        allBooks.appendChild(bookElement);                          // Append all items to dom
    });
}