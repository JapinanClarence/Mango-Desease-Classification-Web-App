const form = document.getElementById("image_upload_form");
const imgFile = document.getElementById("file");

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
// Function to create the file display element
function createFileDisplay(fileName) {
    const fileDisplay = document.createElement("div");
    fileDisplay.classList.add("mb-5", "rounded-md", "bg-[#F5F7FB]", "hover:bg-[#E2E5EF]","py-4", "px-8");
    fileDisplay.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                ${fileName}
            </span>
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

// Function to remove the file display element
function removeFileDisplay(element) {
    element.remove();
}

// Event listener for file input change
imgFile.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const fileName = file.name;
        const fileDisplay = createFileDisplay(fileName);
        // Get the parent element of the file input
        const formElement = document.getElementById("image_upload_form");
        if (formElement) {
            // Insert the file display element before the last child of the form
            formElement.insertBefore(fileDisplay, formElement.lastElementChild);
        } else {
            console.error("Form element not found");
        }
    }
});

