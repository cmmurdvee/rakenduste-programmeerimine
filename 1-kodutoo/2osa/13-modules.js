// Vaikeimport – nime võib ise valida, loogelisi sulge pole
import liida from "./13-moodulid-helper.js";

// Nimeline import – nimi peab ühtima ekspordiga, loogelised sulud
import { tervita, PI } from "./13-moodulid-helper.js";

console.log(tervita("Mari")); // Tere, Mari!
console.log(PI);              // 3.14159
console.log(liida(2, 3));     // 5

//svigu kirjas AI
// Levinud vead:
// import { liida } from "./13-moodulid-helper.js";  // VIGA – liida on default export
// import tervita from "./13-moodulid-helper.js";    // VIGA – tervita on named export
// import { tervita } from "./13-moodulid-helper";   // VIGA – Node vajab .js laiendit
