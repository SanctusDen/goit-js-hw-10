import {fetchCatByBreed} from './cat-api.js'
import {fetchBreeds} from './cat-api.js'
import SlimSelect from 'slim-select'

// new SlimSelect({
// select: '#selectElement'
// })

const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');

function getBreeds(data) {
    fetchBreeds(data).then(data => data);
};
getBreeds('objects');

select.addEventListener("change", onSelected);

function onSelected(e) {
    let breedId = e.target.value;

    fetchCatByBreed(breedId).then((data) => {
        console.log(data)
        const markupCats = data
        .map(({ name, description, reference_image_id, temperament}) => {
            return `<li><h1>${name}</h1><img src=${reference_image_id} alt='${name}' width='200'><p>${temperament}</p><p>${description}</p></li>`;
        }).join('');
    catInfo.insertAdjacentHTML('beforeend', markupCats);
  });
};

function updateSelect(data) {
    fetchBreeds(data).then(data => {
        console.log(data)
        const markupBreeds = data.map(({ name, id }) => {
            return `<li><option value ='${id}'>${name}</option></li>`;
        }).join('');
    select.insertAdjacentHTML('beforeend', markupBreeds);
  });
};
updateSelect('markup');