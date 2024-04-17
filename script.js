const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(book) {
	myLibrary.push(book);
}

function displayBooks() {
	const libraryDiv = document.getElementById('library');
	libraryDiv.innerHTML = '';

	myLibrary.forEach((book, index) => {
		const bookDiv = document.createElement('div');
		bookDiv.classList.add('book');

		const removeBtn = document.createElement('button');
		removeBtn.textContent = 'Remove';
		removeBtn.addEventListener('click', () => removeBook(index));

		const readBtn = document.createElement('button');
		readBtn.textContent = book.read ? 'Mark Unread' : 'Mark Read';
		readBtn.addEventListener('click', () => toggleReadStatus(index));

		// bookDiv.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'Read' : 'Unread'}`;
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

function removeBook(index) {
	myLibrary.splice(index, 1);
	displayBooks();
}

function toggleReadStatus(index) {
	myLibrary[index].read = !myLibrary[index].read;
	displayBooks();
}

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
	addBookToLibrary(newBook);
	displayBooks();

	newBookForm.style.display = 'none';
	bookForm.reset();
});

// Manually adding some books to the library
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
addBookToLibrary(new Book('To Kill a Mockingbird', 'Harper Lee', 281, false));
addBookToLibrary(new Book('1984', 'George Orwell', 328, true));

displayBooks();
