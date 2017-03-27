var Parser = require('./parser');
var fs = require('fs');
var rn = require('./randomNumber');


exports.fileToBeRead = function(file, callback) {

	fs.readFile(file, function ( err, logData ) {
		
		if ( err ) throw err;

		var text = logData.toString();

		var parser = new Parser();

		var greeting = greetingClient(),
			countOs = parser.parse(text)[1],
			phrase,
			bye,
			opt1 = 'Por gentileza, poderia lançar estas ' + countOs + ' tasks para preenchimento de meu timesheet?',
			opt2 = 'Poderia lançar estas ' + countOs + ' tasks para preenchimento de meu timesheet, por favor?',
			opt3 = 'Lança estas ' + countOs + ' tasks em meu timesheet por favor?',
			frw1 = "[]'s,",
			frw2 = 'Abs,',
			frw3 = 'Muito obrigado!',
			r = rn.randomIntFromInterval(1,3),
			r2 = rn.randomIntFromInterval(4,6),			
			br = "\r\n\n",					
			ossString = parser.parse(text)[0].toString().replace(/\,/g,'\n'); 

			switch (r) {
				case 1:	phrase = opt1; break;
				case 2:	phrase = opt2; break;
				case 3:	phrase = opt3; break;
				default: break;
			}

			switch (r2) {
				case 4:	bye = frw1; break;
				case 5:	bye = frw2; break;
				case 6:	bye = frw3; break;
				default: break;
			}

			var message =   br + phrase + '\r\n\n',
				farewell = br + bye;

		var finalMessage =  greeting + message + ossString + farewell;
		return callback(finalMessage);
	});

	
};

function greetingClient() {
    var greeting;
    var dt = new Date();
    var hour = dt.getHours();
    var minutes = dt.getMinutes();

    if (hour < 12) {
        greeting = 'Bom dia,';
    }else if (hour >= 12 && hour < 18) {
        greeting = 'Boa tarde,';
    }else{
        greeting = 'Boa noite,';
    }
    return greeting;
}