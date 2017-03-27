// Construtor Parser


var Parser = function () {

};

// Analisa o texto especificado
Parser.prototype.parse = function (text) {
	
	var results = {};

	// Quebra o arquivo em linhas
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
	return linesCount;
};

// Exportando o construtor Parser neste módulo
module.exports = Parser;