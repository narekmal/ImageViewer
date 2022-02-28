// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", () => { 

    const handleImageClick = e => {
        const target = e.target;
        const imgUrl = target.getAttribute('data-href');
        const downloadLink = document.querySelector(".js-download");
        const initialStateLink = document.querySelector(".js-initial-state");
        const imgWrapper = document.querySelector(".img-wrapper");

        selectedImage.setAttribute('src', imgUrl);
        imgWrapper.classList.add('loading');
        downloadLink.style.display = "none";
        initialStateLink.style.display = "none";
        selectedImage.onload = ()=>{
            imgWrapper.classList.remove('loading');
            downloadLink.style.display = "inline";
            initialStateLink.style.display = "inline";
        };
        selectedImage.setAttribute('data-width', target.getAttribute('data-width'));
        selectedImage.setAttribute('data-height', target.getAttribute('data-height'));

        downloadLink.setAttribute("href", imgUrl);
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
        if (scale == 1)
            return;
        
        var width = parseInt(selectedImage.getAttribute('data-width'));
        var height = parseInt(selectedImage.getAttribute('data-height'));
        var xShift = e.offsetX - width/2;
        var yShift = e.offsetY - height/2;
        var outerWidth = width * (scale-1);
        var outerHeight = height * (scale-1);
        var translateX = Math.floor((xShift/outerWidth) * 100);
        var translateY = Math.floor((yShift/outerHeight) * 100);

        selectedImage.style.transform = `scale(${scale}) translate(${translateX}%, ${translateY}%)`;
    };

    const handleInitialStateClick = e => {
        selectedImage.style.transform = `scale(1)`;
        scale = 1;
    };

    const images = document.querySelectorAll(".js-image");
    images.forEach(image => image.addEventListener("click", handleImageClick));

    const selectedImage = document.querySelector(".js-selected-image");
    if (selectedImage) {
        selectedImage.onwheel = handleWheel;
        selectedImage.onmousemove = handleMouseMove;
    }
    document.querySelector(".js-initial-state").onclick = handleInitialStateClick;
    let scale = 1;
});
