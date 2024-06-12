import { loadModel, classifyImage } from "./model.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("image_upload_form");
  const imgFile = document.getElementById("file");
  const dropZone = document.getElementById("drop_zone");
  const fileContainer = document.getElementById("file_container");
  let currentFileDisplay = null; // Variable to hold the current file display element

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const files = imgFile.files[0];
    if (!files) {
      handleAlert("Please select an image to classify");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageElement = new Image();
      imageElement.src = reader.result;
      imageElement.onload = async () => {
        const modal = document.getElementById("modal");
        const imagePreview = document.getElementById("imagePreview");
        const loadingOverlay = document.getElementById("loading");
        const predictionText = document.getElementById("prediction");

        imagePreview.src = reader.result;
        imagePreview.style.display = "block";
        loadingOverlay.style.display = "flex";
        predictionText.innerText = "";

        modal.style.display = "block";

        const model = await loadModel();
        const predictions = await classifyImage(model, imageElement);
        predictionText.innerText = `Predictions: ${predictions}`;

        loadingOverlay.style.display = "none";
      };
    };
    reader.readAsDataURL(file);
  });

  dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
    dropZone.classList.add("bg-[#E2E5EF]");
  });

  dropZone.addEventListener("dragleave", function (event) {
    event.preventDefault();
    dropZone.classList.remove("bg-[#E2E5EF]");
  });

  dropZone.addEventListener("drop", function (event) {
    event.preventDefault();
    dropZone.classList.remove("bg-[#E2E5EF]");
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  });

  imgFile.addEventListener("change", function (event) {
    const files = event.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  });

  function handleFile(file) {
    if (currentFileDisplay) {
      // If there's already a file displayed, remove it before adding the new one
      removeFileDisplay(currentFileDisplay);
    }
    currentFileDisplay = createFileDisplay(file.name);
    fileContainer.appendChild(currentFileDisplay);
  }

  function createFileDisplay(fileName) {
    const fileDisplay = document.createElement("div");
    fileDisplay.classList.add(
      "mb-5",
      "rounded-md",
      "bg-[#F5F7FB]",
      "py-4",
      "px-8"
    );
    fileDisplay.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-base font-medium text-[#07074D]">${fileName}</span>
            <button class="text-[#07074D]" onclick="removeFileDisplay(this.parentNode.parentNode)">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        `;
    return fileDisplay;
  }
  function handleAlert(message) {
    const alertContainer = document.getElementById("alertContainer");

    alertContainer.innerHTML = `
        <div class="mb-2 rounded-md bg-red-200 py-4 px-8">
          <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-sm font-medium text-red-500">${message}</span>
            <button class="text-red-500" onclick="removeDisplayAlert(this.parentNode.parentNode)">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
    `;
  }

  window.removeDisplayAlert = function (element) {
    element.remove();
  };
  window.removeFileDisplay = function (element) {
    element.remove();
    currentFileDisplay = null; // Reset the current file display element
    window.location.reload();
  };
  // Hide modal when clicking outside of the modal content
  window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
