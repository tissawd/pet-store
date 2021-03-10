var fs = require('fs');
var fetch = require('node-fetch');

var getAvailPetsAsync = function(){
    var pets = fetch('https://petstore.swagger.io/v2/pet/findByStatus?status=available')
    .then(response => response.json())
    .then(data => data.map(x => x.name))
    return pets;
}

getAvailPetsAsync().then(result => fs.writeFile('available-pets.txt', result.join('\n'), function(err){
    if(err) return console.log(err);
}));


