const searchField = document.getElementById('search-field');
const loadData = () =>{
    const searchText = searchField.value;
    const url = ` http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data))
};
const displayData = matchedBookList => {
    const bookList = matchedBookList.docs;
   
    bookList.forEach(book =>{
        const bookTitle = book.title;
        const author = book.author_name; 
        const publisher = book.publisher;
        const firsPublish = book.first_publish_year;
        const coverImg = book.cover_i; 
        // console.log(book);
        const cardContainer = document.getElementById('card-container');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
        <img src="https://covers.openlibrary.org/b/id/${coverImg}-M.jpg" class="card-img-top" alt="image">

        <div class="card-body">
            <h5 class="card-title">Book Name : ${bookTitle}</h5>
            <h5 class="card-title">Author Name : ${author}</h5>
            <h5 class="card-title">Publish Year : ${firsPublish}</h5>       
            <h5 class="card-title">Publisher : ${publisher}</h5>       
        </div>
        </div>
        `;
        cardContainer.appendChild(div);
        
        
        // console.log(bookTitle);
        // console.log(author);
        // console.log(firsPublish);   
    });
};
