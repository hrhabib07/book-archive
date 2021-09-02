const searchField = document.getElementById('search-field');
const searchResultContainer = document.getElementById('show-result');
const cardContainer = document.getElementById('card-container');
const spinnerStyle = displayStyle =>{
    document.getElementById('show-spinner').style.display = displayStyle;
}
const loadData = () =>{
    spinnerStyle("block");
    const searchText = searchField.value;
    searchResultContainer.textContent = '';
    const url = ` https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data));    
};
const displayData = matchedBookList => {
    cardContainer.textContent = '';
    const bookList = matchedBookList.docs;
    const shortedBookList = bookList.slice(0, 25);
    const searchText = searchField.value;
    const numberFound = matchedBookList.num_found;
    searchField.value = '';
    if(numberFound !== 0){
        const showingBook = shortedBookList.length;  
        const div = document.createElement('div');
        div.classList.add('text-success');
        div.innerHTML = `
        <h4>You have searched for "${searchText}". We have found ${numberFound} books similar with your search and showing you first ${showingBook} result of your search. </h4>
        `;
    searchResultContainer.appendChild(div);    
    shortedBookList.forEach(book =>{
        const bookTitle = book.title;
        const author = book.author_name;
        let publisher = book.publisher;
        if(publisher !== undefined){
            publisher = publisher[0];
        } else{
            console.log(publisher);
            publisher = "Publisher Unknown";
        };
        const firsPublish = book.first_publish_year;
        const coverImg = book.cover_i;
        const div = document.createElement('div');
        div.classList.add('col');
        if(coverImg === undefined){
            div.innerHTML = `
        <div class="card">
        <img src="image/default image.jpg" alt="">
        <div class="card-body">
            <h5 class="card-title">Book Name : ${bookTitle}</h5>
            <h5 class="card-title">Author Name : ${author}</h5>
            <h5 class="card-title">Publish Year : ${firsPublish}</h5>       
            <h5 class="card-title">Publisher : ${publisher}</h5>       
        </div>
        </div>
        `;
        spinnerStyle("none");
        cardContainer.appendChild(div);
        }  else{
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
        spinnerStyle("none");
        cardContainer.appendChild(div);
        }   
    });
    } else{
        const searchResultContainer = document.getElementById('show-result');
        const div = document.createElement('div');
        div.classList.add('text-warning')
        div.innerHTML = `
        <h4>Type a valid book name.</h4>
        `;
        spinnerStyle("none");
        searchResultContainer.appendChild(div);
    }    
};