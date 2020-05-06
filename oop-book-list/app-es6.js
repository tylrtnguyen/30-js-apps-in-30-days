// Book Class
class Book {
    constructor(title, author, isbn, status) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.status = status;
    }
}

// UIManager Class
class UIManager {
    // Add Book To List
    addBookToList(book) {
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

    // Delete Book
    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    // Refresh Form
    refreshForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#ISBN').value = '';
        document.querySelector('#status').value = 'New'
    }

    showAlert(message, className) {
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
}

// LocalStorage Class
class Store {
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        this.setBooks(books)
    }

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static setBooks(books) {
        localStorage.setItem('books', JSON.stringify(books))
    }

    static displayBooks() {
        const books = Store.getBooks();
        const uiManager = new UIManager();
        books.forEach((book) => {
            uiManager.addBookToList(book);
        })
    }

    static deleteBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        }) ;
        this.setBooks(books)
    }

    
}

// DOM Load event
document.addEventListener('DOMContentLoaded', function() {
    Store.displayBooks();
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

    if(title === '' || author === '' || isbn === ''){
        // Error Alert
        uiManager.showAlert('Please fill in all fields', 'danger')
    }
    else {
        // Add book to UI
        uiManager.addBookToList(book)
        // Add book to localStorage
        Store.addBook(book);

        uiManager.showAlert('Congrats! A new book is added to your list', 'success');

        // Refresh the form
        uiManager.refresh();
    } 
})

// Event Listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
    e.preventDefault();

    const uiManager = new UIManager();
    uiManager.deleteBook(e.target);

    // Remove from LS
    // Get the ISBN of book
    Store.deleteBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)

    // Show Delete Alert
    uiManager.showAlert('Book Deleted Successfully', 'success')
})