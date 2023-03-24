/* Making a constructor for a book object. The object should have the book's title, author, number of pages, 
and whether or not the book has been read */

let myLibrary = [];


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

function AddBookToLibrary(bTitle, bAuthor, bPages,bRead) {
    myLibrary.push(Book(bTitle, bAuthor, bPages, bRead))
}

const daHobbit = new Book('hobbit', 'jr tokin', '69', false); 
