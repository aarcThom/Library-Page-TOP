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

// returns the book info
Book.prototype.Info = function() {
    const readStatus = () => this.read ? 'this book has been read' : 'this book aint been read';
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus()}`;
}

// Adds the book to the screen library
Book.prototype.ScreenInfo = function() {
    const newSBook = document.createElement('div');
    newSBook.textContent = this.Info();
    newSBook.className = 'book';
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
    const formData = new FormData(form).entries();
    // eslint-disable-next-line prefer-const, no-restricted-syntax
    for (const pair of formData) {
        console.log(pair[1]);
    }
}

function AddBookToLibrary(bTitle, bAuthor, bPages,bRead) {

    const newBook = new Book(bTitle, bAuthor, bPages, bRead);
    myLibrary.push(newBook);
    screenLibrary.appendChild(newBook.ScreenInfo());
}

// STARTUP ADDING ALL BOOKS TO SHELF
window.onload = () => {
    myLibrary.forEach((bk) => {
        AddBookToLibrary(bk.title, bk.author, bk.pages, bk.read);
    });
}


// the form with submit button
const bookForm = document.getElementById("book_form");
bookForm.addEventListener("submit", (event) => {
    event.preventDefault(); // preventing the default submit behaviour
    ReadBookForm(event.target);
    AddBookToLibrary('yo','yo', 69, false);
});