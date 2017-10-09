const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

//dirección para parciales como footer y header
hbs.registerPartials(__dirname + '/views/partials');
//setear el view engine al que usaremos; hbs, ejs, etc.
app.set('view engine', 'hbs');
//lugar de donde se cargara contenido dinamico, "__dirname" = directorio de la app
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log(error);
		}
	});
	next();
});

app.use((rew, res, next) => {
	res.render('maintenance.hbs');
});

app.get('/', (request, response) => {
	//response.send('<h1>hello express<h1>');
	response.send({
		name: 'marconi',
		arreg: ['ea','ea2']
	});

});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		currentYear: new Date().getFullYear()
	});
});

app.listen(3000, () => {
	console.log("Server on");
});