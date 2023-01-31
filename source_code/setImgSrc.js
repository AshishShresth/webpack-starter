const imgElement = document.querySelector('#img');
import imgSrc from './assets/meme.jpg'

function setImgSrc() {
    imgElement.src = imgSrc;
}

export default setImgSrc;