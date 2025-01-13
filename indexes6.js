console.log("This is ES6 index.js");

// ES6 Class for Book
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// ES6 Class for Display
class Display {
    add(book) {
        console.log("Adding to UI");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr id="book-${book.name}">
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                            <td><button class="btn btn-danger" onclick="deleteBook('${book.name}')">Delete</button></td>
                        </tr>`;
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        return true;
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>Message:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = '';
        }, 2000);
    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {
        // Add book to the UI
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added');

        // Store book in localStorage
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    } else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}

// Function to delete a book
function deleteBook(bookName) {
    // Remove book from the UI
    let bookRow = document.getElementById(`book-${bookName}`);
    bookRow.remove();

    // Remove book from localStorage
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.name !== bookName);
    localStorage.setItem('books', JSON.stringify(books));
}

// Load books on page load (from localStorage)
document.addEventListener('DOMContentLoaded', () => {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let display = new Display();
    books.forEach(book => {
        display.add(book);
    });
});
