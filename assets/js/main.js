// EVENT LISTENERS
	// init
	document.addEventListener('DOMContentLoaded', updatePlaceholders);

	// dynamic updates
	document.getElementById('raceName').addEventListener('input', updatePlaceholders);
	document.getElementById('modID').addEventListener('input', updatePlaceholders);

	// buttons
	document.getElementById('calcAgesBtn').addEventListener('click', calculateAges);
	document.getElementById('addStatBtn').addEventListener('click', () => addOptionRow(statsContainerObject));
	document.getElementById('addCrimeBtn').addEventListener('click', () => addOptionRow(crimesContainerObject));
	document.getElementById('generateFilesBtn').addEventListener('click', generateFiles);

	// tooltips
	document.querySelectorAll('.tooltip').forEach(tooltip => {
		tooltip.addEventListener('mouseenter', () => adjustTooltipPosition(tooltip));
	});

	// tab swtiching
	document.querySelectorAll('.tab-btn').forEach(tab => tab.addEventListener('click', handleTabSwitch));

// FUNCTIONS
function handleTabSwitch(event) {
	const tabs = document.querySelectorAll('.tab-btn');
	const tab = event.currentTarget;
	tabs.forEach(t => {
        t.classList.remove('active')
        document.querySelectorAll(t.dataset.tab).forEach(e => e.classList.remove('active'))
    });
	tab.classList.add('active');
	document.querySelectorAll(tab.dataset.tab).forEach(el => el.classList.add('active'));
};

// Update dynamic placeholders
function updatePlaceholders() {
	const raceNameInput = document.getElementById('raceName');
	const raceIDInput = document.getElementById('raceID');
	const modIDInput = document.getElementById('modID');
	let placeholderModID = "race_mod_generator";
	let placeholderRaceID = "human";
	if (raceNameInput.value) placeholderRaceID = strID(raceNameInput.value);
	if (modIDInput.value) placeholderModID = strID(modIDInput.value);
	let placeholder = `${placeholderModID}_${placeholderRaceID}`;
	raceIDInput.placeholder = placeholder;
};

// Age Calculation
function calculateAges() {
    const avg = parseFloat(document.getElementById('avgLifespan').value);
	if (isNaN(avg) || avg <= 0) {
        alert("Please enter a valid positive number for average lifespan.");
		return;
	}
	const child = Math.round(avg * 0.18);
	const adult = Math.round(avg * 0.62);
	const elder = Math.round(avg-10);

	document.getElementById('childAge').value = child;
	document.getElementById('adultAge').value = adult;
	document.getElementById('elderAge').value = elder;
};

// Tooltip Logic ~ Currently doesn't work fully
function adjustTooltipPosition(tooltip) {
    const tip = tooltip.querySelector('.tooltip-text');
	if (tip.id === "helpTip") return;
    tip.style.left = '';
    tip.style.right = '';
    tip.style.transform = 'translateX(-50%)';
	
    const rect = tip.getBoundingClientRect();
	const buffer = 4;
	let translateX = -50;
	
    if (rect.left < buffer) {
		const overshoot = buffer - rect.left;
		const shiftPercent = Math.round((overshoot/rect.width)*100);
		translateX = -(50 - shiftPercent);
        tip.style.left = `${buffer}px`;
		tip.style.right = 'auto';
        tip.style.transform = `translateX(${translateX}%)`;
    } else if (rect.right > window.innerWidth - buffer) {
		const overshoot = rect.right - (window.innerWidth - buffer);
		const shiftPercent = Math.round((overshoot/rect.width)*100);
		translateX = -(50 + shiftPercent);
		tip.style.left = 'auto';
        tip.style.right = `${buffer}px`;
        tip.style.transform = `translateX(${translateX}%)`;
    }
};

function generateFiles() {
	// Parse Inputs
	const inputData = parseInputs();

	// Convert to JSON format
	const characterJson = JSON.stringify(inputData.raceData, null, 2);
	const modJson = JSON.stringify(inputData.modData, null, 2);
	
	// Output the contents character.json to output console field
	document.getElementById('outputCharacter').textContent = characterJson;
	document.getElementById('outputMod').textContent = modJson;

	// Delete this when name inputs are added
	const tempNamesJson = JSON.stringify({prefixes: ["prefix"], suffixes: ["-suffix"]});

	// ZIP packaging
	const zip = new JSZip();
	zip.file("character.json", characterJson);
	zip.file("mod.json", modJson)
	// Placeholder name files
	zip.file(`npc/names/${inputData.raceData.races[0].id}_female.txt`, "Enter each name on a new line");
	zip.file(`npc/names/${inputData.raceData.races[0].id}_male.txt`, "Enter each name on a new line");
	zip.file(`npc/settlements/${inputData.raceData.races[0].id}_settlements.json`, tempNamesJson);
	zip.file(`npc/states/${inputData.raceData.races[0].id}.json`, tempNamesJson);
	zip.file(`npc/surnames/${inputData.raceData.races[0].id}.json`, tempNamesJson);

	// Initiate ZIP Download
	zip.generateAsync({ type: "blob" }).then(content => {
		const url = URL.createObjectURL(content);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${inputData.raceData.races[0].id}_race_mod.zip`;
		a.click();
		URL.revokeObjectURL(url);
	});
};