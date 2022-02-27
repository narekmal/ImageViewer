// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", () => { 
    const images = document.querySelectorAll(".js-image");

    const handleImageClick = e => {
        const selectedImage = document.querySelector(".js-selected-image");
        const imgUrl = e.target.getAttribute('data-href');
        const downloadLink = document.querySelector(".js-download");

        selectedImage.setAttribute('src', imgUrl);

        downloadLink.style.display = "inline";
        downloadLink.setAttribute("href", imgUrl);
        document.querySelector(".js-initial-state").style.display = "inline";
        // const clickedCard = e.target.closest(".js-card")
        // cards.forEach(card => {
        //     card.isSameNode(clickedCard) ? card.classList.remove("js-invert-colors") : card.classList.add("js-invert-colors");
        // });
    }

    images.forEach(card => card.addEventListener("click", handleImageClick));
});
