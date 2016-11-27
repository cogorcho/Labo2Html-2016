let inputsH = () => { return Array.prototype.slice.call(document.getElementsByTagName('input')); }

let dataInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/text|email|date|radio/)) }

let btnInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                .filter( input => input.type === 'button')
                .map( elem => elem.addEventListener('click', eval(elem.name))) }

let textInputs = (inputs) => inputs.map( input => 
                                    input.type == 'radio' ? input.checked ? 
                                    { 'name' : input.name, 'value' : input.value } : null : 
                                    { 'name' : input.name, 'value' : input.value } )
                            .filter ( element => element != null )

let screenData = (input) => input.reduce( (a,b) => { 
        if (b.type === 'radio' && b.checked)
             a[b.name] = b.value
        if (b.type !== 'radio')
                a[b.name] = b.value; 
        return  a;}, {});

let guardar = () => { 
        addItem(storage(),screenData(dataInputs()));
        clearLinks();
        loadLinks(getKeys(storage())); 
        resetValues(dataInputs()); 
}

let borrar = () => { 
        deleteItem(storage(),screenData(dataInputs()).dni);
        clearLinks(); 
        loadLinks(getKeys(storage()));
        resetValues(dataInputs()); 
}

let clearLinks = () => {
        let theUl = document.getElementById('lista-de-datos')
        let ulist = Array.prototype.slice.call(document.getElementById('lista-de-datos').children)
        ulist.map( li => theUl.removeChild(li))
}

let resetValues = (items) => { items.map( item => item.value = '') ; items[0].focus();  }

btnInputs()