//import { string } from 'prop-types';

export * from './constants'
export const setItemLocalStorage = (key, value) =>{
    if( !key || !value){
        return console.error('Can not in store LS');
    }
const valueToStore =
typeof value !== 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore)
}
export const getItemFromLocalStorage =(key) =>{
    if(!key){
 return console.error('Can get the value from Ls')
    }
  return localStorage.getItem(key)   
}
export const removeItemFromLocalStorage =(key) =>{
    if(!key){
    return console.error('Can get the value from LS')

    }
 localStorage.removeItem(key)   
}


export const getFormBody =(params) =>{
    let formBody =[]

    for(let property in params){
let encodedKey=encodeURIComponent(property)
let encodedValue = encodeURIComponent(params[property])

formBody.push(encodedKey + '=' + encodedValue)
    }
 return formBody.join('&')   
}