// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", () => { 

    const handleImageClick = e => {
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
    };

    const handleWheel = e => {
        e.preventDefault();

        scale += e.deltaY * -0.01;

        // Restrict scale
        scale = Math.min(Math.max(1, scale), 4);

        // Apply scale transform
        selectedImage.style.transform = `scale(${scale})`;
    };

    const handleMouseMove = e => {
        console.log('mouse move', e);
    };

    const handleInitialStateClick = e => {
        selectedImage.style.transform = `scale(1)`;
    };

    const images = document.querySelectorAll(".js-image");
    images.forEach(image => image.addEventListener("click", handleImageClick));

    const selectedImage = document.querySelector(".js-selected-image");
    selectedImage.onwheel = handleWheel;
    let scale = 1;
    selectedImage.onmousemove = handleMouseMove;
    document.querySelector(".js-initial-state").onclick = handleInitialStateClick;
});
