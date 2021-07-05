import React from 'react';
const Img= function(props:any){
    return <img {...props } />
}
const Div= function(props:any){
    return <div {...props } />
}
const Ul= function(props:any){
    return <ul {...props } />
}
const Li= function(props:any){
    return <li {...props } />
}
const P= function(props:any){
    return <p {...props } />
}
const Span= function(props:any){
    return <span {...props } />
}
const I= function(props:any){
    return <i {...props } />
}
const Input= function(props:any){
    return <input {...props } />
}
const A= function(props:any){
    return <a {...props } />
}
export {
    Div,
    Img,
    Ul,
    Li,
    P,
    Span,
    I,
    Input,
    A
}