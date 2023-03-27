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


    // creating a random color for the title background because why not
    // eslint-disable-next-line prefer-template
    const randoColour = '#' + Math.floor(Math.random()*16777215).toString(16);

    const bookTitle = document.createElement('div');
    bookTitle.className = 'book_title';
    bookTitle.style.backgroundColor = randoColour;

    const bookTitleText = document.createElement('div');
    bookTitleText.className = 'bk_title_txt';
    bookTitleText.textContent = this.title;

    bookTitle.appendChild(bookTitleText);

    const bookAuthor = document.createElement('div');
    bookAuthor.className = 'book_author';
    bookAuthor.textContent = `Author: ${this.author}`;

    const bookPages = document.createElement('div');
    bookPages.className = 'book_pages';
    bookPages.textContent = `${this.pages} pages`;

    const readStatus = document.createElement('div');
    if (this.read) {
        readStatus.className = 'readstat_read';
        readStatus.textContent = 'YOU READ THIS!';
    } else {
        readStatus.className = 'readstat_unread';
        readStatus.textContent = 'YOU HAVE NOT READ THIS!';
    }


    const bookButtonContainer = document.createElement('div');
    bookButtonContainer.className = 'book_btn_cont';

    const removeBookBtn = document.createElement('button');
    removeBookBtn.className = 'remove_book_btn';
    removeBookBtn.textContent = 'REMOVE THIS BOOK!';

    bookButtonContainer.appendChild(removeBookBtn);

    const readStatusContainer = document.createElement('div');
    readStatusContainer.className = 'book_btn_cont';

    const readStatusBtn = document.createElement('button');
    if (this.read) {
        readStatusBtn.className = 'mark_unread_btn';
        readStatusBtn.textContent = 'BE HONEST. MARK IT UNREAD!';
    } else {
        readStatusBtn.className = 'mark_read_btn';
        readStatusBtn.textContent = 'MARK IT READ!';
    }
    readStatusContainer.appendChild(readStatusBtn);


    newSBook.appendChild(bookTitle);
    newSBook.appendChild(bookAuthor);
    newSBook.appendChild(bookPages);
    newSBook.appendChild(readStatus);
    newSBook.appendChild(bookButtonContainer);
    newSBook.appendChild(readStatusContainer);


    // grabbing the parent book element
    const bookParent = removeBookBtn.parentElement.parentElement;

    // grabbing the book title
    const currentTitle = bookParent.firstChild.textContent;

    // grabbing current read status
    const currentStatus = bookParent.querySelector(':nth-child(4)')


    // adding the event listener for the remove button
    removeBookBtn.addEventListener('click', () => {
        // remove from the library list
        // eslint-disable-next-line no-use-before-define
        RemoveBookFromLibrary(currentTitle);
        // remove from the DOM
        bookParent.remove();

    })

    // adding the event listener for the read status button
    readStatusBtn.addEventListener('click', () => {
        // eslint-disable-next-line no-use-before-define
        ChangeReadStatus(currentTitle);
        if (readStatusBtn.className === 'mark_unread_btn') {
            readStatusBtn.className = 'mark_read_btn';
            readStatusBtn.textContent = 'MARK IT READ!';
            currentStatus.textContent = 'YOU HAVE NOT READ THIS!';
        } else {
            readStatusBtn.className = 'mark_unread_btn';
            readStatusBtn.textContent = 'BE HONEST. MARK IT UNREAD!';
            currentStatus.textContent = 'YOU READ THIS!';

        }

    })


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

function RemoveBookFromLibrary(bkTitle) {
    const matchTitle = (book) => book.title === bkTitle; // matching titles
    const bkToRemove = myLibrary.findIndex(matchTitle); // find index of matching title
    myLibrary.splice(bkToRemove, 1); // removing the matched title from the array
}

function ChangeReadStatus(bkTitle) {
    const matchTitle = (book) => book.title === bkTitle; // matching titles
    const bkIndex = myLibrary.findIndex(matchTitle); // find index of matching title
    myLibrary[bkIndex].isRead();
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