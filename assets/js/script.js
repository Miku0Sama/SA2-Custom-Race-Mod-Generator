const tagContainer = document.getElementById("tag-container");
const tagInput = document.getElementById("tag-input");
const autocompleteList = document.getElementById("autocomplete-list");

let tags = [];
const predefinedTags = ["goblin", "human", "animal", "magic", "undead", "player", "dwarf", "elf", "owlman", "alive", "troglodyte", "troll", "orc", "fishman", "demon", "satyr", "centaur", "mutant", "insectoid", "dragon", "skeleton", "ghoul", "zombie", "vampire", "reptilion", "halfling", "greenskin", "lich", "rasimi", "gnome", "kavian", "god", "mechanical", "angelic", "djinn", "bone wraith", "ursan", "gnoll", "uncontrollable"];

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
}

function addTag(value) {
    value = value.trim();
    if (!value || tags.includes(value)) return;
    tags.push(value);
    tagInput.value = "";
    renderTags();
    updateAutocomplete();
}

function updateAutocomplete() {
    // Reset the list
    autocompleteList.innerHTML = "";

    // if (!tagInput.value) return;

    const searchStr = tagInput.value.toLowerCase();
    const filtered = predefinedTags.filter(t => !tags.includes(t) && t.toLowerCase().includes(searchStr)).sort();

    if (filtered.length === 0) {
        hideAutocomplete();
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
}

function showAutocomplete() {
    autocompleteList.classList.add("visible"); // make it technically visible first
    requestAnimationFrame(() => {              // ensures browser registers the change
        autocompleteList.classList.add("show");  // trigger the expand animation
    });
}

function hideAutocomplete() {
    autocompleteList.classList.remove("show"); // collapse animation
    autocompleteList.addEventListener(
        "transitionend",
        function handler() {
            autocompleteList.classList.remove("visible"); // hide after animation
            autocompleteList.removeEventListener("transitionend", handler);
        }
    );
}

// Handle input events
tagInput.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === ",") {
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

// OLD SCHEMA CODE

/* This is cool and all but ultimately worthless for my use-case right now
const formSchema = {
  ages: {
    type: "group",
    label: "Ages",
    fields: {
      child: { type: "number", label: "Child Age" },
      adult: { type: "number", label: "Adult Age" },
      elder: { type: "number", label: "Elder Age" }
    }
  },
  names: {
    type: "group",
    label: "Names",
    fields: {
      female: { type: "textarea", label: "Female Names", commaSeparated: true, exportAs: "txt" },
      male: { type: "textarea", label: "Male Names", commaSeparated: true, exportAs: "txt" },
      settlements: {
        type: "group",
        label: "Settlements",
        twoLists: true,
        exportAs: "json"
      }
    }
  }
};

const container = document.getElementById("form-container");
const outputArea = document.getElementById("output-area");
let formData = {}; // store the form values

// Recursive function to generate form fields
function generateFields(schema, parentKey = "") {
  const fragment = document.createDocumentFragment();

  for (const key in schema) {
    const field = schema[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (field.type === "group") {
      const groupDiv = document.createElement("div");
      groupDiv.classList.add("form-group");

      if (field.label) {
        const label = document.createElement("h3");
        label.textContent = field.label;
        groupDiv.appendChild(label);
      }

      groupDiv.appendChild(generateFields(field.fields, fullKey));
      fragment.appendChild(groupDiv);

    } else {
      const wrapper = document.createElement("div");
      wrapper.classList.add("form-field");

      const label = document.createElement("label");
      label.textContent = field.label || key;
      label.setAttribute("for", fullKey);
      wrapper.appendChild(label);

      let input;
      if (field.type === "textarea") {
        input = document.createElement("textarea");
      } else {
        input = document.createElement("input");
        input.type = field.type;
      }

      input.id = fullKey;
      input.dataset.schemaKey = fullKey;
      wrapper.appendChild(input);

      // Update formData when user types
      input.addEventListener("input", e => {
        setNestedValue(formData, fullKey, e.target.value);
        updateOutput();
      });

      fragment.appendChild(wrapper);
    }
  }

  return fragment;
}

// Helper to set nested values in formData
function setNestedValue(obj, path, value) {
  const keys = path.split(".");
  let current = obj;
  keys.forEach((k, i) => {
    if (i === keys.length - 1) {
      current[k] = value;
    } else {
      if (!current[k]) current[k] = {};
      current = current[k];
    }
  });
}

// Update JSON output
function updateOutput() {
  outputArea.textContent = JSON.stringify(formData, null, 2);
}

// Initialize form
container.appendChild(generateFields(formSchema));
*/