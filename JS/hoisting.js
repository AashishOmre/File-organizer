



// console.log(a);  //In phase-1 value of a is undefined and In phase-2 this statement encountered before a=12

// greet();
// var a=12;

// function greet(){
//     console.log("Hii");
// }




// Temporal Dead Zone--> It is just an area whear if you try to access variables defined with let and const keyword before initialization
   // so we cant do it. 
console.log(a); 

greet();
let a=12;

function greet(){
    console.log("Hii");
}




console.log(a);  

greet();

const a=12;

function greet(){
    console.log("Hii");
}