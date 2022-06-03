import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
const formButtonEl = document.querySelector(".form-button");
const searchInputEl = document.querySelector(".search-input");
const galleryEl = document.querySelector(".gallery");
const loadButtonEl = document.querySelector(".load-button");
console.log(formButtonEl);
console.log(searchInputEl);
console.log(galleryEl);
console.log(galleryEl)
let page = 1;
let per_page = 40;
let hoorayEl = 1;
let totalHits;

galleryEl.addEventListener('click', (event) => {
  event.preventDefault();
  let gallery = new SimpleLightbox('.gallery a', { "captionDelay": 250 });
})
formButtonEl.addEventListener("click", (event) => {
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
        console.log(lalka.totalHits);
        innerFunk(lalka); 
        loadButtonEl.style.display = "block";    
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
loadButtonEl.addEventListener('click', (event) => {
  event.preventDefault();
  page += 1;
  fetchTrueFalce();
})

window.addEventListener('scroll', function() {
  if (document.body.scrollHeight - window.pageYOffset < window.innerHeight) {
    fetchTrueFalce();   
  }
});