Sorry but the readme isn't ready yet! It'll give more details on how the generator works as well as how to use it effectively.

Some important information regarding the current version:

The generator will create and reference the files related to NPC, names however these files are mostly blank. You can fill them manually if you would like to do so. Alternatively you can edit the character.json file and replace the "names" key with the following:
```json
"names": {
    "female": "npc/names/human_female.txt",
    "male": "npc/names/human_male.txt",
    "settlements": "npc/settlements/human_settlements.json",
    "states": "npc/states/human.json",
    "surnames": "npc/surnames/human.json"
}
```
This will cause NPCs of your race to use the Human names for random selection. It will also be what you character will use if leave your name blank when creating it or click the randomize button.

If you want to add custom portraits and images to your race/mod you'll need to make some additional changes. You can find out more in the official guide which can be found in your game folder at 'Soulsash 2/data/docs/index.html'.
