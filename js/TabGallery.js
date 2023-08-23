const d = document;

const showTabButton = d.getElementById("showTabButton");
const tabGallery = d.getElementById("tabGallery");

showTabButton.addEventListener("click", () => {
    tabGallery.classList.toggle("show-tab");
});
