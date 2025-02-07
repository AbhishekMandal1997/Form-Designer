document.addEventListener("DOMContentLoaded", function () {
    const formPreview = document.getElementById("form-preview");
    const saveButton = document.getElementById("saveForm");
    const addButtons = document.querySelectorAll(".add-component");
    const previewButton = document.getElementById("previewButton");
    const darkModeToggle = document.getElementById("darkModeToggle");

    let formElements = [];

    function createElement(type) {
        const id = Date.now().toString();
        let element = document.createElement("div");
        element.classList.add("form-element");
        element.setAttribute("draggable", true);
        element.dataset.id = id;

        let label = document.createElement("input");
        label.type = "text";
        label.value = `Sample ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        label.classList.add("element-label");

        let input;

        if (type === "input") {
            input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Sample placeholder";
        } else if (type === "select") {
            input = document.createElement("select");
            let option = document.createElement("option");
            option.text = "Sample option";
            input.add(option);
        } else if (type === "textarea") {
            input = document.createElement("textarea");
            input.placeholder = "Sample placeholder";
        } else if (type === "checkbox") {
            input = document.createElement("input");
            input.type = "checkbox";
        }

        let deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = "&#x2715;";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            element.remove();
            formElements = formElements.filter(el => el.id !== id);
        });

        element.appendChild(label);
        element.appendChild(input);
        element.appendChild(deleteBtn);

        formPreview.appendChild(element);

        formElements.push({ id, type, label: label.value, placeholder: input.placeholder });
    }

    addButtons.forEach(button => {
        button.addEventListener("click", function () {
            createElement(this.dataset.type);
        });
    });

    saveButton.addEventListener("click", function () {
        console.log(JSON.stringify(formElements, null, 2));
    });

    formPreview.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", e.target.dataset.id);
    });

    formPreview.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    formPreview.addEventListener("drop", function (e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        const draggedElement = document.querySelector(`[data-id='${id}']`);
        formPreview.appendChild(draggedElement);
    });

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    previewButton.addEventListener("click", function () {
        let html = document.getElementById("form-preview").innerHTML;
        navigator.clipboard.writeText(html)
            .then(() => alert("Form HTML copied!"))
            .catch(err => console.error("Clipboard copy failed:", err));
    });
});
