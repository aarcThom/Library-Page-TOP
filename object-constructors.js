/* Making a constructor for a book object. The object should have the book's title, author, number of pages, 
and whether or not the book has been read */

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;  
    }

// toggling the read property
Book.prototype.isRead = function() {
    this.read = !this.read
}

// Adds the book to the screen library
Book.prototype.ScreenInfo = function() {
    const newSBook = document.createElement('div');
    newSBook.className = 'book';

    const bookTitle = document.createElement('div');
    bookTitle.className = 'book_title';
    bookTitle.textContent = this.title;

    const bookAuthor = document.createElement('div');
    bookAuthor.className = 'book_author';
    bookAuthor.textContent = `Author: ${this.author}`;

    const bookPages = document.createElement('div');
    bookPages.className = 'book_pages';
    bookPages.textContent = `${this.pages} pages`;

    newSBook.appendChild(bookTitle);
    newSBook.appendChild(bookAuthor);
    newSBook.appendChild(bookPages);

    return newSBook;
}

// the main library grid contrainer
const screenLibrary = document.getElementById('library_panel');

const myLibrary = [
    new Book('The Hobbit', 'J.R. Tolkien', 100, false),
    new Book('A Dog Book', "Ruff Mcbark", 77, true),
    new Book('The Big Book of Kavorka', "Anne M.L. Lure", 99, false)
];

function ReadBookForm(form) {

    const entriesArray = [];
    const formData = new FormData(form).entries();
    // eslint-disable-next-line prefer-const, no-restricted-syntax
    for (const pair of formData) {
        entriesArray.push(pair[1]);
    };

    // if the check box is checked there will be 4 entries returned, else 3 entries returned
    if (entriesArray.length === 4) {
        entriesArray[3] = true;
    } else {
        entriesArray.push(false);
    };
    return entriesArray;
}

// determining if a book object is the same as a new book added
function AreBooksEqual(book1, book2) {
    return book1.title === book2.title && book1.author === book2.author;
}

function AddBookToLibrary(bTitle, bAuthor, bPages,bRead) {

    let duplicate = false;

    const newBook = new Book(bTitle, bAuthor, bPages, bRead);

    // checking if the book is already in the library array
    myLibrary.forEach((bk) => {
        if (AreBooksEqual(newBook, bk)) {
            alert('THIS BOOK IS ALREADY ADDED!');
            duplicate = true;
        } 
    });

    if (!duplicate) {
        myLibrary.push(newBook);
        screenLibrary.appendChild(newBook.ScreenInfo());
    }

}

// STARTUP ADDING ALL BOOKS TO SHELF
window.onload = () => {
    myLibrary.forEach((bk) => {
        screenLibrary.appendChild(bk.ScreenInfo());
    });
}


// the form with submit button
const bookForm = document.getElementById("book_form");
bookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // preventing the default submit behaviour
    const newBook = ReadBookForm(event.target);
    AddBookToLibrary(newBook[0],newBook[1], newBook[2], newBook[3]);
    bookForm.reset();
});