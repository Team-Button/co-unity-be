const fs = require('fs')
const faker = require("faker")
const bcrypt = require("bcryptjs")

let zipcodes = []


const first = faker.name.firstName()
const last = faker.name.lastName()

console.log(first, last)

for (let i=0; i < 20; i++){
  zipcodes.push({ id: i+1, zipcode: faker.address.zipCode()})
}

let users = [{
  id: 1,
  password: bcrypt.hashSync("testing1234", 10),
  email: "test@counity.com",
  name: "Test User",
  username: "counity-test",
  zipcode: zipcodes[Math.floor(Math.random() * zipcodes.length)].zipcode,
  avatar: "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650__340.png"
},
{
  id: 2,
  password: bcrypt.hashSync("testing00", 10),
  email: "mb@counity.com",
  name: "Mashima Button",
  username: "zimashima",
  zipcode: 55555,
  avatar: "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650__340.png"
},
{
  id: 3,
  password: bcrypt.hashSync("testing1", 10),
  email: "jg@counity.com",
  name: "Joshua Gray",
  username: "squashgray",
  zipcode: zipcodes[Math.floor(Math.random() * zipcodes.length)].zipcode,
  avatar: "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659650__340.png"
}]

for (let i=4; i < 104; i++){
    const first = faker.name.firstName()
    const last = faker.name.lastName()
    
    users.push({
        id: i,
        email: `${first}.${last}@counity.com`,
        username: `${first}${last}`,
        name: `${first} ${last}`,
        password: bcrypt.hashSync(`testing${first}${last}`, 10),
        avatar: faker.internet.avatar(),
        zipcode: zipcodes[Math.floor(Math.random() * zipcodes.length)].zipcode
      })
}

// Getting a random value from a JavaScript array 
// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array

fs.writeFile(`./data/zipcodes.json`, JSON.stringify(zipcodes), (err) => { if (err) console.log(err)})
fs.writeFile(`./data/users.json`, JSON.stringify(users), (err) => { if (err) console.log(err)})
