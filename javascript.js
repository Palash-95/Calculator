function add(a,b){
    return a + b;
}
function substract(a,b){
    return a - b;
}
function multiply(a,b){
    return a * b;
}
function divide(a,b){
    if(b === 0){
        return "Can't divide by 0!"
    }
    else{
        return a / b;
    }
}

function operate(operator,a,b){
    switch (operator){
        case "add": return add(a,b);
        case "substract": return substract(a,b);
        case "multiply": return multiply(a,b);
        case "divide": return divide(a,b);
    }
}
const display = document.querySelector("#display");
const operators = document.querySelectorAll(".operator > button");
const numbers = document.querySelectorAll(".numbers > button");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const number = document.querySelector('.numbers');

for (let node of numbers) {
    node.addEventListener("click", addNumber)
}
function addNumber(e){
    let regex5 = /\d*\.*[-,+,*,/]*$/;
    if(!regex5.test(display.textContent)){
        display.textContent = "";
    }
    if(firstNumber === null){
        display.textContent = '';
        firstNumber = e.target.textContent;
    }
    if(e.target.textContent === '.'){
        let regex = /\d*\.\d*$/;
        if(regex.test(display.textContent)){return}
    }
    display.textContent += e.target.textContent;
}

let firstNumber ;
let operator;
let secondNumber;
for (let operator of operators){
    operator.addEventListener("click",calculate)
}
equalButton.addEventListener("click",calculate2);
clearButton.addEventListener("click",() => display.textContent = "");

function calculate2(e){
    calculate(e);
    
    }

function calculate(e){
    let regex3 = /[-,+,*,/]$/;
    if(regex3.test(display.textContent)){return};

    let regex5 = /\d+$/;
    if(!regex5.test(display.textContent)){
        display.textContent = "";
    }

    let regex = /\d+[-,+,*,/]\d+/;
    if(!regex.test(display.textContent)){
        firstNumber = display.textContent;
        console.log("firstNumber = " + firstNumber);
        operator = e.target.id;
    }
    else{
        let regex2 = /-\d+[-,+,*,/]\d+/;
        if(regex2.test(display.textContent)){
            secondNumber = display.textContent.split(/[-,+,*,/]/)[2];
        }
        else{secondNumber = display.textContent.split(/[-,+,*,/]/)[1];}
        console.log("operator = " + operator);
        console.log("firstNumber = " + firstNumber);
        console.log("secondNumber = " + secondNumber);
        console.log(e.target.id);
        let result = operate(operator,+firstNumber,+secondNumber);
        display.textContent = parseFloat(result.toFixed(4));
    }
    if(e.target.textContent === "="){
        firstNumber = null;
    }
    else{
        firstNumber = display.textContent;
        operator = e.target.id;
        display.textContent += e.target.textContent;
    }
}