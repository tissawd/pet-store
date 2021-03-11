var fs = require('fs');
var fetch = require('node-fetch');
const { resolve } = require('path');

var getPetsAsync = function(status){
    var filter = status || 'available';
    var pets = fetch(`https://petstore.swagger.io/v2/pet/findByStatus?status=${filter}`)
    .then(response => response.json())
    .then(data => data.map(x => x.name))
    return pets;
}

getPetsAsync('available').then(result => fs.writeFile('available-pets.txt', result.join('\n'), function(err){
    if(err) return console.log(err);
}));


getPetsAsync('pending').then(result => fs.writeFile('pending-pets.txt', result.join('\n'), function(err){
  if(err) return console.log(err);
}));


let pathToNewPet = process.argv[2];

if (pathToNewPet){
  fs.readFile(pathToNewPet, 'utf8', (err, data) => {
    if (err){
      return err;
    } else{
      addNewPetToStore(data);
    }
  })
}


 function addNewPetToStore(pet){
   fetch("https://petstore.swagger.io/v2/pet", {
     method: "POST",
     body: pet
   }).then(response => {
     console.log(response);
     console.log('Pet added');
   })
}


