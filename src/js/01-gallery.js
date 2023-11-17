import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const galleryList = document.querySelector('.gallery');

function getGallery() {
  const galleryItemsMarkup = galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img 
    class="gallery__image"
    src="${preview}"
    alt="${description}" />
    </a>
</li>`
    )
    .join('');

  galleryList.innerHTML = galleryItemsMarkup;
}

getGallery();

new SimpleLightbox('.gallery__link', {
  captionsData: 'alt',
  captionsDelay: 250,
  captions: true,
});

console.log(galleryItems);
