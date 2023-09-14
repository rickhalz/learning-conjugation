const FrenchVerbs = require("french-verbs");
const Lefff = require("french-verbs-lefff/dist/conjugations.json");

console.log("je " + FrenchVerbs.getConjugation(Lefff, "finir", "PRESENT", 0));
