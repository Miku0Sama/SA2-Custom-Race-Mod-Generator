// TAB SWITCHING
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => tab.addEventListener('click', handleTabSwitch));

// SYNC FIELDS
const fields = ['modID', 'raceName', 'raceID', 'description', 'childAge', 'adultAge', 'elderAge', 'playable', 'statistics'];
fields.forEach(field => {
	['Simple', 'Advanced'].forEach(suffix => {
		const input = document.getElementById(field + suffix);
		const master = document.getElementById(field);
		if (input && master) input.addEventListener('input', syncField);
	});
});

const calcBtn = document.getElementById('calcAgesBtn');
calcBtn.addEventListener('click', calculateAges());
// BUTTON EVENT LISTENERS
document.getElementById('addStatBtn').addEventListener('click', addStatField);
document.getElementById('generateFilesBtn').addEventListener('click', generateFiles);

// INIT
document.addEventListener('DOMContentLoaded', initPlaceholders);

// FUNCTIONS
function handleTabSwitch(event) {
	const tab = event.currentTarget;
	tabs.forEach(t => t.classList.remove('active'));
	contents.forEach(c => c.classList.remove('active'));
	tab.classList.add('active');
	document.getElementById(tab.dataset.tab).classList.add('active');
}

function syncField(event) {
	const input = event.currentTarget;
	const master = document.getElementById(input.id.replace(/(Simple|Advanced)$/, ''));
	master.value = input.value;
}

function initPlaceholders() {
	const raceNameInput = document.getElementById('raceName');
	const raceIDInput = document.getElementById('raceID');
    const modIDInput = document.getElementById('modID');
    if (modIDInput.value) { /*do something*/ }
	raceNameInput.addEventListener('input', () => {
		raceIDInput.placeholder = raceNameInput.value.toLowerCase().replace(/\s+/g, '_');
	});
};

const statOptions = ["dexterity", "endurance", "intelligence", "strength", "willpower"];

function calculateAges() {
	const avg = parseFloat(document.getElementById('avgLifespan').value);
	if (isNaN(avg) || avg <= 0) {
		alert("Please enter a valid positive number for average lifespan.");
		return;
	}
	const child = Math.round(avg * 0.18);
	const adult = Math.round(avg * 0.62);
	const elder = Math.round(avg-10);

	// Update Simple tab readonly inputs
	document.getElementById('childAgeSimple').textContent = child;
	document.getElementById('adultAgeSimple').textContent = adult;
	document.getElementById('elderAgeSimple').textContent = elder;

	// ALSO update Advanced tab inputs to keep in sync
	document.getElementById('childAgeAdvanced').value = child;
	document.getElementById('adultAgeAdvanced').value = adult;
	document.getElementById('elderAgeAdvanced').value = elder;

	// Finally update the master data
	document.getElementById('childAge').value = child;
	document.getElementById('adultAge').value = adult;
	document.getElementById('elderAge').value = elder;
}

// Add a new stat row
function addStatField(statName = "", statValue = "") {
	const container = document.getElementById("statsContainer");
	const row = document.createElement("div");
	row.className = "statRow";

	const select = document.createElement("select");
	statOptions.forEach(opt => {
		const option = document.createElement("option");
		option.value = opt;
		option.textContent = opt;
		if (opt === statName) option.selected = true;
		select.appendChild(option);
	});

	const input = document.createElement("input");
	input.type = "number";
	input.placeholder = "Value";
	input.value = statValue;

	const removeBtn = document.createElement("button");
	removeBtn.type = "button";
	removeBtn.textContent = "✖";
	removeBtn.addEventListener('click', () => container.removeChild(row));

	row.appendChild(select);
	row.appendChild(input);
	row.appendChild(removeBtn);
	container.appendChild(row);
}

function generateFiles() {
	// Defaults
	const modID = document.getElementById('modID').value || "race_generator";
	const raceName = document.getElementById('raceName').value || "Human";
	const description = document.getElementById('description').value || "Versatile and adaptable creatures...";
	let rawRaceID = document.getElementById('raceID').value;
	if (!rawRaceID) rawRaceID = `${modID}_${raceName.toLowerCase()}`;
	const raceID = rawRaceID.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '');
	const playable = document.getElementById('playable').value === "true";
	const ages = {
		child: parseInt(document.getElementById('childAge').value) || 14,
		adult: parseInt(document.getElementById('adultAge').value) || 50,
		elder: parseInt(document.getElementById('elderAge').value) || 70,
	};

	// Stats
	let statistics = {};
	document.querySelectorAll("#statsContainer > div").forEach(row => {
		const key = row.querySelector("select").value;
		const val = parseInt(row.querySelector("input").value);
		if (!isNaN(val)) statistics[key] = val;
	});

	// Character.json
	const raceData = {
		races: [{
			ages,
			base_entities: {
				adult: "694",
				child: "2000",
				leader: "2203",
				recruit: "691",
				rebel: "core_2_Human_Rebel"
			},
			description,
			forbidden_actions: ["6","10"],
			id: raceID,
			image: 4,
			items: [],
			name: raceName,
			names: {
				female: `npc/names/${raceName.toLowerCase()}_female.txt`,
				male: `npc/names/${raceName.toLowerCase()}_male.txt`,
				settlements: `npc/settlements/${raceName.toLowerCase()}_settlements.json`,
				states: `npc/states/${raceName.toLowerCase()}.json`,
				surnames: `npc/surnames/${raceName.toLowerCase()}.json`
			},
			orphan_surname: "Grass",
			playable,
			recipes: [],
			settlement: {
				building_sign: "256",
				center_id: "40",
				start_spawn_rate: 1.0,
				caravan_image: 268,
				battle_light_source: "424",
				war_causes: ["conquest", "ride_for_wealth"]
			},
			statistics,
			tags: ["1"],
			courting: {
				female: ["core_2_Rose_Flower", "2156"],
				male: ["775", "78"]
			}
		}
		]
	};

	const jsonString = JSON.stringify(raceData, null, 2);
	document.getElementById('output').textContent = jsonString;

	// ZIP packaging
	const zip = new JSZip();
	zip.file("character.json", jsonString);
	// Placeholder name files
	zip.file(`npc/names/${raceName.toLowerCase()}_female.txt`, "Placeholder female names");
	zip.file(`npc/names/${raceName.toLowerCase()}_male.txt`, "Placeholder male names");
	zip.file(`npc/settlements/${raceName.toLowerCase()}_settlements.json`, "{}");
	zip.file(`npc/states/${raceName.toLowerCase()}.json`, "{}");
	zip.file(`npc/surnames/${raceName.toLowerCase()}.json`, "[]");

	zip.generateAsync({ type: "blob" }).then(content => {
		const url = URL.createObjectURL(content);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${raceName}_race_mod.zip`;
		a.click();
		URL.revokeObjectURL(url);
	});
}