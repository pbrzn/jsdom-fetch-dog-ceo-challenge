console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

//Task 1

function addDogImages(url) {
  fetch(url).then(resp => resp.json()).then(function(json) {
    const array = json.message;
    for (const item of array) {
      const images = document.getElementById('dog-image-container');
      const img = document.createElement('img');
      img.src = `${item}`;
      images.appendChild(img);
    }
  })
};

addDogImages(imgUrl);

//Task 2

function fetchBreeds(url) {
  fetch(url).then(resp => resp.json()).then(function(json) {
    const obj = json.message;
    for (const key in obj) {
      const ul = document.getElementById('dog-breeds');
      const breed = document.createElement('li');
      breed.className = "breed"
      breed.innerHTML = `${key}`
      ul.appendChild(breed);

      if (Array.isArray(obj[key])) {
        for (const value of obj[key]) {
          const newUl = document.createElement('ul');
          breed.appendChild(newUl);
          const subBreed = document.createElement('li');
          subBreed.className = "breed"
          subBreed.innerHTML = `${value}`;
          newUl.appendChild(subBreed);
        }
      }
    }
  })
};

fetchBreeds(breedUrl);

//Task 3

document.addEventListener('click', function(event) {
  if (event.target = 'li.breed') {
    let target = event.target;
    target.style.color = "blue";
  }
});

//Task 4

function filterBreeds(url, letter) {
  const ul = document.querySelector('ul#dog-breeds');
  while (ul.firstChild){
    ul.removeChild(ul.firstChild)
  }

  fetch(url).then(resp => resp.json()).then(function(json) {
    const obj = json.message;
    for (const key in obj) {
      if (key[0] === letter) {
        // const ul = document.getElementById('dog-breeds');
        const breed = document.createElement('li');
        breed.className = "breed"
        breed.innerHTML = `${key}`
        ul.appendChild(breed);
      }
    }
  })
}

document.addEventListener('change', function(event) {
  const i = event.target.options.selectedIndex
  const letters = ['a', 'b', 'c', 'd']

  filterBreeds(breedUrl, letters[i])
});
