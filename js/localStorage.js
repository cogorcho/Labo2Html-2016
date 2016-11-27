'use strict'

let storage = () => { return localStorage }

let getKeys = (storage) => { return Object.keys(storage) }

let getCount = (keys) => { return keys.length }

let readItem = (storage, key) => { return JSON.parse(storage.getItem(key)) }

let checkItem = (storage, key) => {
    return (storage.getItem(key) === null) ? false : true
}

let deleteItem = (storage, dni) => {
    return checkItem(storage,dni) ? storage.removeItem(dni) : false
}

let addItem = (storage, item) => {
    if (checkItem(storage,item.dni)) 
        deleteItem(storage, item.dni)
    storage.setItem(item.dni, JSON.stringify(item))
} 

let printKeys = (keys, storage) => {
    keys.map( key => printBonito(readItem(storage,key)) )
}

let printBonito = (item) => {
    console.log('Dni: ' + getDni(item))
    console.log('Nombre: ' + getApellido(item) + ', ' + getNombre(item))
    console.log('FNac: ' + getFnac(item))
    console.log('Email: ' + getCorreo(item))
    console.log('Sexo: ' + getSexo(item))
    return false;
}

let getDni = (item) => { return item.dni };
let getNombre = (item) => { return item.nombre };
let getApellido = (item) => { return item.apellido };
let getFnac = (item) => { return item.fnac };
let getCorreo = (item) => { return item.correo };
let getSexo = (item) => { return item.sexo };
