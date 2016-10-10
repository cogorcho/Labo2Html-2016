var inputs = document.getElementsByTagName('input');
var boton = document.getElementById('iguardar');
boton.addEventListener('click', guardar);

loaddata();

function getData() {

	var sxs = document.getElementsByName('sexo');
	var sex = inputs['sexf'].checked ? 'F' : 'M';

	var _nombre		= inputs['nombre'].value;
	var _apellido	= inputs['apellido'].value;
	var _dni		= inputs['dni'].value;
	var _fnac		= inputs['fnac'].value;
	var _sexo		= sex;
	var _foto		= inputs['foto'].value;
	var _correo		= inputs['correo'].value;

	var data = {
		nombre : _nombre,
		apellido  : _apellido,
		dni : _dni,
		fnac : _fnac,
		sexo : _sexo,
		foto : _foto,
		correo : _correo
	}

	return data;
}

function guardar() {
	var data = getData();
	agregarDatos(data);
	loaddata();
}

function agregarDatos(data) {
	var atext = data.nombre + ' ' + data.apellido;
	var a = document.createElement('a');
	var linkText = document.createTextNode(atext);
	a.appendChild(linkText);
	a.href = "#" + data.dni;
	a.addEventListener('click', clickLink, false);

	var ul = document.getElementById("lista-de-datos");
	var li = document.createElement("li");
	li.appendChild(a);
	ul.appendChild(li);

	if (localStorage.getItem(data.dni) === null) {
		localStorage.removeItem(data.dni);
	}

	localStorage.setItem(data.dni, JSON.stringify(data));

	limpiar();
}

function clickLink(ev) {
	var dni = ev.toElement.hash.replace('#','');
	var datos = localStorage.getItem(dni);
	var data = JSON.parse(datos);

	inputs['nombre'].value = data.nombre;
	inputs['apellido'].value = data.apellido;
	inputs['dni'].value = data.dni;
	inputs['correo'].value = data.correo;
	inputs['fnac'].value = data.fnac;

	if (data.sexo === 'F') {
		inputs['sexf'].checked = true;
	}
	else {
		inputs['sexm'].checked = true;
	}
	inputs['foto'].filename = data.foto;
}

function limpiar() {
	var elems = inputs.length;
	for (var i = 0; i < elems; i++) {
		if (inputs[i].type === 'button')
			continue;
		inputs[i].value = '';
	}
	inputs['sexf'].checked = true;
	inputs[0].focus();
}

function clearLinks() {
	var linksul = document.getElementById('lista-de-datos'); 
	var linkcount = linksul.childNodes.length;

	for (var i = 0; i < linkcount; i++) {
		linksul.removeChild(linksul.childNodes[0]);
	}
}

function loaddata() {
	var ks = Object.keys(localStorage);
	var elems = ks.length;

	clearLinks();

	for (var i = 0; i < elems; i++) {
		var data = localStorage.getItem(ks[i]);
		agregarDatos(JSON.parse(data));
	}
}