const express = require('express');

const hbs = require('hbs');

const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine' , 'hbs');

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('upper',(text)=>{
	console.log(text);
	return text?text.toUpperCase():null;
});

app.use((req,res,next)=>{
	var time = new Date().toString();
	var log = time + req.url;
	fs.appendFile('server.log',log + '\n',(err)=>{
		if(err){
			console.log(err);
		}
	});
	console.log(log);
	next();
});

app.get('/',(req,res)=>{
	res.render('home.hbs');
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		welcomeMessage: 'welcome to my website'
	});
});

app.get('/bad',(req,res)=>{
	res.send({
		errorMessage:'Unable to process request'
	});
});

app.listen(port, () =>{
	console.log('Server is running');
});