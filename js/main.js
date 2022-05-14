//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('#addBook').addEventListener('click', addBook)

//Updatet the display to to localStorage value for the books key
// document.querySelector('#displayName').innerText = localStorage.getItem('books')

let bookArray = []


if (!localStorage.getItem('bookList')) {
  localStorage.setItem('bookList', '')
}

// populate booklist for user
if (localStorage.getItem('bookList') !== '') {
      let toList = localStorage.getItem('bookList').split(',')
      console.log(toList)
      toList.forEach(item => {

      let li = document.createElement('li')
      li.textContent = item
      document.querySelector('#bookList').appendChild(li)
    
  })

}




function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)
  const url = `https://openlibrary.org/isbn/${choice}.json`
  
  

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.title) 
        if (!localStorage.getItem('books')) {
          localStorage.setItem('books', data.title)

        } else {
          let books = localStorage.getItem('books') + ' ; ' + data.title
          localStorage.setItem('books', books)
        }

        document.querySelector('#displayName').innerText = data.title;
  
          // document.querySelector('#displayName').innerText = localStorage.getItem('books')

        document.querySelector('input').value ="";
          
  
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


function addBook() {
  let searchBooked = document.querySelector('#displayName')
  if (searchBooked.innerText) {
    // Create new li and append
    let li = document.createElement('li')
    li.textContent = searchBooked.innerText
    document.querySelector('#bookList').appendChild(li)

    // update local storage with booklist
    bookArray.push(searchBooked.innerText)
    
    localStorage.setItem('bookList', bookArray.toString())

    searchBooked.textContent = ''
  } 

}




