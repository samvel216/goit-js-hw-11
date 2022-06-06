import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const searchInputEl = document.querySelector(".search-input");
const galleryEl = document.querySelector(".gallery");
const loadButtonEl = document.querySelector(".load-button");
const searchFormEl = document.querySelector(".search-form");
const loadFormEl = document.querySelector(".load-form");
const containerEl = document.querySelector(".container");
const endlessScrollEl = document.querySelector(".endless-scroll");
let page = 1;
let per_page = 40;
let hoorayEl = 1;
let totalHits;
let bool;
const scrollBuild = () => {
  const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
}
galleryEl.addEventListener('click', (event) => {
  event.preventDefault();
  let gallery = new SimpleLightbox('.gallery a', { "captionDelay": 250 });
})
searchFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    if (hoorayEl > 1) {
      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }
  if (galleryEl.outerText !== "") {
    galleryEl.innerHTML = "";
  }
    fetchTrueFalce();
    hoorayEl += 1;
})

const fetchFunk = async (name) => {
    const fetchAnswer = await fetch(`https://pixabay.com/api/?key=25829812-d39cfe0a6889efb95d5c21ab8&q=${name}
    &image_type=photo&orientation=horizontal&safesearch=true&totalHits&webformatURL&largeImageURL&page=${page}&per_page=${per_page}`);
    const fetchAnswerMassive = await fetchAnswer.json();
    if (fetchAnswerMassive.hits.length < 1) {
      return error;
    }
    totalHits = fetchAnswerMassive.totalHits;
    return fetchAnswerMassive.hits;
}
const fetchTrueFalce = async () => {
    try {
        const lalka = await fetchFunk(searchInputEl.value);
        innerFunk(lalka); 
        loadButtonEl.style.display = "block";   
        scrollBuild(); 
        bool = Math.ceil(totalHits / per_page);
        if (page === bool) {
          loadButtonEl.style.display = "none";
         }
    }  catch (error) {
      console.log(error);
      loadButtonEl.style.display = "none";
      Notiflix.Notify.failure('Sorry, there are no images maching your search query, Please try again.');
    }
}
const innerFunk = (array) => {
    const markup = array.map((element) => `
    <div class="photo-card">
    <a href="${element.largeImageURL}">
  <img src="${element.webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b class="info-b">Likes</b>
      ${element.likes}
    </p>
    <p class="info-item">
      <b class="info-b">Views</b>
      ${element.views}
    </p>
    <p class="info-item">
      <b class="info-b">Comments</b>
      ${element.comments}
    </p>
    <p class="info-item">
      <b class="info-b">Downloads</b>
      ${element.downloads}
    </p>
  </div>
  </a>
</div>
    `).join("");
    galleryEl.insertAdjacentHTML("beforeend", markup); 
}
let checkButton = 1;
loadFormEl.addEventListener('submit', (event) => {
  event.preventDefault(); 
  page += 1;
  checkButton += 1;
  fetchTrueFalce();
})
endlessScrollEl.addEventListener('click', (event) => {
  event.preventDefault(); 
  console.log(containerEl.style.height);
  if (checkButton > 1) {
 
    window.addEventListener('scroll', function() {
      if (document.body.scrollHeight - window.pageYOffset < window.innerHeight) {
        fetchTrueFalce();   
      }
    });
  } else {
    Notiflix.Notify.info(`Сначала попробуйте обычную кнопку.`);
  }
})
