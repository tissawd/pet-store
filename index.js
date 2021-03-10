var fs = require('fs');
var fetch = require('node-fetch');

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