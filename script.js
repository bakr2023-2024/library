const myLibrary = [];
const displayDiv = document.querySelector("#container");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesNumInput = document.querySelector("#pagesNum");
const isReadInput = document.querySelector("#isRead");
const dialog = document.getElementById("bookDialog");
const submitBook = (e) => {
  e.preventDefault();
  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesNumInput.value,
    isReadInput.checked
  );
  dialog.close();
  titleInput.value = "";
  authorInput.value = "";
  pagesNumInput.value = "";
  isReadInput.checked = false;
};
function Book(title, author, pagesNum, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pagesNum = pagesNum;
  this.read = read;
}

const addBookToLibrary = (title, author, pagesNum, read) => {
  const book = new Book(title, author, pagesNum, read);
  myLibrary.push(book);
  book.displayBook();
};
function displayBook() {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  bookDiv.setAttribute("data-id", this.id);
  bookDiv.innerHTML = `
    <h2>${this.title}</h2>
    <p><em>${this.author}</em></p>
    <p>${this.pagesNum} pages</p>
    <button type="button" class="toggleRead">${
      this.read ? "Read" : "Not Read"
    }</button>
    <button type="button" class="removeBtn">Remove</button>
  `;
  displayDiv.appendChild(bookDiv);
  bookDiv.querySelector(".toggleRead").addEventListener("click", () => {
    this.toggleRead();
  });
  bookDiv.querySelector(".removeBtn").addEventListener("click", () => {
    this.removeBook();
  });
  if (this.read) bookDiv.classList.add("read");
}

function toggleRead() {
  this.read = !this.read;
  const bookDiv = document.querySelector(`.book[data-id="${this.id}"]`);
  bookDiv.classList.toggle("read");
  bookDiv.querySelector(".toggleRead").textContent = this.read
    ? "Read"
    : "Not Read";
}
function removeBook() {
  myLibrary.splice(myLibrary.indexOf(this), 1);
  document.querySelector(`.book[data-id="${this.id}"]`).remove();
}
Book.prototype.displayBook = displayBook;
Book.prototype.toggleRead = toggleRead;
Book.prototype.removeBook = removeBook;
document.getElementById("submitBook").addEventListener("click", submitBook);
document
  .getElementById("addBookBtn")
  .addEventListener("click", () => dialog.showModal());
