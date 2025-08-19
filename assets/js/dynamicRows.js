const statsContainerObject = {
    containerId: "statsContainer",
    options: [{
            label: "Main Stats",
            sub: mainStats
        },
        {
            label: "Sub Stats",
            sub: subStats
        }],
    hasSublists: true
};

const crimesContainerObject = {
    containerId: "crimesContainer",
    options: crimesList
};

// Add a new configurable row (dropdown(s) + input + remove button)
function addOptionRow({
    containerId,
    options = [],
    hasSublists = false,
    rowClass = "option-row",
    placeholder = "Value",
}) {
    const container = document.getElementById(containerId);
    const row = document.createElement("div");
    row.className = rowClass;

    // Create main dropdown
    const select = document.createElement("select");

    options.forEach(opt => {
        const optionEl = document.createElement("option");

        if (typeof opt === "string") {
            optionEl.value = opt;
            optionEl.textContent = opt;
        } else {
            optionEl.value = opt.label;
            optionEl.textContent = opt.label;
        }

        select.appendChild(optionEl);
    });
    
    let subSelect;
    // Sub-dropdown (only added if needed)
    if (hasSublists) {
        subSelect = document.createElement("select");
        subSelect.classList.add('sub-select');
        subSelect.style.display = "none"; // hidden unless relevant
        function updateSubOptions(selectedValue) {
            // Clear old sub-options
            subSelect.innerHTML = "";

            // Find matching option object
            const chosen = options.find(opt =>
                typeof opt === "object" && opt.label === selectedValue
            );

            if (chosen && chosen.sub && chosen.sub.length > 0) {
                chosen.sub.forEach(subOpt => {
                    const subOptionEl = document.createElement("option");
                    subOptionEl.value = subOpt;
                    subOptionEl.textContent = subOpt;
                    subSelect.appendChild(subOptionEl);
                });
                subSelect.style.display = "";
            } else {
                subSelect.style.display = "none";
            }
        }

        // Initialize sub-options for default
        updateSubOptions(options[0].label);

        // Watch main select for changes
        select.addEventListener("change", () => {
            updateSubOptions(select.value);
        });
    };

    // Create number input
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = placeholder;

    // Create remove button
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "✖";
    removeBtn.addEventListener("click", () => container.removeChild(row));

    // Build row
    row.appendChild(select);
    if (subSelect) row.appendChild(subSelect);
    row.appendChild(input);
    row.appendChild(removeBtn);
    container.appendChild(row);
};