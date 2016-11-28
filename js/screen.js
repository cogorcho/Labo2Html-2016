let inputsH = () => { return Array.prototype.slice.call(document.getElementsByTagName('input')); }

let dataInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/text|email|radio|file|date/)) }

let textInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/text/)) }

let radioInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/radio/) && input.checked) }

let emailInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/email/)) }

let dateInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/date/)) }

let fileInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                        .filter(input => input.type.match(/file/)) }

let btnInputs = () => { return Array.prototype.slice.call(document.getElementsByTagName('input'))
                .filter( input => input.type.match(/button/)) }

let btnInputsEvents = (btns) => btns.map( btn => btn.addEventListener('click', eval(btn.name))) 

let allInputs = (txt, rad, fil, ema, dat) => txt.concat(rad).concat(fil).concat(ema).concat(dat);

let AllInputs = () => textInputs().concat(radioInputs()).concat(fileInputs()).concat(emailInputs()).concat(dateInputs());

let screenData = (input) => input.reduce( (a,b) => {
        if (b.type.match(/radio/) && b.checked) 
                a[b.name] = b.value
        if (b.type.match(/text|date|email/))
                a[b.name] = b.value; 
        if (b.type.match(/file/) && b.files[0] !== undefined) {
                a[b.name] = b.files[0].name;
        } 
        return  a;}, {});

let guardar = () => { 
        addItem(storage(),screenData(allInputs(textInputs(), radioInputs(), fileInputs(), emailInputs(), dateInputs())));
        clearLinks();
        loadLinks(getKeys(storage())); 
        resetValues(dataInputs()); 
}

let borrar = () => { 
        deleteItem(storage(),screenData(allInputs(textInputs(), radioInputs(), fileInputs(), emailInputs(), dateInputs())).dni);
        clearLinks(); 
        loadLinks(getKeys(storage()));
        resetValues(dataInputs()); 
}

let clearLinks = () => {
        let theUl = document.getElementById('lista-de-datos')
        let ulist = Array.prototype.slice.call(document.getElementById('lista-de-datos').children)
        ulist.map( li => theUl.removeChild(li))
}

let resetValues = (items) => { 
        items.map( item => item.type === 'radio' ? item.checked = false: item.value = ''); 
        clearCanvas(canvas());
        fileLabel().innerHTML = '?'; 
        items[0].focus();  
}

let fileLabel = () => document.getElementById('ilabelFile')

btnInputsEvents(btnInputs())
