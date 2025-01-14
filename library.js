console.log("This is index.js");

// Constructor for Book
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display Constructor
function Display() {}

// Add methods to display prototype
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr id="book-${book.name}">
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td><button class="btn btn-danger" onclick="deleteBook('${book.name}')">Delete</button></td>
                    </tr>`;
    tableBody.innerHTML += uiString;
};

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
};

// Implement the validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
};

// Implement show function
Display.prototype.show = function (type, displayMessage) {
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
};

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
        let books = JSON.parse(localStorage.getItem('books')) || []; // Get existing books or an empty array
        books.push(book);  // Add new book to array
        localStorage.setItem('books', JSON.stringify(books));  // Store updated array in localStorage
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
    books = books.filter(book => book.name !== bookName);  // Filter out the deleted book
    localStorage.setItem('books', JSON.stringify(books));  // Update localStorage
}

// Load books on page load (from localStorage)
document.addEventListener('DOMContentLoaded', () => {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    let display = new Display();
    books.forEach(book => {
        display.add(book);  // Add each book from localStorage to the UI
    });
});

// Search functionality for books using the search bar
document.getElementById('searchBtn').addEventListener('click', function () {
    let filter = document.getElementById('searchTxt').value.toLowerCase();
    let rows = document.getElementById('tableBody').getElementsByTagName('tr');
    Array.from(rows).forEach(row => {
        let bookName = row.cells[0].textContent.toLowerCase();
        let author = row.cells[1].textContent.toLowerCase();
        let type = row.cells[2].textContent.toLowerCase();
        if (bookName.indexOf(filter) !== -1 || author.indexOf(filter) !== -1 || type.indexOf(filter) !== -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});
