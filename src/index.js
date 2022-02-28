import './sass/main.scss';
import SimpleLightbox from "simplelightbox";
const btnSubmitEl = document.querySelector(".btn-submit");
const inputSearchFormEl = document.querySelector(".input-search-form");
const searchFormEl = document.querySelector(".search-form");
const galleryEll = document.querySelector(".gallery");
const containerEl = document.querySelector(".container");
let i = 0;
const getFetchBlob = async (name) => { 
  i++;
    try {     
const response = await fetch(`https://pixabay.com/api/?key=25829812-d39cfe0a6889efb95d5c21ab8&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${i}&per_page=40`);
const image = await response.json();
return image;
    } catch (error) {
   console.log(error.message);
    }
}   
const galleryImage = (elements) => {
const markup = elements.map((element) =>  {
    console.log(typeof element.webformatURL);
 
return `<div class="photo-card">
<img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" class="photo"/>
<div class="info">
  <p class="info-item">
    <b class="item-descr">Likes</b>
    ${element.likes}

  </p>
  <p class="info-item">
    <b class="item-descr">Views</b>
    ${element.views}

  </p>
  <p class="info-item">
    <b class="item-descr">Comments</b>
    ${element.comments}
    
  </p>
  <p class="info-item">
    <b class="item-descr">Downloads</b>
    ${element.downloads}
  
  </p>
</div>
</div>`}).join("");
galleryEll.insertAdjacentHTML("beforeend", markup);

}

const lalka = (event) => {
    event.preventDefault();
    let name = event.currentTarget.firstElementChild.value;
    galleryEll.innerHTML = "";
    getFetchBlob(name).then(elements => {
      const elementsHitsEl = elements.hits
      galleryImage(elementsHitsEl);
    })
    
}
searchFormEl.addEventListener("submit", lalka);
window.addEventListener("scroll", function() {       
    const contentHeight = containerEl.offsetHeight;     
    const yOffset       = window.pageYOffset;      
    const window_height = window.innerHeight;      
    const y             = yOffset + window_height;
    console.log(i);
   
  if (y >= contentHeight && i > 0) {
   const inputValue = inputSearchFormEl.value;
   getFetchBlob(inputValue).then(elements => {
    const elementsHitsEl = elements.hits
    galleryImage(elementsHitsEl);
  })
  
  }   
})
