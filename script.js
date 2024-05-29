class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
}

class Library {
	constructor() {
		this.myLibrary = [];
	}

	addBookToLibrary(book) {
		this.myLibrary.push(book);
		this.displayBooks();
	}

	removeBook(index) {
		this.myLibrary.splice(index, 1);
		this.displayBooks();
	}

	toggleReadStatus(index) {
		this.myLibrary[index].read = !this.myLibrary[index].read;
		this.displayBooks();
	}

	displayBooks() {
		const libraryDiv = document.getElementById('library');
		libraryDiv.innerHTML = '';

		this.myLibrary.forEach((book, index) => {
			const bookDiv = document.createElement('div');
			bookDiv.classList.add('book');

			const removeBtn = document.createElement('button');
			removeBtn.textContent = 'Remove';
			removeBtn.addEventListener('click', () => this.removeBook(index));

			const readBtn = document.createElement('button');
			readBtn.textContent = book.read ? 'Mark Unread' : 'Mark Read';
			readBtn.addEventListener('click', () => this.toggleReadStatus(index));

			bookDiv.innerHTML = `
				<h3>${book.title}</h3>
				<p>by ${book.author}</p>
				<p>${book.pages} pages</p>
				<p>Status: <span style="color: ${book.read ? '#28a745' : '#dc3545'};">${book.read ? 'Read' : 'Unread'}</span></p>
			`;
			bookDiv.appendChild(removeBtn);
			bookDiv.appendChild(readBtn);
			libraryDiv.appendChild(bookDiv);
		});
	}
}

const library = new Library();

const newBookBtn = document.getElementById('newBookBtn');
const newBookForm = document.getElementById('newBookForm');

newBookBtn.addEventListener('click', () => {
	newBookForm.style.display = 'block';
});

const bookForm = document.getElementById('bookForm');

bookForm.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = parseInt(document.getElementById('pages').value);
	const read = document.getElementById('read').checked;

	const newBook = new Book(title, author, pages, read);
	library.addBookToLibrary(newBook);

	newBookForm.style.display = 'none';
	bookForm.reset();
});

// Manually adding some books to the library
library.addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
library.addBookToLibrary(new Book('To Kill a Mockingbird', 'Harper Lee', 281, false));
library.addBookToLibrary(new Book('1984', 'George Orwell', 328, true));
