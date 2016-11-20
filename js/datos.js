'use strict'

let inputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input')); }

let btnGuardar = () => {
    let btn =  document.getElementById('iguardar');
    btn.addEventListener('click', guardar);
    return btn;
};

let btnBorrar = () => {
    let btn =  document.getElementById('iborrar');
    btn.addEventListener('click', borrar);
    return btn;
};

let guardar = () => {
    localStorageManager().save(getScreenData());
    resetForm();
    ulLinks().clear();
    ulLinks().load();
}

let borrar = () => {
    let dni = getScreenData().dni;
    localStorageManager().remove(dni);
    resetForm();
    ulLinks().clear();
    ulLinks().load();
}

let localStorageManager = () =>  {
    let dataKeys = () => { return Object.keys(localStorage) ;}
    let o =  {
        elems : dataKeys(),
        count : dataKeys().length,
        get   : () => { return dataKeys() },
        save  : (data) => {
            if (data.dni === "")
                return;
           	if (localStorage.getItem(data.dni) === null) {
		        localStorage.removeItem(data.dni);
	        }
            localStorage.setItem(data.dni, JSON.stringify(data));
            },
        getItem : (key) => {
            return JSON.parse(localStorage.getItem(key));
        },
        remove : (key) => {
            localStorage.removeItem(key);
        }
    };
    return o;
};

let ulLinks = () => {
    let ul = () => { return document.getElementById('lista-de-datos') };
    let o = {
        elems : ul(),
        count : ul().childNodes.length,
        clear : () => { while (ul().firstChild) ul().removeChild(ul().firstChild); },
        add   : (data) => {
                    console.log('Add ' + data);
                    let atext = data.nombre + ' ' + data.apellido;
                    let a = document.createElement('a');
                    let linkText = document.createTextNode(atext);
                    a.appendChild(linkText);
                    a.href = "#" + data.dni;
                    a.addEventListener('click', clickLink, false);
                    let li = document.createElement("li");
                    li.appendChild(a);
                    ul().appendChild(li);
                },
        load   : () => {
                    localStorageManager().get().map((item) => {
                       let data = localStorageManager().getItem(item);
                       let atext = data.nombre + ' ' + data.apellido;
                       let a = document.createElement('a');
                       let linkText = document.createTextNode(atext);
                       a.appendChild(linkText);
                       a.href = "#" + data.dni;
                       a.addEventListener('click', clickLink, false);
                       let li = document.createElement("li");
                       li.appendChild(a);
                       ul().appendChild(li);
                    });
                }
    };
    return o;
};

let clickLink = (ev) => {
	var dni = ev.toElement.hash.replace('#','');
	var data = localStorageManager().getItem(dni);

    inputs().map((item) => {
        switch (item.name) {
            case 'nombre' : { item.value = data.nombre; break; }
            case 'apellido' : { item.value = data.apellido; break; }
            case 'dni' : { item.value = data.dni; break; }
            case 'correo' : { item.value = data.correo; break; }
            case 'fnac' : { item.value = data.fnac; break; }
            case 'sexo' : { 
                if (item.id == 'sexf' && data.sexo == 'F') {
                    item.value = data.sexo;
                    item.checked = true; 
                }
                if (item.id == 'sexm' && data.sexo == 'M') {
                    item.value = data.sexo;
                    item.checked = true; 
                }
                break; }
            case 'foto' : { item.filename = data.foto; break; }
            default : break;
        }
    }); 
}

let getScreenData = () => {
    let data = {};
    inputs().map((item) => {
        switch (item.name) {
            case 'nombre' : { data.nombre = item.value; break; }
            case 'apellido' : { data.apellido = item.value; break; }
            case 'dni' : { data.dni = item.value; break; }
            case 'correo' : { data.correo = item.value; break; }
            case 'fnac' : { data.fnac = item.value; break; }
            case 'sexo' : { (item.id == 'sexf' && item.checked) ? data.sexo ='F' : data.sexo='M'; break; }
            case 'foto' : { data.foto = item.filename; break; }
            default : break;
        }
    });
	return data;
}

let resetForm = () => {
    let data = {};
    inputs().map((item) => {
        switch (item.name) {
            case 'nombre' : { item.value = ''; break; }
            case 'apellido' : { item.value = ''; break; }
            case 'dni' : { item.value  = ''; break; }
            case 'correo' : { item.value  = ''; break; }
            case 'fnac' : { item.value = ''; break; }
            case 'sexo' : { (item.id == 'sexf') ? item.checked = true: item.checked = false; break; }
            case 'foto' : { item.filename = ''; break; }
            default : break;
        }
    });
    inputs()[0].focus();
}

let arranque = () => {
    btnGuardar();
    btnBorrar();
    ulLinks().load();
}

arranque();
