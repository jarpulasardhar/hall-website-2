import "./script.js";
const modal = document.querySelector('.modal');
const prevBtn = document.querySelector(".prevbtn");
const nextBtn = document.querySelector(".nextbtn");
const modalImg = document.querySelector(".modal-img");
const closeModal = document.querySelector('.close-modal');
let imgIdx, imgs, numberOfImages, selectedYear, images; // initial value of selectedYear is set on page load, later changed when another year is selected.

prevBtn.addEventListener("click", () => {
    imgIdx = (imgIdx-1+numberOfImages)%numberOfImages;
    modalImg.setAttribute('src', imgs[imgIdx].getAttribute('src'));
})
nextBtn.addEventListener("click", () => {
    imgIdx = (imgIdx+1)%numberOfImages;
    modalImg.setAttribute('src', imgs[imgIdx].getAttribute('src'));
})
closeModal.addEventListener('click', () => {
    modal.close();
})
function setModal(imgGallery){
    imgs = imgGallery.querySelectorAll('img')
    numberOfImages = imgs.length;
    imgs.forEach((img, idx) => {
        img.addEventListener('click', ()=>{
            modalImg.setAttribute('src', img.getAttribute('src'));
            modal.showModal();
            imgIdx = idx;
        })
    });
}
// This is the main function which is loading images for given year and event. It then calls setModal function which adds click event on images
// so that on clicking them, modal opens.
const imgGallery = document.querySelector('.img-gallery'); // div which contains images.
function loadImages(year, event){
    imgGallery.dataset.item = event;
    imgGallery.innerHTML = images[year][event]["data"].map(evt => `<div class="gallery-item"><img src="${evt.src}" alt="${evt.alt}"></div>`)
                                                .reduce((acc, curr)=> {
                                                    acc.push(curr);
                                                    return acc;
                                                }, [])
                                                .join("");
    setModal(imgGallery);
}
// This function will run everytime a new event is clicked for a given year (selectedYear).
function loadEventImages(){
    activeEvent.classList.remove('active-event');
    this.classList.add("active-event");
    activeEvent = this;
    loadImages(selectedYear, activeEvent.dataset.filter);
}
// When user clicks on a particular year in "Academic Year" dropdown then setYear() function runs followed by setEventsList() function.
const eventsNavbar = document.querySelector(".event-navbar");
let activeEvent;
function setEventsList(year){
    eventsNavbar.innerHTML = Object.keys(images[year]).map(evt => `<span class="filter-item" data-filter=${evt}>${images[year][evt]["title"]}</span>`)
                                                        .reduce((acc, curr) => {
                                                            acc.push(curr);
                                                            return acc;
                                                        }, [])
                                                        .join("");
    activeEvent = eventsNavbar.firstChild;
    activeEvent.classList.add("active-event");
    let eventsList = [...eventsNavbar.children];
    eventsList.forEach(evt => evt.addEventListener('click', loadEventImages));
    loadImages(year, activeEvent.dataset.filter);
}
function setYear(){
    activeYear.classList.remove('active');
    this.classList.add('active'); // here this reference the element on which event is added.
    activeYear = this;
    selectedYear = this.dataset.filter;
    setEventsList(selectedYear);
}
// On page load, dropdown content is added and images for selectedYear (latestYear) and firstEvent (in that year) are loaded.
const yearDropdown = document.querySelector('.dropdown-content');
let activeYear;
window.addEventListener('DOMContentLoaded', async () => {
    images = await fetch("/database/gallery.json").then(data => data.json());
    yearDropdown.innerHTML = Object.keys(images).map(yrs => `<li class="year" data-filter=${yrs}>${yrs}</li>`)
                                                .reduceRight((acc, curr) => {
                                                    acc.push(curr);
                                                    return acc;
                                                }, [])
                                                .join("");
    activeYear = yearDropdown.firstChild;
    activeYear.classList.add('active');
    let years = [...yearDropdown.children];
    years.forEach(yr => yr.addEventListener('click', setYear));
    selectedYear = activeYear.dataset.filter;
    setEventsList(selectedYear);
})