let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  getToysList('http://localhost:3000/toys')

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toycollection = document.querySelector("#toy-collection");
  const newToyform = document.querySelector(".add-toy-form");
  

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  newToyform.addEventListener ('submit', (event) => {
    event.preventDefault()
    const newImage = {
      "name": `${event.target.name.value}`,
      "image": `${event.target.image.value}`,
      "likes": 0
    }
    storeNewToy ('http://localhost:3000/toys', newImage)
  })

  toycollection.addEventListener ('click', (event) => {
    if (event.target.className === 'like-btn') {
      like = event.target.parentNode.querySelector('p')
      likeText = like.innerHTML 
      likeNumbers = (parseInt (likeText.replace (' likes', ""), 10))
      console.log (likeNumbers)
      newLikeNumbers = ++likeNumbers
      like.innerHTML = `${newLikeNumbers} likes`
      updateToyLikes(`http://localhost:3000/toys/${event.target.id}`, newLikeNumbers)
    }
  })



  function renderToys (toys) {
    toys.forEach ((toy) => {
      let toyname = document.createElement ('h2')
      toyname.innerHTML = `${toy.name}`
      let image = document.createElement ('img')
      image.src = `${toy.image}`; image.classList.add('toy-avatar')
      let likesDisplay = document.createElement ('p')
      likesDisplay.id = `likes-for-${toy.name} `
      if (toy.likes > 1) likesDisplay.innerHTML = `${toy.likes} likes`
      else likesDisplay.innerHTML = `${toy.likes} like`
      let likeButton = document.createElement ('button')
      likeButton.id = `${toy.id}`;
      likeButton.classList.add ('like-btn');
      likeButton.innerHTML = 'Like'
      likeButton.id = `${toy.id}`
      let card = document.createElement ('div')
      card.classList.add ('card');
      card.append (toyname, image, likesDisplay, likeButton)
      toycollection.append (card)
    })
  }

  function getToysList (url) {
    fetch (url)
    .then (response => response.json())
    .then (toys => renderToys(toys))
  }

  function storeNewToy (url, imageObj) {
    fetch (url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(imageObj)
    })
    .then (response => response.json())
    .then (toys => renderToys(toys))
  }

  function updateToyLikes (url, value) {
    fetch (url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify ({"likes": value})
    })
    .then (response => response.json())
    .then (data => data)
  }
  
});
