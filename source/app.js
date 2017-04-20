var Parser = require('./modules/parser');
var ReadFile = require('./modules/readFile');
var fs = require('fs');
var nodemailer = require('nodemailer'); // NODE 7.5

var messageFinal;

var message = ReadFile.fileToBeRead('OSs.txt', function(message){ 
    fs.writeFile(__dirname + "/copy-and-email.txt", message, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log('\x1b[36m\n\nThe file "copy-and-email.txt" was saved!\nCopy and paste the content and email it!\x1b[0m');

	    var transport = nodemailer.createTransport({
			service: 'Gmail', 
			port: 587,
			auth: {
				user: 'joonatas97@gmail.com',
				pass: '222'
			}
		});

		message = message.replace(/(?:\r\n|\r|\n)/g, '<br />');

		var mailOptions = {
			from: "Jonatas Nardi <joonatas97@gmail.com>",
			to: "jose.rodrigues@wunderman.com",
			subject: "Solicitação de tasks",
			html:  '<p style="font-family: Calibri; font-size: 16px; color: #000000;">' + message + '</p>' +
					'<p style="font-family: Trebuchet MS; font-size: 16.5px; font-weight: bold; color: #000000;">Jonatas Nardi<br>' +
					'<span style="font-family: Trebuchet MS; font-size: 12px; font-weight: normal; color: #000000;">' +
					'Technology | Front End Developer<br>' +
					'Edifício Rochaverá Corporate Towers<br>' +
					'Av. das Nações Unidas, 14.171 - 23º andar - Torre C<br>' +
					'Cep: 04795-100 - São Paulo - Brazil<br>' +
					't: +55 11 5504-8768    m: +55 11 96595-6516<br>' +
					'</span>' +
					'<img src="http://i.imgur.com/XQkbijX.jpg">'
		}

		transport.sendMail(mailOptions, function(err, response) {
			if(err) {
				console.log('Erro ao enviar email: ' + err);
			}else{
				console.log('Email enviado com sucesso!');
			}
		});
	}); 


});

