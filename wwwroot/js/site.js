﻿function imagePicked() {
    let files = document.getElementById('btn-choose-img').files;
    if (files.length > 0) {
        let file = files[0];
        let img = document.createElement("img");
        img.setAttribute("id", "img-picked");
        img.src = URL.createObjectURL(file);
        img.onload = onImageLoaded;
        document.getElementById("image-dropbox").appendChild(img);
        document.getElementById("error-message").innerHTML = "";
        document.getElementById("img-dimensions").style.visibility = "visible";
    }
}

function onImageLoaded() {
    let img = document.getElementById("img-picked");
    let width = img.width;
    let height = img.height;
    document.getElementById("img-width").innerHTML = "Width: " + width;
    document.getElementById("img-height").innerHTML = "Height: " + height;
    document.getElementById("img-new-width").value = width;
    document.getElementById("img-new-height").value = height;
}

function resizeImage() {
    widthChanged();
    let img = document.getElementById("img-picked");
    let width = img.width;
    let height = img.height;
    let newWidth = document.getElementById("img-new-width").value;
    let newHeight = document.getElementById("img-new-height").value;
    newWidth = parseInt(newWidth)
    newHeight = parseInt(newHeight);
    if (width == newWidth && height == newHeight) {
        showErrorMesssage("Please choose a new width and height.");
    }
    else if (newWidth == 0 || newHeight == 0) {
        showErrorMesssage("Please choose a new width and height.");
    }
    else {
        let btn = document.getElementById("submit-btn");
        btn.innerHTML = "Processing";
        btn.disabled = true;
        let openImageBtn = document.getElementById("open-image-btn");
        openImageBtn.innerHTML = "Processing";
        openImageBtn.disabled = true;
        let widthInput = document.getElementById("img-new-width");
        widthInput.disabled = true;
        let heightInput = document.getElementById("img-new-height");
        heightInput.disabled = true;
        let form = document.getElementById("resize-form");
        AJAXSubmit(form);
    }
}

function showErrorMesssage(message) {
    document.getElementById("error-message").innerHTML = message;
}

function widthChanged() {
    let img = document.getElementById("img-picked");
    let width = img.width;
    let height = img.height;
    let newWidth = document.getElementById("img-new-width").value;
    try {
        newWidth = parseInt(newWidth);
    } catch (e) {
        newWidth = width;
    }
    if (isNaN(newWidth) || newWidth <= 0) {
        newWidth = width;
    }
    document.getElementById("img-new-width").value = newWidth;
    let ratio = height / width;
    let newHeight = newWidth * ratio;
    document.getElementById("img-new-height").value = newHeight;
}

function heightChanged() {
    let img = document.getElementById("img-picked");
    let width = img.width;
    let height = img.height;
    let newHeight = document.getElementById("img-new-height").value;
    try {
        newHeight = parseInt(newHeight);
    } catch (e) {
        newHeight = height;
    }
    if (isNaN(newHeight) || newHeight <= 0) {
        newHeight = height;
    }
    document.getElementById("img-new-height").value = newHeight;
    let ratio = width / height;
    let newWidth = newHeight * ratio;
    document.getElementById("img-new-width").value = newWidth;
}

async function AJAXSubmit(oFormElement) {
    var resultElement = oFormElement.elements.namedItem("result");
    const formData = new FormData(oFormElement);

    try {
        const response = await fetch(oFormElement.action, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            window.location.href = '/';
        }

        resultElement.value = 'Result: ' + response.status + ' ' +
            response.statusText;
    } catch (error) {
        console.error('Error:', error);
    }
}