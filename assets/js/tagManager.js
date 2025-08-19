const tagsField = createTagAutocomplete({
    containerId: "tagsContainer",
    inputId: "tagsInput",
    listId: "tagsAutocompleteList",
    predefinedTags: tagsList
});
const forbiddenActionsField = createTagAutocomplete({
    containerId: "forbiddenActionsContainer",
    inputId: "forbiddenActionsInput",
    listId: "forbiddenActionsAutocompleteList",
    predefinedTags: Object.keys(actionsMap)
});
const passivesField = createTagAutocomplete({
    containerId: "passivesContainer",
    inputId: "passivesInput",
    listId: "passivesAutocompleteList",
    predefinedTags: Object.getOwnPropertyNames(passivesMap)
});
const startingItemsField = createTagAutocomplete({
    containerId: "startingItemsContainer",
    inputId: "startingItemsInput",
    listId: "startingItemsAutocompleteList"
});
const startingRecipesField = createTagAutocomplete({
    containerId: "startingRecipesContainer",
    inputId: "startingRecipesInput",
    listId: "startingRecipesAutocompleteList"
});
function createTagAutocomplete({ containerId, inputId, listId, predefinedTags = ""}) {
    const tagContainer = document.getElementById(containerId);
    const tagInput = document.getElementById(inputId);
    const autocompleteList = document.getElementById(listId);

    let tags = [];

    function renderTags() {
        // Remove all pills except the input
        tagContainer.querySelectorAll(".tag-pill").forEach(p => p.remove());

        tags.forEach((tag, index) => {
            const pill = document.createElement("span");
            pill.className = "tag-pill";
            pill.textContent = tag;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "×";
            removeBtn.addEventListener("click", () => {
                tags.splice(index, 1);
                renderTags();
                updateAutocomplete();
            });

            pill.appendChild(removeBtn);
            tagContainer.insertBefore(pill, tagInput);
        });
    };

    function addTag(value) {
        value = value.trim();
        if (!value || tags.includes(value)) return;
        tags.push(value);
        tagInput.value = "";
        renderTags();
        updateAutocomplete();
    };

    function updateAutocomplete() {
        // Reset the list
        autocompleteList.innerHTML = "";

        const searchStr = tagInput.value.toLowerCase();
        const filtered = predefinedTags
            .filter(t => !tags.includes(t) && t.toLowerCase().includes(searchStr))
            .sort();

        if (filtered.length === 0) {
            if (autocompleteList.classList.contains("visible")) {
                hideAutocomplete();
            }
            return;
        }

        filtered.forEach(tag => {
            const li = document.createElement("li");
            li.textContent = tag;
            li.classList.add("tag-pill");
            li.addEventListener("click", () => addTag(tag));
            autocompleteList.appendChild(li);
        });
        
        showAutocomplete();
    };

    function showAutocomplete() {
        autocompleteList.classList.add("visible"); // make it technically visible first
        requestAnimationFrame(() => {              // ensures browser registers the change
            autocompleteList.classList.add("show");  // trigger the expand animation
        });
    };

    function hideAutocomplete() {
        autocompleteList.classList.remove("show"); // collapse animation
        autocompleteList.addEventListener(
            "transitionend",
            function handler() {
                autocompleteList.classList.remove("visible"); // hide after animation
                autocompleteList.removeEventListener("transitionend", handler);
            }
        );
    };

    // Handle input events
    tagInput.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === "," || (tagInput.classList.contains("entityIDs") && e.key === " ")) {
            e.preventDefault();
            addTag(tagInput.value);
        } else if (e.key === "Backspace" && !tagInput.value && tags.length) {
            tags.pop();
            renderTags();
            updateAutocomplete();
        }
    });

    tagInput.addEventListener("input", updateAutocomplete);
    tagInput.addEventListener("focus", updateAutocomplete);

    // Click outside closes autocomplete
    document.addEventListener("click", e => {
        if (!tagContainer.contains(e.target) && autocompleteList.classList.contains("show")) {
            hideAutocomplete();
        }
    });

    // Handle focus leaving the input
    tagInput.addEventListener("blur", e => {
        // Delay just a tick so clicks on the autocomplete list still register
        setTimeout(() => {
            if (!tagContainer.contains(document.activeElement)) {
                hideAutocomplete();
            }
        }, 150);
    });

    return {
        getTags: () => [...tags],
        addTag,
        clearTags: () => {
            tags = [];
            renderTags();
            updateAutocomplete();
        }
    };
};