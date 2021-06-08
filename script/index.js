const body = document.body;
let url = "https://swapi.dev/api/people";

// Set header text
let header = document.createElement("h1");
header.textContent = "Star Wars";
body.appendChild(header);

// Function to fetch the API
const makeRequest = async(url) => {
        try {
            let response = await fetch(url);
            let data = await response.json();
            return data
        } catch (error) {
            body.append(`
            Failed to load page... Check your internet connection 🌐`);
            throw error;
        }
    }
    //Function to create card of each element from the result array of the fetched data
    //and append it to the document body tag.
const renderData = async(url) => {
    const data = await makeRequest(url);
    const infos = data.results;
    let fragment = new DocumentFragment();
    let container = document.createElement("div");
    container.className = "container";
    infos.forEach(actor => {
        container.appendChild(createCard(actor));
    });
    fragment.appendChild(container);
    body.appendChild(fragment);
}

//Function to create card fragment
const createCard = (actor) => {
    let fragment = new DocumentFragment();
    let card = document.createElement("figure");
    let cardImage = document.createElement("img");
    let source = `./img/${actor.name}.jpeg`;
    let caption = document.createElement("figcaption");
    cardImage.src = source;
    caption.textContent = actor.name;
    card.addEventListener('click', () => {
        const message = createModal(actor);
        modalContent.textContent = "";
        modalContent.appendChild(message);
        toggleModal();
    })
    card.appendChild(cardImage);
    card.appendChild(caption);
    return fragment.appendChild(card)
}

//Steps to create the modal and append to the body tag
let modalFragment = new DocumentFragment();
let modal = document.createElement("div");
modal.className = "modal";
let modalContent = document.createElement("div");
modalContent.className = "modal-content";
modal.appendChild(modalContent);
modalFragment.appendChild(modal);
body.appendChild(modalFragment);

// Function to create modal content
function createModal(actor) {
    let fragment = new DocumentFragment();
    let text = `Name: ${actor.name}<br/>Gender: ${actor.gender}<br/>Height: ${actor.height}`;
    let modalMessage = document.createElement("p");
    modalMessage.innerHTML = text;
    fragment.appendChild(modalMessage)
    return fragment
}
// Function to toggle the modal appearance
function toggleModal() {
    modal.classList.toggle("show-modal");
}
// Function to toggle the active modal appearance when outer window is clicked
function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}
// closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//Render the page then add the footer afterwards
(async() => {
    await renderData(url).then(() => {
        let footer = document.createElement("footer");
        footer.textContent = "Copyright © 2022 iDris";
        body.appendChild(footer);
    })
})();

module.exports = { main }