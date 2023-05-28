import { fetchCatByBreed, fetchBreeds } from './cat-api.js'
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css'
import SlimSelect from 'slim-select'
        
const catInfo = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

loader.classList.add('unvisible')

function getBreeds(data) {
    fetchBreeds(data).then(data => data);
};
getBreeds('objectBreeds');

function updateSelect(data) {
    fetchBreeds(data).then(data => {
        console.log(data)
        const markupBreeds = data.map(({ id, name }) => {
            return `<li><option value ='${id}'>${name}</option></li>`;
        }).join('');
        select.insertAdjacentHTML('beforeend', markupBreeds);
        // new SlimSelect({
        //     select: '#single'
        // });

    });
};
updateSelect();

select.addEventListener("change", onSelected);

function onSelected(e) {
    let breedId = e.target.value;

    fetchCatByBreed(breedId).then((data) => {
        console.log(data)
        const markupCats = data
        .map(({name,url,description,temperament}) => {
            return `<div><h1>${name}</h1>
            <img src=${url} alt='${name}' width='400'>
            <p>${temperament}</p>
            <p>${description}</p></div>`;
        }).join('');
        catInfo.insertAdjacentHTML('beforeend', markupCats)
        // .catch(error => console.log(error))
        // Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })
    // .finaly(()=>loader.classList.add('unvisible'))
};