const path = "../tabs/";
const tabNames = ["basic", "advanced", "civSettings", "names", "modSettings"];
const latestGameVer = "0.9.7";
const tagsList = ["goblin", "human", "animal", "magic", "undead", "player", "dwarf", "elf", "owlman", "alive", "troglodyte", "troll", "orc", "fishman", "demon", "satyr", "centaur", "mutant", "insectoid", "dragon", "skeleton", "ghoul", "zombie", "vampire", "reptilion", "halfling", "greenskin", "lich", "rasimi", "gnome", "kavian", "god", "mechanical", "angelic", "djinn", "bone wraith", "ursan", "gnoll", "uncontrollable"];
const mainStats = ["Dexterity", "Endurance", "Intelligence", "Strength", "Willpower"];
const subStats = ["Health Regen", "Carry Weight", "Magic Power", "Movement Speed"];
const crimesList = ["Assault","Forbidden Action","Murder","Pickpocket","Robbery","Stealing","Vandalism","Gather Souls"];
const actionsMap = {
  "Cut Wood": "1",
  "Scavenge": "3",
  "Catch Fish": "4",
  "Mine": "5",
  "Harvest": "6",
  "Thresh": "7",
  "Cook": "9",
  "Gather": "10",
  "Milk": "11",
  "Dig": "12",
  "Loot": "15",
  "Start a Fire": "17",
  "Pour Water": "19",
  "Pickpocket": "core_2_pickpocket",
  "Rob": "core_2_rob",
  "Shear": "core_2_shear",
  "Demolish": "core_2_deconstruct",
  "Plant": "core_2_plant",
  "Woodbend": "core_2_woodbend",
  "Catch Animal": "core_2_catch_animal",
  "Water Plants": "core_2_water_plants",
  "Become a Necrotyrant": "core_2_become_necrotyrant",
  "Carve": "core_2_carve",
  "Tame": "core_2_tame",
  "Control Undead": "core_2_control_undead"
};
// Constructor for defaultRaceData
class RaceData {
    constructor() {
        this.ages = {
            adult: 50,
            child: 14,
            elder: 70
        };
        this.base_entities = {
            adult: "694",
            child: "2000",
            leader: "2203",
            recruit: "691",
            rebel: "core_2_Human_Rebel"
        };
        this.crimes = {};
        this.description = "Versatile and adaptable creatures...";
        this.forbidden_actions = [];
        this.id = "0";
        this.image = 4;
        this.items = [];
        this.name = "Human";
        this.names = {
            female: "npc/names/human_female.txt",
            male: "npc/names/human_male.txt",
            settlements: "npc/settlements/human_settlements.json",
            states: "npc/states/human.json",
            surnames: "npc/surnames/human.json"
        };
        this.orphan_surname = "Grass";
        this.passives = [];
        this.playable = true;
        this.recipes = [];
        this.settlement = {
            building_sign: "256",
            center_id: "40",
            start_spawn_rate: 1.0,
            caravan_image: 268,
            battle_light_source: "424",
            war_causes: ["conquest", "ride_for_wealth"]
        };
        this.statistics = {};
        this.tags = [];
        this.trade_restrictions = [];
        this.courting = {
            female: ["core_2_Rose_Flower", "2156"],
            male: ["775", "78"]
        };
    }
}

// Constructor for defaultModData
class ModData {
    constructor() {
        this.author = "Race Mod Generator";
        this.description = "Template for your new mod! - Describe Me!";
        this.game_required = latestGameVer;
        this.icon = "S.png";
        this.mods_required = ["core_2"];
        this.name = "Race Mod Generator Race Mod";
        this.thumbnail = "thumbnail2.png";
        this.version = "0.1.0";
        this.mod_id = "race_mod_generator";
    }
}

const passivesMap = {
    "Counter Attack": "core_2_counter_attack",
    "Bloodlust": "core_2_bloodlust",
    "Parry Mastery": "core_2_parry_mastery",
    "Three Swords Style": "core_2_three_swords_style",
    "Came Prepared": "core_2_area_maps",
    "Points of Interest": "core_2_points_of_interest",
    "Sleep Faster": "core_2_sleep_faster",
    "Lightfooted": "core_2_movement_no_stamina",
    "Resource Discovery": "core_2_resource_discovery",
    "Fall Immunity": "core_2_no_fall_damage",
    "Swift Movement": "core_2_swift_movement",
    "Dodge Basic": "core_2_dodge_basic",
    "Dodge Advanced": "core_2_dodge_advanced",
    "Quick Block": "core_2_quick_block",
    "Protected Flanks": "core_2_protected_flanks",
    "Sixth Sense": "core_2_sight_behind",
    "Risky Retaliation": "core_2_risky_retaliation",
    "Mule": "core_2_carry_capacity",
    "Fit": "core_2_health_bonus",
    "Workhorse": "core_2_max_stamina",
    "Swift Hit": "core_2_attack_speed",
    "Speedy Recovery": "core_2_health_tick",
    "Light-Footed": "core_2_light_footed",
    "Strong Grip": "core_2_strong_grip",
    "Swift Woodcutting": "core_2_swift_woodcutting",
    "Knockback Immunity": "core_2_knockback_immune",
    "Lethal Renewal": "core_2_heal_on_kill",
    "Dual Wield 2-Handers": "core_2_2h_dual_wield",
    "Dueling Tactician": "core_2_dueling_tactician",
    "Stun Immunity": "core_2_stun_immune",
    "Pierce Armor": "core_2_pierce_armor",
    "Taking Advantage": "core_2_taking_advantage",
    "Torch": "core_2_torch",
    "Fire Starter": "core_2_fire_starter",
    "Reinvigorating Smell": "core_2_reinvigorating_smell",
    "Wildfire": "core_2_wildfire",
    "Hot Blood": "core_2_hot_blood",
    "Nose For Trouble": "core_2_nose_for_trouble",
    "Well Informed": "core_2_well_informed",
    "Salvage Chance Bonus": "core_2_salvage_bonus",
    "Food Everywhere": "core_2_food_everywhere",
    "Discover Everything": "core_2_discover_all_tiers",
    "Extra Loot": "core_2_extra_loot",
    "Infravision": "core_2_infravision",
    "Critical Hit": "core_2_critical_hit",
    "Critical Damage": "core_2_critical_damage",
    "Critical Hit From Dexterity": "core_2_critical_hit_from_dex",
    "Forgettable Face": "core_2_bounty_reduce",
    "Hide Identity": "core_2_hide_identity",
    "Extra Backpack Slots": "core_2_extra_backpack_slots",
    "Good Deals": "core_2_good_deals",
    "Disabled Consumption": "core_2_disable_consumption",
    "Good Harvest": "core_2_good_harvest",
    "Seed Extraction": "core_2_seed_extraction",
    "Quick Growth": "core_2_quick_growth",
    "Extra Food": "core_2_extra_food",
    "Opportunist": "core_2_opportunist",
    "Claw Fishing": "core_2_claw_fishing",
    "Bonus Dexterity": "core_2_bonus_dexterity",
    "Golem Companion": "core_2_companion_golem",
    "Companion I": "core_2_companion_1",
    "Companion II": "core_2_companion_2",
    "Companion III": "core_2_companion_3",
    "Extra Pockets": "core_2_extra_pockets",
    "Heavy Duty": "core_2_heavy_duty",
    "Rapid Retreat": "core_2_rapid_retreat",
    "First Aid": "core_2_first_aid",
    "Better Friends": "core_2_better_friends",
    "Iron Will": "core_2_iron_will",
    "Eagle Eye": "core_2_eagle_eye",
    "Light Walk": "core_2_light_walk",
    "Analyze Speed": "core_2_analyze_speed",
    "Superior Scavenger": "core_2_superior_scavenger",
    "Analyze Weakness": "core_2_analyze_weakness",
    "Animal Companion I": "core_2_animal_companion_1",
    "Animal Companion II": "core_2_animal_companion_2",
    "Trained Beasts": "core_2_trained_beasts",
    "Poison Immunity": "core_2_poison_immunity",
    "Thorny": "core_2_thorny",
    "Critical Thorns": "core_2_critical_thorns",
    "Overwhelming Nature": "core_2_surrounded_by_nature",
    "Shooting Thorns": "core_2_shooting_thorns",
    "Natural Death": "core_2_natural_death",
    "Rainy Day": "core_2_rainy_day",
    "Freeze": "core_2_freeze",
    "Cold Blood": "core_2_cold_blood",
    "Walk on Water": "core_2_walk_on_water",
    "Electricity": "core_2_electricity",
    "Static": "core_2_static",
    "Strong Throw": "core_2_strong_throw",
    "Conductive Aim": "core_2_conductive_aim",
    "Overload": "core_2_overload",
    "Static Shock": "core_2_static_shock",
    "Lightning Reflexes": "core_2_lightning_reflexes",
    "Electric Speed": "core_2_electric_speed",
    "Non-Conductive": "core_2_non_conductive",
    "Energy Steal": "core_2_energy_steal",
    "Charged Precision": "core_2_charged_precision",
    "Lightning Strike": "core_2_lightning_strike",
    "Expert Throw": "core_2_expert_throw",
    "Taste for Souls": "core_2_taste_for_souls",
    "Soul Deposits": "core_2_soul_deposit",
    "Companion": "core_2_companion_undead",
    "Harness Power": "core_2_harness_power",
    "Food Sabotage": "core_2_food_sabotage",
    "Raise Undead": "core_2_raise_undead",
    "Raise Bone Wraith": "core_2_raise_bone_wraith",
    "Better Deals (Usable)": "core_2_better_deal_usable",
    "Lucky Crafting": "core_2_lucky_crafting",
    "Strong Drink": "core_2_strong_drink",
    "Blessed Knuckles": "core_2_blessed_knuckles",
    "Divine Fury": "core_2_divine_fury",
    "Purify the Damned": "core_2_purify_damned",
    "Divine Speed": "core_2_divine_speed",
    "Unyielding Spirit": "core_2_unyielding_spirit",
    "Incorruptible": "core_2_incorruptible"
};