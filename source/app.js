// Requisitando o arquivo parser.js
var Parser = require('./modules/parser');
var ReadFile = require('./modules/readFile');

// Carregandoo módulo fs (filesystem)
var fs = require('fs');
var messageFinal;

var message = ReadFile.fileToBeRead('OSs.txt', function(message){ 
    var baseDir = 'C:/repositories/jonatas-projects/node-read-file/';

    fs.writeFile(baseDir + "copy-and-email.txt", message, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log('\x1b[36m\n\nThe file "copy-and-email.txt" was saved!\nCopy and paste the content and email it!\x1b[0m');
	}); 
});
