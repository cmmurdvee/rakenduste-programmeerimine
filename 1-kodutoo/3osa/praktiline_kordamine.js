const users = [
  { id: 1, name: "Mari", age: 22, active: true },
  { id: 2, name: "Jüri", age: 17, active: false },
  { id: 3, name: "Kati", age: 31, active: true },
  { id: 4, name: "Martin", age: 19, active: false },
  { id: 5, name: "Laura", age: 26, active: true },
];

// 3.1. Kuva console.log() abil kõikide kasutajate nimed.
console.log(" 3.1 ");
for (const user of users) {
  console.log(user.name);
}

// 3.2. Kasuta .filter() meetodit, et leida kõik aktiivsed kasutajad.
console.log(" 3.2 ");
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);

// 3.3. VKasuta .filter() meetodit, et leida kõik vähemalt 18-aastased kasutajad.
console.log(" 3.3 ");
const adults = users.filter(user => user.age >= 18);
console.log(adults);

// 3.4. Kasuta .map() meetodit, et luua uus massiiv, mis sisaldab ainult kasutajate nimesid.
console.log(" 3.4 ");
const names = users.map(user => user.name);
console.log(names);

// 3.5. Kasuta .find() meetodit, et leida kasutaja, kelle id on 3.
console.log(" 3.5 ");
const userWithId3 = users.find(user => user.id === 3);
console.log(userWithId3);

// 3.6. Kirjuta tavaline funktsioon getUserStatus(user), mis tagastab aktiivne ja mitteaktiivne
console.log(" 3.6 ");
function getUserStatus(user) {
  if (user.active) {
    return "Aktiivne";
  }
  return "Mitteaktiivne";
}
console.log(getUserStatus(users[0])); // Aktiivne
console.log(getUserStatus(users[1])); // Mitteaktiivne

// 3.7. Arrow function ja template literal
console.log(" 3.7 ");
const getGreeting = user => `Tere, ${user.name}! Sa oled ${user.age} aastat vana.`;
console.log(getGreeting(users[0])); // Tere, Mari! Sa oled 22 aastat vana.

// 3.8. Kasuta destructuring'ut, et võtta ühe kasutaja objektist välja name ja age.
console.log(" 3.8 ");
const { name, age } = users[0];
console.log(name, age); // Mari 22

// 3.9. Kasuta spread-süntaksit, et luua uus kasutaja, kelle andmed on...
console.log(" 3.9 ");
const newUser = { id: 6, name: "Karl", age: 24, active: true };
const updatedUsers = [...users, newUser];
console.log(updatedUsers.length); // 6
console.log(users.length);        // 5 – esialgne massiiv ei muutunud

// 3.10. Lisa ühele kasutajale valikuline omadus address
console.log(" 3.10 ");
users[0].address = { city: "Tallinn" }; // lisame Marile aadressi

console.log(users[0].address?.city ?? "Linn puudub"); // Tallinn
console.log(users[1].address?.city ?? "Linn puudub"); // Linn puudub

// 3.11. forEach
console.log(" 3.11 ");
users.forEach(user => {
  console.log(`${user.name} – ${getUserStatus(user)}`);
});

// 3.12. Käi kasutajad läbi .forEach() abil ja kuva iga kasutaja kohta
console.log(" 3.12 ");
users.sort((a, b) => a.age - b.age);
console.log(users);