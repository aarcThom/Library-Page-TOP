// grabbing global variables
const docRoot = document.querySelector(':root');

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

let myLibrary = [
    new Book('The Hobbit', 'J.R. Tolkien', 100, false),
    new Book('A Dog Book', "Ruff Mcbark", 77, true),
    new Book('The Big Book of Kavorka', "Anne M.L. Lure", 99, false)
];

function AddBookToLibrary(bTitle, bAuthor, bPages,bRead) {
    let newBook = new Book(bTitle, bAuthor, bPages, bRead);
    myLibrary.push(newBook);
    screenLibrary.appendChild(newBook.ScreenInfo());
}

// the add book button
const newBookButton = document.querySelector('#add_button');
newBookButton.addEventListener("click", function(){AddBookToLibrary('yo','yo',69,false);});
newBookButton.onclick = () => console.log(myLibrary);




