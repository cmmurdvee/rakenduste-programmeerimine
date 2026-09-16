// Funktsiooniavaldis (function expression)
const korruta = function (a, b) {
  return a * b;
};
console.log(korruta(3, 4)); // 12

// Noolfunktsioon (arrow function)
const korrutaNool = (a, b) => {
  return a * b;
};
console.log(korrutaNool(3, 4)); // 12

// Kaudne implicit vs otsene explicit return
const kahekordne1 = x => x * 2;               // kaudne – loogelisi sulge pole
const kahekordne2 = x => { return x * 2; };   // otsene – loogelised sulud + return
console.log(kahekordne1(5)); // 10
console.log(kahekordne2(5)); // 10

// loogelised sulud ilma return-ita
const vale = x => { x * 2; };
console.log(vale(5)); // undefined

// Callback – funktsioon, mis antakse teisele funktsioonile argumendiks (AI aitas)
function teeMidagi(arv, callback) {
  return callback(arv);
}
console.log(teeMidagi(7, kahekordne1)); // 14

// Näide: callback .forEach() meetodiga
const puuviljad = ["õun", "banaan", "kirss"];
puuviljad.forEach((vili, indeks) => {
  console.log(`${indeks + 1}. ${vili}`);
});
