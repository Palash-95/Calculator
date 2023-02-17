const display = document.querySelector("#display p");
const operators = document.querySelectorAll(".operator > button");
const numbers = document.querySelectorAll(".number");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const backspace = document.querySelector('#backspace');

let firstNumber, operator, secondNumber;

for (let node of numbers) {
    node.addEventListener("click", addNumber)
}

for (let operator of operators){
    operator.addEventListener("click",calculate)
}

equalButton.addEventListener("click",calculate);
clearButton.addEventListener("click",() => display.textContent = "");
backspace.addEventListener('click',() => display.textContent = display.textContent.slice(0,-1));

document.addEventListener('keydown',(e) => {
    let key = document.querySelector(`button[data-key="${e.keyCode}"]`)
    key.click();
})

function addNumber(e){
    let regex = /\d*\.*[-,+,*,/]*$/;
    if(!regex.test(display.textContent)){
        display.textContent = "";
    }
    else if(firstNumber === null){
        display.textContent = '';
        firstNumber = e.target.textContent;
    }
    else if(e.target.textContent === '.'){
        let regex2 = /\d*\.\d*$/;
        if(regex2.test(display.textContent)){return}
    }
    display.textContent += e.target.textContent;
}

function calculate(e){
    let regex = /[-,+,*,/,.]$/;
    if(regex.test(display.textContent)){return};

    let regex2 = /\d+$/;
    if(!regex2.test(display.textContent)){
        display.textContent = "";
    }

    let regex3 = /[/]0\.*0*$/;
    if(regex3.test(display.textContent)){
        display.textContent = "Can't divide by 0!";
        return firstNumber = null;
    }

    let regex4 = /^[-,+]*\d*\.*\d*$/;
    if(regex4.test(display.textContent)){
        firstNumber = display.textContent;
        operator = e.target.id;
    }
    else{
        let regex5 = /^[-,+]\d*\.*\d+/;
        if(regex5.test(display.textContent)){
            secondNumber = display.textContent.split(/[-,+,*,/]/)[2];
        }
        else{secondNumber = display.textContent.split(/[-,+,*,/]/)[1];}

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

function operate(operator,a,b){
    switch (operator){
        case "add": return add(a,b);
        case "substract": return substract(a,b);
        case "multiply": return multiply(a,b);
        case "divide": return divide(a,b);
    }
}

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
    return a / b;
}