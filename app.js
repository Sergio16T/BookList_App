let myLibrary =[]; 
let allBooks =[]; 

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
    let table = document.createElement('table'); 
    let headRow = document.createElement('tr');  
    let keys = Object.keys(bookList[0]); 
    keys.forEach(key => {
        let headCells = document.createElement("th"); 
        headCells.textContent = key; 
        headRow.appendChild(headCells);
        headCells.className = 'row'; 
    });
    table.appendChild(headRow); 

    // above creates the table header row with property names 
    //below creates rows with table cells filled with each objects['index'] a.k.a property accessor 
    /* Properties of JavaScript objects can also be accessed or set using a 
    bracket notation this is  why  objects are sometimes called associative arrays*/ 
    
    bookList.forEach(object => {
        let row = document.createElement('tr');
        keys.forEach(key => {
            let cell = document.createElement('td'); 
            cell.textContent = object[key]; 
            if (typeof object[key] == "number") {
                cell.style.textAlign = "right"; 
            }
            else {
                cell.style.textAlign= 'center'; 
            }
            cell.className = 'table-content'; 
            row.appendChild(cell);          
        })

        table.appendChild(row); 
        
    })

    return table; 

}

document.querySelector('.table').appendChild(buildTable(myLibrary)); 

const formContainer = document.querySelector('.form-container'); 
let inputBookTitle = document.getElementById('title');
let inputBookAuthor = document.getElementById('author'); 
let inputBookPages = document.getElementById('pages'); 
const inputBookRead = document.querySelector('select');
let tableBuilt= document.querySelector('table'); 

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
    addRow(); 
    showForm();
    clearFields();
    
}

/* Original problem: below function only worked for the first addition. needed to make it 
work for every addition and check to see if it's inside library, 
add for loop! WORKS!! 
*/
function addRow() { 
    for(let i = 0; i < myLibrary.length; i++) {
        myLibrary = myLibrary.filter(x => x !== myLibrary[i]);  
        myLibrary.forEach(object => {
            let row = document.createElement('tr');
            Object.keys(myLibrary[0]).forEach(key => {
                let cell = document.createElement('td'); 
                cell.textContent = object[key]; 
                if (typeof object[key] == "number") {
                    cell.style.textAlign = "right"; 
                }
                else {
                    cell.style.textAlign= 'center'; 
                }
                cell.className = 'table-content'; 
                row.appendChild(cell);      
            })
            tableBuilt.appendChild(row); 
        
        })
    }
} 

function clearFields() {
    inputBookTitle.value =""; 
    inputBookAuthor.value="";
    inputBookPages.value= ""; 
}
