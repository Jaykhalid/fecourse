let arrayOfBookObj = [];

let searchBtn = document.querySelector('#searchBtn');

searchBtn.addEventListener('mouseover', function () { 
    searchBtn.firstElementChild.setAttribute('fill', '#FFFFFF');
});
searchBtn.addEventListener('mouseout', function () { 
    searchBtn.firstElementChild.setAttribute('fill', '#18cd8d');
});

document.addEventListener('DOMContentLoaded', function () { 
    function addBookNotRead(e) {
        let inputTitlesEl  = document.querySelector("#inputTitle");
        let inputAuthorsEl = document.querySelector("#inputAuthor");
        let inputYearsEl   = document.querySelector("#inputYear");
        let checkBoxIsRead = document.querySelector("#checkBoxIsCompleted");
        
        function autoIncrementId() {
            let id = 0;
            for (let i = 0; i < arrayOfBookObj.length; i++) {
                if (arrayOfBookObj[i].id > id) {
                    id = arrayOfBookObj[i].id;
                }
            }
            return id + 1;
        }

        let bookObj =   {
                            id:         autoIncrementId(),
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
        let searchInputEl  = document.getElementById("inputFindBook");
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
        let addBookNotReadEl           = document.getElementById("newBooks"),
            addReadedBookEl            = document.getElementById("completedBooks");
            addBookNotReadEl.innerHTML = "",
            addReadedBookEl.innerHTML  = "";
            
        for (let book of arrayOfBookObj) {
            let bookshelfCardEl = document.createElement("div");
            bookshelfCardEl.setAttribute('class', "row-article mx-md-auto my-md-2 item shadow");
            let eachBookObjEl = document.createElement('article');
            eachBookObjEl.classList.add('col-sm-12', 'col-lg-10');
            
            let bookTitle       = document.createElement("h3");
            bookTitle.classList.add('col-sm-12');
            bookTitle.innerHTML = '<span style="color: #18cd8d; font-size: 24px; padding-right: 5px;">#' + book.id + '</span>  ' + book.title;

            let breakLine       = document.createElement("hr");
            breakLine.setAttribute('color', "#1CFFA8");
            
            let bookAuthor       = document.createElement("p");
            bookAuthor.classList.add('col-sm-12', 'font-weight-normal', 'text-uppercase');
            bookAuthor.innerText = `${book.author}`;
            
            let bookYear = document.createElement("p");
            bookYear.classList.add('col-sm-12', 'font-weight-bolder');

            if (bookYear.innerText = `${book.year}`, eachBookObjEl.appendChild(bookTitle), eachBookObjEl.appendChild(breakLine), eachBookObjEl.appendChild(bookAuthor), eachBookObjEl.appendChild(bookYear), book.isCompleted) { 
                let parentElBtnInReadedList = document.createElement("div");
                parentElBtnInReadedList.setAttribute('class', "col-lg-2 row-article justify-content-around pb-sm-4 p-lg-fit");
                
                let undoBtn       = document.createElement("button");
                undoBtn.id        = book.id,
                undoBtn.classList.add('bookmark-button');

                undoBtn.addEventListener("click", undoTheBooks);
                
                let removeBtn       = document.createElement("button");
                removeBtn.id        = book.id,
                removeBtn.classList.add('remove-outline-button');

                removeBtn.addEventListener("click", removeBooks);
                
                parentElBtnInReadedList.appendChild(undoBtn),
                parentElBtnInReadedList.appendChild(removeBtn),

                addReadedBookEl.appendChild(bookshelfCardEl),
                bookshelfCardEl.appendChild(eachBookObjEl),
                bookshelfCardEl.appendChild(parentElBtnInReadedList);
            }
            else 
            {
                const parentElBtn = document.createElement("div");
                parentElBtn.setAttribute('class', "col-lg-2 row-article justify-content-around pb-sm-4 p-lg-fit");
                
                const completedBtn     = document.createElement("button");
                completedBtn.id        = book.id,
                completedBtn.classList.add('bookmark-outline-button');

                completedBtn.addEventListener("click", completedBooks);
                
                const removeBtn     = document.createElement("button");
                removeBtn.id        = book.id,
                removeBtn.classList.add('remove-button');

                removeBtn.addEventListener("click", removeBooks);

                parentElBtn.appendChild(completedBtn),
                parentElBtn.appendChild(removeBtn),
                
                addBookNotReadEl.appendChild(bookshelfCardEl),
                bookshelfCardEl.appendChild(eachBookObjEl),
                bookshelfCardEl.appendChild(parentElBtn);
            }
        }
    }
        
    function storages() {
        !function(arrayOfBookObj) {
            localStorage. setItem("books", JSON.stringify(arrayOfBookObj))
        } (arrayOfBookObj); 
        
        bookObj(arrayOfBookObj); 
    }

    window.addEventListener("load", (() => {
        arrayOfBookObj = JSON.parse(localStorage.getItem("books")) || [],
            bookObj(arrayOfBookObj);

        let bookForm   = document.getElementById("bookForm");
            searchForm = document.getElementById("searchBookForm");
            bookForm.addEventListener("submit", (e) => {
                addBookNotRead(e);
                cuteAlert({
                    type: "success",
                    title: "Magnifico!",
                    message: "Buku-mu telah berhasil disimpan",
                    buttonText: "Yeay",
                    src: 'img/success.svg'
                });
            });
            searchForm.addEventListener("submit", findYourBook);

            document.addEventListener("bookChanged", storages);
    }));

    
});