const tekst = "Monk";              // string
const arv = 123;                    // number
const imTired = true;               // boolean
const kasutaja = { nimi: "Obama" }; // object
const tarkvara = ["word", "excel"]; // array

// typeof
console.log(typeof tekst);      // "string" 
console.log(typeof arv);        // "number"
console.log(typeof imTired);    // "boolean"
console.log(typeof kasutaja);   // "object"
console.log(typeof tarkvara);   // "object" - quirk

// null vs undefined
let maaramata;               // v22rtus puudub
const tyhi = null;           // meelega v22rtus puudub
console.log(maaramata);        // undefined
console.log(tyhi);             // null
console.log(typeof maaramata); // "undefined"
console.log(typeof tyhi);      // "object" - quirk

// "5" vs 5
console.log(typeof "5");   // "string"
console.log(typeof 5);     // "number"
console.log("5" === 5);    // false

// kas v22rtus on massiiv?
console.log(Array.isArray(tarkvara)); // true
console.log(Array.isArray(kasutaja));  // false