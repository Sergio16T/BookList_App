let myLibrary =[]; 
let allBooks =[]; 
let titles = ['Title', 'Author', 'Pages', 'Read', 'Delete']; 

class Book {
    constructor(title, author, pages, read) {
    this.title = title; 
    this.author = author; 
    this.pages = Number(pages); 
    this.read = read;  
    
    }
    info() {
        let info=`${this.title} by ${this.author}, ${this.pages}, ${this.read}`; 
         console.log(info); 
    };
}
var bookHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read'); 
addBookToLibrary(bookHobbit); 



function addBookToLibrary(input) {
    myLibrary.push(input); 
    allBooks.push(input); 
}
function buildTable(bookList) {
    clearTable(); 
    let table = document.querySelector('table'); 
    let headRow = document.createElement('tr');
        for(title of titles){
        let headCells = document.createElement("th"); 
        headCells.textContent = title; 
        headRow.appendChild(headCells);
        headCells.className = 'row'; 
    }
    table.appendChild(headRow); 

    bookList.forEach(function addBookToTable(book, index) { 
        let row = document.createElement('tr');
        row.setAttribute("data-index", index);
        //console.log(row);
        Object.keys(book).forEach(key => {
            let cell = document.createElement('td'); 
            cell.textContent = book[key];
            if (key == 'read') {
                cell.innerHTML = `<button class = "toggle-read" onclick = "toggleRead(this)">${book[key]}</button>`;
            }
            if (typeof book[key] == "number") {
                cell.style.textAlign = "right"; 
            }
            else {
                cell.style.textAlign= 'center'; 
            }
            cell.className = 'table-content'; 
            row.appendChild(cell);
             
        })
        let deleteItem = document.createElement("td"); 
        deleteItem.style.textAlign = "center";
        deleteItem.innerHTML = `<button class="remove-Book" onclick="deleteBook(this)">x</button>`;
        deleteItem.className ='table-content';
        row.appendChild(deleteItem); 
        
        tableBuilt.appendChild(row);
        
    })
    return table;
}


const formContainer = document.querySelector('.form-container'); 
let inputBookTitle = document.getElementById('title');
let inputBookAuthor = document.getElementById('author'); 
let inputBookPages = document.getElementById('pages'); 
const inputBookRead = document.querySelector('select');
let tableBuilt= document.createElement('table'); 

document.querySelector('.table').appendChild(tableBuilt);


function showForm(){
    formContainer.classList.toggle('form-toggle');
}

function newBook() {
    let item = new Book(
        inputBookTitle.value, 
        inputBookAuthor.value, 
        inputBookPages.value,
        inputBookRead.value
    );
    

    addBookToLibrary(item); 
    console.log(item);  
    buildTable(myLibrary);
    showForm();
    clearFields(); 
     
}

function clearTable() {
    while (tableBuilt.firstChild) {
        tableBuilt.removeChild(tableBuilt.firstChild); 
    }
} 
function clearFields() {
    inputBookTitle.value =""; 
    inputBookAuthor.value="";
    inputBookPages.value= ""; 
}

function deleteBook(book) {
    myLibrary.splice(book.parentNode.parentNode.dataset.index, 1);
    buildTable(myLibrary);  
    
} 
function toggleRead(button) {
    if(button.innerHTML == "read"){
        //button.innerHTML =="not read";
        myLibrary[button.parentNode.parentNode.dataset.index].read ="not read"; 
    } else {
        //button.innerHTML =="read";
        myLibrary[button.parentNode.parentNode.dataset.index].read ="read"; 

    }
    buildTable(myLibrary); 
}
buildTable(myLibrary); 
