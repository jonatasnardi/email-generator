var fs = require('fs');

function historic(callback) {
	fs.readFile(__dirname + '/../historic.txt', function (err, data) {
		if (err) throw err;
		var text = data.toString();
		text = text.split('\n');
		callback(text);
	});
};

var Parser = function () {

};

Parser.prototype.receiver = function(linesCount) {
	
	return linesCount;
}

Parser.prototype.parse = function(text) {
	var results = {};


	var lines = text;

	var count = text.split('\n');
	var i = 0, j = 0;

	var oss = new Array();

	for (var y=0; y < count.length; y++) {
		var currentLine = count[y];
		currentLine = currentLine.replace(/\s/g, '');
		if(currentLine == "") {
			i += 1;
		}else {
			if(i == 0) {
				oss.push(currentLine);	
			}else{
				for(var x = 0; x < oss.length; x++) {
					if(currentLine == oss[x]) {
						j += 1;
					}
				}
				if (j == 0) {
					oss.push(currentLine);
				}
				j = 0;
			}
			i += 1;
		}
	}

	var linesCount = [oss, oss.length];

	var self = this;

	historic(function(result) {
	    for (var i = 0; i < oss.length; i++) {
	    	for (var j = 0; j < result.length; j++) {
	    		if(oss[i] == result[j]) {	    			
	    			if (i > -1) {
					    oss.splice(i, 1);
					}
	    		}
	    	}
	    }
	    linesCount = [oss, oss.length];	    
	    
	    self.receiver(linesCount);

	});
	// console.log(oss);
	
	return linesCount;
	
}




module.exports = Parser;