let modInfo = {
	name: "The Exponent Tree",
	id: "mymod",
	author: "RTLF2024 (Remastered The Legendary Flower2024)",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1 Alpha",
	name: "Alpha Release",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.1 Alpha</h3><br>
		- Added Exponent coins and Orbs <br>
		`

let winText = `This game is currently unfinished and the endgame may change anytime soon but congrats for beating the game!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)

var alwaysKeepTheseVariables = ["primeMiles", "auto", "autoExt", "autoBld", "autoW", "autoGhost", "autoSE", "autoNN", "keepPosNeg", "distrAll", "spellInput", "pseudoUpgs", "maxToggle"]
var doNotCallTheseFunctionsEveryTick = ["doReset", "buy", "buyMax", "onPurchase", "blowUpEverything", "castAllSpells", "completeInBulk", "startMastery", "completeMastery"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("p", 11)) gain = gain.times(upgradeEffect("p", 11));
	if (hasUpgrade("p", 12)) gain = gain.times(upgradeEffect("p", 12));
	if (hasUpgrade('p', 14)) gain = gain.times(2.5)
	
	if (player.o.unlocked) gain = gain.times(tmp.o.buyables[12].effect.first);
	if (player.o.unlocked) gain = gain.times(tmp.o.effect);
	if (hasUpgrade("o", 14)) gain = gain.times(upgradeEffect("o", 14));
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [`<span>Reach 12 orbs to beat the game!</span>`,
]

// Determines when the game "ends"
function isEndgame() {
	return player.o.points.gte(new Decimal(12))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}