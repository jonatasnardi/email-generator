var Parser = require('./parser');
var fs = require('fs');
var rn = require('./randomNumber');

exports.fileToBeRead = function(file, callback) {

	fs.readFile(file, function (err, data) {
		// teste(data);
		if (err) throw err;
		var text = data.toString();
		var parser = new Parser();
		var greeting = greetingClient(),
			countOs = parser.parse(text)[1],
			phrase,
			bye,
			oss,			
			frw1 = "[]'s,",
			frw2 = 'Abs,',
			frw3 = 'Muito obrigado!',
			r = rn.randomIntFromInterval(1, 3),
			r2 = rn.randomIntFromInterval(4, 6),			
			br = "\r\n\n";

			var ossString = parser.parse(text)[0].toString().replace(/\,/g,'\n'); 

			fs.readFile(__dirname + '/../historic.txt', function (err, data) {
				if (err) throw err;
				var textHist = data.toString();
				textHist = textHist.split('\n');

				oss = parser.parse(text)[0];
				for (var i = 0; i < oss.length; i++) {
			    	for (var j = 0; j < textHist.length; j++) {
			    		if(oss[i] == textHist[j]) {	    			
			    			if (i > -1) {
							    oss.splice(i, 1);
							}
			    		}
			    	}
			    }

			    var opt1 = 'Por gentileza, poderia lançar estas ' + oss.length + ' tasks para preenchimento de meu timesheet?',
					opt2 = 'Poderia lançar estas ' + oss.length + ' tasks para preenchimento de meu timesheet, por favor?',
					opt3 = 'Lança estas ' + oss.length + ' tasks em meu timesheet por favor?';

				oss = oss.toString().replace(/\,/g,'\n');
			    
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

			
				var finalMessage =  greeting + message + oss + farewell;		
				fs.writeFile(__dirname + "/../historic.txt", ossString, function(err) { //update historic
				    if(err) {
				        return console.log(err);
				    }

				    console.log('\x1b[36m\n\nCopied to "historic.txt"\x1b[0m');
				}); 
			    
			    return callback(finalMessage);
			});
		
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