var qs = require('querystring');
var http = require('http');
var fs = require('fs');

var usuarios = {};

function getPostRequest(req, action) {
	var body = '';

	req.on('data', function (data) {
		body += data;
		if (body.length > 1000000)
			req.connection.destroy();
	});

	req.on('end', function () {
		action(qs.parse(body));
	});
}

function listarUsuarios(res) {
	res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

	for (var key in usuarios)
		res.write(key + ": " + usuarios[key] + "</br>", "utf-8");

	res.end();
}

function cadastrarUsuarios(req, res) {
	if (req.method === 'POST') {
		getPostRequest(req, function (obj) {
			res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});

			if (usuarios[obj.usuario] === undefined) {
				usuarios[obj.usuario] = obj.senha;
				res.write("Usuário cadastrado com sucesso!", "utf-8");
			} else {
				res.write("Usuário já existe!", "utf-8");
			}

			res.end();
		});
	} else {
		res.write("Dados inválidos", "utf-8");
		res.end();
	}
}

function entrarNoPortal(req, res) {
	if (req.method === 'POST') {
		getPostRequest(req, function (obj) {
			res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
			if (obj.usuario != undefined && obj.senha != undefined && usuarios[obj.usuario] === obj.senha) {
				res.write("Usuário logado!", "utf-8");
			} else {
				res.write("Usuário ou senha inválidos!", "utf-8");
			}

			res.end();
		});
	} else {
		res.write("Dados inválidos", "utf-8");
		res.end();
	}
}

function carregarPagina(url, res) {
	fs.readFile(url, function(err, data) {
		res.writeHead(200, {'Content-Type': 'text/html', 'charset':'utf-8'});
		res.write(data);
		res.end();
	});
}

http.createServer(function (req, res) {
	var url = req.url;
	switch (url) {
		case './indexGeral.html':
		
		default:
			carregarPagina("indexGeral.html", res);
	}
}).listen(8080);

process.on('uncaughtException', function(err) {
    console.log(err)
})
