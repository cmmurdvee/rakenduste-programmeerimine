//let
let vanus;
vanus = 5;
vanus = 10;
console.log("Vanus:", vanus);

//const
const nimi = "Chris"
//nimi = "Martin"; //TypeError
console.log("Minu nimi on", nimi);

//var
if (true) {
  let plokis = "n2ha plokkis";
  var plokistValjas = "n2ha ka plokist v2lja";
  console.log(plokis);
}
console.log(plokistValjas); 
//console.log(plokis); //ReferenceError

//let tuleb kasutada siis, kui v22rtus muutub, const kui ei muutu
let loendur = 0;
//const loendur = 0; //TypeError
loendur = loendur + 1;
console.log("Loendur:", loendur);