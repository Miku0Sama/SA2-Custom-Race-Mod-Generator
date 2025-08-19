function parseInputs() {
    // Initialize Input Objects
	const inputRaceData = new RaceData();
	const inputModData = new ModData();

    // character.json values
    // Ages
    inputRaceData.ages = {
        adult: parseInt(document.getElementById('adultAge').value),
        child: parseInt(document.getElementById('childAge').value),
        elder: parseInt(document.getElementById('elderAge').value)
    };
    // Base Entities
    inputRaceData.base_entities = {
        adult: document.getElementById('adultEntity').value,
        child: document.getElementById('childEntity').value,
        leader: document.getElementById('leaderEntity').value,
        recruit: document.getElementById('recruitEntity').value,
        rebel: document.getElementById('rebelEntity').value
    };
    // Crimes
    document.querySelectorAll("#crimesContainer > div").forEach(row => {
        let key = row.querySelector("select").value;
        const val = parseInt(row.querySelector("input").value);
        if (key === "Forbidden Action") key = "forbidden";
        if (!isNaN(val)) inputRaceData.crimes[strID(key)] = val;
    });
    // Race Description
	let description = document.getElementById('raceDescription').value;
    // Forbidden Actions
    const forbiddenActionNames = forbiddenActionsField.getTags();
    forbiddenActionNames.forEach(forbiddenAction => {
        inputRaceData.forbidden_actions.push(actionsMap[forbiddenAction]);
    });
    // RaceID
    inputRaceData.id = strID(document.getElementById('raceID').value);
    // Starting Items
    inputRaceData.items = startingItemsField.getTags();
    // Race Name
    inputRaceData.name = document.getElementById('raceName').value;
    // Orphan Surname
    inputRaceData.orphan_surname = document.getElementById('orphanSurname').value;
    // Passives
    const passiveNames = passivesField.getTags();
    passiveNames.forEach(passive => {
        inputRaceData.passives.push(passivesMap[passive]);
    });
    // Playable
    inputRaceData.playable = document.getElementById('playable').checked;
    // Starting Recipes
    inputRaceData.recipes = startingRecipesField.getTags();
    // Stat bonuses
	let bonuses = "";
	document.querySelectorAll("#statsContainer > div").forEach(row => {
        const key = row.querySelector('.sub-select').value;
		const val = parseInt(row.querySelector("input").value);
		if (!isNaN(val) && val !== 0) {
            let bonus = `${val}`;
			if (val > 0) bonus = `+${val}`;
			bonuses = `${bonuses}, ${key} ${bonus}`;
			inputRaceData.statistics[strID(key)] = val;
		}
	});
	if (Object.keys(inputRaceData.statistics) !== 0) {
		bonuses = `\n[color=244,247,118,255]${bonuses}[/color]`;
	};
    // Tags
    const tagNames = tagsField.getTags();
    tagNames.forEach(tag => {
        inputRaceData.tags.push(`${tagsList.indexOf(tag)}`);
    });
	
	// mod.json values
    // Mod Author
	inputModData.author = document.getElementById('author').value;
    // Mod Description
    inputModData.description = document.getElementById('modDescription').value;
    // Mod Icon
    inputModData.icon = document.getElementById('modIcon').value;
    // Required Mods
    inputModData.mods_required = ["core_2"].concat(document.getElementById('requiredMods').value);
    // Mod Name
	inputModData.name = document.getElementById('modName').value;
    // ModID
	inputModData.mod_id = document.getElementById('modID').value;
    // Mod Thumbnail
    inputModData.thumbnail = document.getElementById('modThumbnail').value;
    // Mod Version
    inputModData.version = document.getElementById('modVersion').value;
	
	// Generate custom defaults
    if (!inputRaceData.id) inputRaceData.id = strID(inputRaceData.name);
    if (!inputRaceData.id) inputRaceData.id = "human"
    if (!description) description = `${inputRaceData.name || "Human"}s are versitile and adaptable creatures.`
	description = `${description}\n\n${inputRaceData.name ||"Human"}s live around [color=244,247,118,255]::elder_age[/color] years.`;
	description = `${description}${bonuses}`;
	inputRaceData.description = description;
	if (!inputModData.mod_id) inputModData.mod_id = strID(inputModData.name);
	if (!inputModData.mod_id) inputModData.mod_id = `race_mod_generator_${strID(window.crypto.randomUUID().replace(/-+/g, '_'))}_i_warned_you`;
    inputRaceData.id = `${(strID(inputModData.mod_id) !== "") ? `${inputModData.mod_id}_` : ""}${inputRaceData.id}`
    if (!inputModData.description) inputModData.description = `This mod adds the ${playable ? "" : "non-"}playable race ${inputRaceData.name || "The creator forgot to name their race"} to the game.`;

    // Name File Paths
    inputRaceData.names = {
        female: `npc/names/${inputRaceData.id}_female.txt`,
        male: `npc/names/${inputRaceData.id}_male.txt`,
        settlements: `npc/settlements/${inputRaceData.id}_settlements.json`,
        states: `npc/states/${inputRaceData.id}.json`,
        surnames: `npc/surnames/${inputRaceData.id}.json`
    }

    // Watermark...ish
    inputModData.description += `\n\nBuilt using Mikus Custom Race Mod Generator https://miku0sama.github.io/SA2-Custom-Race-Mod-Generator/`;

    const inputData = {raceData: {races: [inputRaceData]}, modData: inputModData};
    return inputData;
};