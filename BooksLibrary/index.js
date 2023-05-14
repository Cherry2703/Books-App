let bookItemsContainer = document.getElementById("bookItemsContainer");
let addbookButton = document.getElementById("addBookButton");

function getbookListFromLocalStorage() {
    let stringifiedbookList = localStorage.getItem("bookList");
    let parsedbookList = JSON.parse(stringifiedbookList);
    console.log(parsedbookList);
    if (parsedbookList === null) {
        return [];
    } else {
        return parsedbookList;
    }
}

let bookList = getbookListFromLocalStorage();
let booksCount = bookList.length;

function savebutton() {
    localStorage.setItem("bookList", JSON.stringify(bookList));
}


function onAddbook() {
    let bookInputElement = document.getElementById("BookNameInput");
    let authorName = document.getElementById("authorName")
    let bookInputValue = bookInputElement.value;
    let authorValue = "by  " + authorName.value

    if (bookInputValue === "") {
        alert("Enter Book Name");
        return;
    }
    if (authorValue === "") {
        alert("Enter Author Name");
        return;
    }

    booksCount = booksCount + 1;

    let newbook = {
        text: bookInputValue,
        author: authorValue,
        uniqueNo: booksCount,
    };
    bookList.push(newbook);
    createAndAppendBook(newbook);
    bookInputElement.value = "";
    authorName.value = ""
}

addbookButton.onclick = function() {
    onAddbook();
};



function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let bookObjectIndex = bookList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let bookObject = bookList[bookObjectIndex];

    if (bookObject.isChecked === true) {
        bookObject.isChecked = false;
    } else {
        bookObject.isChecked = true;
    }

}

function onDeletebook(bookId) {
    let bookElement = document.getElementById(bookId);
    bookItemsContainer.removeChild(bookElement);

    let deleteElementIndex = bookList.findIndex(function(eachbook) {
        let eachbookId = "book" + eachbook.uniqueNo;
        if (eachbookId === bookId) {
            return true;
        } else {
            return false;
        }
    });

    bookList.splice(deleteElementIndex, 1);
}

function createAndAppendBook(book) {
    let bookId = "book" + book.uniqueNo;
    let checkboxId = "checkbox" + book.uniqueNo;
    let labelId = "label" + book.uniqueNo;

    let bookElement = document.createElement("li");
    bookElement.classList.add("book-item-container", "d-flex", "flex-row");
    bookElement.id = bookId;
    bookItemsContainer.appendChild(bookElement);



    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    bookElement.appendChild(labelContainer);

    let labelElement = document.createElement("p");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = book.text;

    labelContainer.appendChild(labelElement);

    let labelElementauthor = document.createElement("p");
    labelElementauthor.setAttribute("for", checkboxId);
    labelElementauthor.id = labelId;
    labelElementauthor.classList.add("checkbox-label");
    labelElementauthor.textContent = book.author;
    labelContainer.appendChild(labelElementauthor);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeletebook(bookId);
    };

    deleteIconContainer.appendChild(deleteIcon);
}

for (let book of bookList) {
    createAndAppendBook(book);
}