// function hello (compiler: string) {
//     console.log(`Hello from ${compiler}`);
// }
// hello("TypeScript");

// import {sayHello} from "./greet";
// console.log(sayHello("TypeScript"));

import { sayHello } from "./greet";
function showHello(divName: string, name: string) {
    debugger;
    const el = document.getElementById(divName);
    el.innerText = sayHello(name);
}

showHello("greeting", "TypeScript Compiler");