// Võrdlusoperaatorid
console.log(5 === 5);   // true   range vordsus
console.log(5 !== 3);   // true   ei ole vordne
console.log(5 > 3);     // true
console.log(5 < 3);     // false
console.log(5 >= 5);    // true
console.log(3 <= 2);    // false

// Miks eelistada === mitte == ?
console.log("5" == 5);  // true  – == teisendab tyybid ise
console.log("5" === 5); // false – === kontrollib ka tyypi
console.log(0 == "");   // true  – idk mida siin oelda

// Loogikaoperaatorid
console.log(true && false); // false – JA: molemad peavad olema tõesed
console.log(true || false); // true  – VÕI: piisab yhest
console.log(!true);         // false – EI: poorab vastupidiseks

// Truthy ja falsy vaartused
// Falsy: false, 0, "", null, undefined, NaN
console.log(Boolean(""));        // false
console.log(Boolean(0));         // false
console.log(Boolean(null));      // false
console.log(Boolean(undefined)); // false
console.log(Boolean("tere"));    // true
console.log(Boolean([]));        // true

// vanuse ja sisselogimise kontroll
const vanus = 17;
const onSisseLoginud = true;

if (!onSisseLoginud) {
  console.log("Palun logi sisse.");
} else if (vanus >= 18) {
  console.log("Tere tulemast! Sul on täielik ligipääs.");
} else {
  console.log("Tere! Osa sisust on sulle piiratud.");
}

// Ternaarne operaator: tingimus ? väärtusA : väärtusB
const staatus = vanus >= 18 ? "täisealine" : "alaealine";
console.log(`Kasutaja on ${staatus}.`); // Kasutaja on alaealine.