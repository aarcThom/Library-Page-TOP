/* Making a constructor for a book object. The object should have the book's title, author, number of pages, 
and whether or not the book has been read */

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    const readStatus = () => this.read ? 'this book has been read' : 'this book aint been read';

    this.info = function Info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus()}`;
    }
}


const daHobbit = new Book('The Hobbit', 'Some Guy', '999', false);

console.log(daHobbit.info());

daHobbit.read = true;

console.log(daHobbit.info());