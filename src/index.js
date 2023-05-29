import { fetchCatByBreed, fetchBreeds } from './cat-api.js'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import { Loading } from 'notiflix/build/notiflix-loading-aio';
        
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

getBreeds('objectBreeds');

function getBreeds(data) {
    fetchBreeds(data).then(data => data);
};

updateSelect();

function updateSelect(data) {
    fetchBreeds(data).then(data => {
        console.log(data)
        const markupBreeds = data.map(({ id, name }) => {
            return `<li><option value ='${id}'>${name}</option></li>`;
        }).join('');
        select.insertAdjacentHTML('beforeend', markupBreeds);
    });
};

select.addEventListener("change", onSelected);

Loading.remove('loader');
errorEl.style.display = 'none'
loader.style.display = 'none'

function onSelected(e) {
    Loading.dots();
    let breedId = e.target.value;

    fetchCatByBreed(breedId).then((data) => {
        console.log(data)

        const markupCats = data[0].breeds
            .map(({ name, description, temperament }) => {
                return `<h1>${name}</h1>
        <p>${description}</p>
        <p>Temperament: ${temperament}</p>`;
        }).join('');
        
       const markupPicture = data[0].breeds.map(({url}) => {
         return `<img src='${url}' width='600'>`
        }).join('');
        catInfo.insertAdjacentHTML('beforeend', markupPicture);
        catInfo.insertAdjacentHTML('beforeend', markupCats);
    })
    .finally(() => {
        Loading.remove();
    });
    catInfo.innerHTML = '';
};



// loader.style.display = 'block'
// Loading.dots(loader.style.display = 'none');
// loader.classList.add('unvisible');
// .finaly(() => loader.classList.add('unvisible'));
