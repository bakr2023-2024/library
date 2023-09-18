function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () =>
    `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`;
}
const library = [];
const addBookToLibrary = (book) => library.push(book);
const confirmBtn = document.querySelector("#confirmBtn");
const addBookDialog = document.querySelector("#addBookDialog");
const addBookButton = document.querySelector("#addBookBtn");
const clearLibraryBtn = document.querySelector("#clearBtn");
const bookList = document.querySelector("#bookList");
addBookButton.addEventListener("click", () => addBookDialog.showModal());
clearLibraryBtn.addEventListener("click", () => {
  library.splice(0, library.length);
  bookList.innerHTML = "";
});
addBookDialog.addEventListener("close", (e) => {
  if (addBookDialog.returnValue === "cancel") {
    return;
  }
  let bookTitle = document.querySelector("#title").value || "No Title";
  let bookAuthor = document.querySelector("#author").value || "No Author";
  let bookPages = document.querySelector("#pages").value || "No Pages";
  let bookRead = document.querySelector("#read").checked;
  let book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(book);
  addBookToDOM();
});
const createBookCard = (book) => {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("class", "bookCard");
  bookCard.setAttribute("data-index", library.length - 1);
  const bookTitle = document.createElement("h2");
  bookTitle.textContent = book.title;
  const bookAuthor = document.createElement("h3");
  bookAuthor.textContent = book.author;
  const bookPages = document.createElement("h3");
  bookPages.textContent = book.pages;
  const bookRead = document.createElement("h3");
  bookRead.textContent = book.read ? "Read" : "Not Read";
  const removeBookBtn = document.createElement("button");
  removeBookBtn.setAttribute("class", "removeBookBtn");
  removeBookBtn.textContent = "Remove Book";
  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.textContent = "Toggle Read";
  toggleReadBtn.setAttribute("class", "toggleReadBtn");
  removeBookBtn.addEventListener("click", (e) => {
    const bookCard = e.target.parentNode;
    const bookIndex = bookCard.getAttribute("data-index");
    library.splice(bookIndex, 1);
    bookCard.remove();
  });
  toggleReadBtn.addEventListener("click", (e) => {
    const bookCard = e.target.parentNode;
    const bookIndex = bookCard.getAttribute("data-index");
    library[bookIndex].read = !library[bookIndex].read;
    bookCard.querySelector("h3:nth-of-type(3)").textContent = library[bookIndex]
      .read
      ? "Read"
      : "Not Read";
  });
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookRead);
  bookCard.appendChild(removeBookBtn);
  bookCard.appendChild(toggleReadBtn);
  return bookCard;
};
addBookToDOM = () => {
  const book = library[library.length - 1];
  const bookCard = createBookCard(book);
  bookList.appendChild(bookCard);
};
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookDialog.close(confirmBtn.value);
});
