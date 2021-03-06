let textNode = (data) =>  document.createTextNode(data.nombre + ' ' + data.apellido)

let link = (data, textNode, fn) => {
    let lnk = document.createElement('a')
    lnk.appendChild(eval(textNode))
    lnk.href = '#' + data.dni
    lnk.addEventListener('click', fn, false);
    return lnk
}

let li = (link) => {
    let nli = document.createElement('li')
    nli.appendChild(link)
    return nli
}

let ul = (li) => document.getElementById('lista-de-datos').appendChild(li)

let fEvent = (ev) =>  loadScreen(dataInputs() ,readItem(storage(), ev.toElement.hash.replace('#','')))

let loadScreen = (elems, data) => {
    resetValues(dataInputs());
    elems.map( elem => loadElement(elem, data[elem.name]))
}

let setFileLabel = (label, fname) => (fname !== undefined) ? label.innerHTML = fname: label.innerHTML = '?'

let loadElement = (elem, val) =>  {
    if (elem.type.match(/text|email|date/))
        loadText(elem,val)
    if (elem.type.match(/file/))
        loadFile(elem, val)
    if (elem.type.match(/radio/) && elem.value === val) 
        loadRadio(elem,val) 
}

let loadText = (elem, val) => elem.value = val

let loadRadio = (elem, val) => { (elem.value === val) ?  elem.checked = true : elem.checked = false }

let loadFile = (elem, val) => { elem.files[0] = val; elem.title = val; setFileLabel(fileLabel(), val)}

let loadLinks = (keys) => keys.map(key => ul(li(link(readItem(storage(),key), textNode(readItem(storage(),key)),fEvent))))

loadLinks(getKeys(storage()))


