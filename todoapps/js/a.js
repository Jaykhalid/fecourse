let arrayOfBookObj = [];

document.addEventListener('DOMContentLoaded', function () { 
    function addBookNotRead(e) {
        let inputTitlesEl  = document.querySelector("#inputBookTitle");
        let inputAuthorsEl = document.querySelector("#inputBookAuthor");
        let inputYearsEl   = document.querySelector("#inputBookYear");
        let checkBoxIsRead = document.querySelector("#inputBookIsComplete");
        
        let bookObj =   {
                            id:         arrayOfBookObj.length + 1,
                            year:       inputYearsEl.value,
                            title:      inputTitlesEl.value,
                            author:     inputAuthorsEl.value,
                            isCompleted: checkBoxIsRead.checked
                        };
        arrayOfBookObj.push(bookObj);
        
        document.dispatchEvent(new Event("bookChanged"));
        e.preventDefault();
    }
    
    function findYourBook(e) {
        let searchInputEl  = document.getElementById("searchBookTitle");
            getTitle       = searchInputEl.value;
            if (getTitle) {
                bookObj(arrayOfBookObj.filter((   
                    function(arrayOfBookObj) {
                        return arrayOfBookObj.title.toUpperCase().includes(getTitle.toUpperCase())
                    }
                )))
            }
            else {
              bookObj(arrayOfBookObj)
            }
        
        e.preventDefault();
    }
            
    function completedBooks(book) {
        let bookTarget   = Number(book.target.id);
        let sortingBooks = arrayOfBookObj.findIndex((
            function(arrayOfBookObj) {
                return bookTarget === arrayOfBookObj.id;
            }
        ));   

        if (sortingBooks !== false) {
            arrayOfBookObj[sortingBooks] = {
                ...arrayOfBookObj[sortingBooks],
                isCompleted: true,
            },
            document.dispatchEvent(new Event("bookChanged"))
        }
    }
    
    function undoTheBooks(book) {
        let bookTarget   = Number(book.target.id),
            sortingBooks = arrayOfBookObj.findIndex((
                function(arrayOfBookObj) {
                    return bookTarget === arrayOfBookObj.id
                }
            ));
        
        if (sortingBooks !== false) {  
            arrayOfBookObj[sortingBooks] = {
                ...arrayOfBookObj[sortingBooks],
                isCompleted: !true,
            },
            document.dispatchEvent(new Event("bookChanged"));
        }
    }
    
    function removeBooks(book) {
        let bookTarget   = Number(book.target.id),
            sortingBooks = arrayOfBookObj.findIndex((
              function(arrayOfBookObj) {
                  return bookTarget === arrayOfBookObj.id
              }
            ));
            
        if (sortingBooks !== false) {
            arrayOfBookObj.splice(sortingBooks, 1),
            document.dispatchEvent(new Event("bookChanged"))
        }
    }
    
    function bookObj(arrayOfBookObj){
        let addBookNotReadEl           = document.querySelector("#incompleteBookshelfList"),
            addReadedBookEl            = document.querySelector("#completeBookshelfList");
            addBookNotReadEl.innerHTML = "",
            addReadedBookEl.innerHTML  = "";
            
        for (let book of arrayOfBookObj) {
            let eachBookObjEl = document.createElement("article");
            eachBookObjEl.classList.add("book-card");
            
            let bookTitle       = document.createElement("h2");
            bookTitle.innerText = book.title;
            
            let bookAuthor       = document.createElement("p");
            bookAuthor.innerText = `Ditulis Oleh : ${book.author}`;
            
            let bookYear = document.createElement("p");
            
            if (bookYear.innerText = `Pada Tahun : ${book.year}`, eachBookObjEl.appendChild(bookTitle), eachBookObjEl.appendChild(bookAuthor), eachBookObjEl.appendChild(bookYear), book.isCompleted) { 
                let parentElBtnInReadedList = document.createElement("div");
                parentElBtnInReadedList.classList.add("action");
                
                let undoBtn       = document.createElement("button");
                undoBtn.id        = book.id,
                undoBtn.innerText = "Belum Selesai dibaca";

                undoBtn.style.backgroundColor = '#1CFFA8';
                undoBtn.addEventListener("click", undoTheBooks);
                
                let removeBtn       = document.createElement("button");
                removeBtn.id        = book.id,
                removeBtn.innerText = "Hapus Buku";

                removeBtn.style.backgroundColor = '#FF2442';
                removeBtn.addEventListener("click", removeBooks);
                
                parentElBtnInReadedList.appendChild(undoBtn),
                parentElBtnInReadedList.appendChild(removeBtn),

                eachBookObjEl.appendChild(parentElBtnInReadedList),
                addReadedBookEl.appendChild(eachBookObjEl);
            }
            else 
            {
                const parentElBtn = document.createElement("div");
                parentElBtn.classList.add("action");
                
                const completedBtn     = document.createElement("button");
                completedBtn.id        = book.id,
                completedBtn.innerText = "Selesai Dibaca";

                completedBtn.style.backgroundColor = 'cyan',
                completedBtn.addEventListener("click", completedBooks);
                
                const removeBtn     = document.createElement("button");
                removeBtn.id        = book.id,
                removeBtn.innerText = "Hapus buku";

                removeBtn.style.backgroundColor = 'darkorange',
                removeBtn.addEventListener("click", removeBooks);

                parentElBtn.appendChild(completedBtn),
                parentElBtn.appendChild(removeBtn),
                eachBookObjEl.appendChild(parentElBtn),
                addBookNotReadEl.appendChild(eachBookObjEl)
            }
        }
    }
        
    function temporarySaved() {
        !function(arrayOfBookObj) {
            localStorage. setItem("books", JSON.stringify(arrayOfBookObj))
        } (arrayOfBookObj); 
        
        bookObj(arrayOfBookObj); 
    }

    window.addEventListener("load", (() => {
        arrayOfBookObj = JSON.parse(localStorage.getItem("books")) || [],
            bookObj(arrayOfBookObj);

        let o = document.querySelector("#inputBook"),
            d = document.querySelector("#searchBook");
            o.addEventListener("submit", addBookNotRead),
            d.addEventListener("submit", findYourBook),

            document.addEventListener("bookChanged", temporarySaved);
    }));
});