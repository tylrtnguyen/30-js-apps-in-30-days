// Book Constructor
function Book(title, author, isbn, status) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.status = status;
}

// UIManager Constructor
function UIManager() {

    UIManager.prototype.addBookToList = function(book){
        const list = document.querySelector('#book-list');
        // Create tr element
        const row = document.createElement('tr')
        // Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.status}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        // Append to list
        list.appendChild(row)
    }

    // Restart the form
    UIManager.prototype.refresh = function() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#ISBN').value = '';
        document.querySelector('#status').value = 'New'
    }

    // Show Alert
    UIManager.prototype.showAlert = function(message, className) { 
        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = `alert alert-dismissible alert-${className}`;
        // Create text node
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        // Clear alert after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000)
    }

    UIManager.prototype.deleteBook = function(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }
}

// Working with localStorage
function Store() {
    // Get All Books
    Store.prototype.getBooks = function() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books
    }

    // Add Book to localStorage
    Store.prototype.addBook = function (book) {
        const books = this.getBooks();
        books.push(book)
        // Set new books array to localStorage
        this.setNewBooks(books)
    }

    Store.prototype.setNewBooks = function(books) {
        localStorage.setItem('books', JSON.stringify(books))
    }

    // Delete Book
    Store.prototype.deleteBook = function(isbn) {
        const books = this.getBooks();
        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        // Set new books array to localStorage
        this.setNewBooks(books)
    }

    Store.prototype.displayBooks = function() {
        const books = this.getBooks();
        const uiManager = new UIManager();
        books.forEach((book) => {
            uiManager.addBookToList(book);
        })
    }

}

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    const store = new Store();
    store.displayBooks();
})

// Event Listener for add book
document.querySelector('#book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get element value
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#ISBN').value,
          statusElement = document.querySelector('#status');
    const status = statusElement.options[statusElement.selectedIndex].value;
        
    // Instantiate new book object
    const book = new Book(title, author, isbn, status);

    // Instantiate UIMangager object
    const uiManager = new UIManager();

    // Instantiate Store object
    const store = new Store();

    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        uiManager.showAlert('Please fill in all fields', 'danger')
    }
    else {
        // Add book to list
        uiManager.addBookToList(book);

        store.addBook(book)

        uiManager.showAlert('Congrats! A new book is added to your list', 'success');

        // Refresh the form
        uiManager.refresh();
    } 
})

// Event Listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
    e.preventDefault();

    const uiManager = new UIManager();
    const store = new Store();
    uiManager.deleteBook(e.target);

    store.deleteBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    // Show Delete Alert
    uiManager.showAlert('Book Deleted Successfully', 'success')
})
