const keys = document.querySelectorAll("button");
const display = document.querySelector(".display");

let currentDisplay = "0";
let storedNumber = 0;
let currentOperation = "";

display.textContent = currentDisplay;

keys.forEach(key => {
    key.addEventListener("click",getKeyID);
})

function getKeyID(e){
    const keyId = e.target.id;
    switch(keyId){
        //number buttons
        case "zero":
            updateDisplay("0");
            break;
        case "one":
            updateDisplay("1");
            break;
        case "two":
            updateDisplay("2");
            break;
        case "three":
            updateDisplay("3");
            break;
        case "four":
            updateDisplay("4");
            break;
        case "five":
            updateDisplay("5");
            break;
        case "six":
            updateDisplay("6");
            break;
        case "seven":
            updateDisplay("7");
            break;
        case "eight":
            updateDisplay("8");
            break;
        case "nine":
            updateDisplay("9");
            break;
        //All Clear and DEL
        case "clear":
            updateDisplay("AC");
            break;
        case "back":
            updateDisplay("DEL");
            break;
        //operations
        case "plus":
            operate("plus");
            break;
        default:
            console.log("something else was pressed");
    }
}

function updateDisplay(str){
    //max length of display = 10 chars
    (currentDisplay === "0" && str === "0")? 1 : (currentDisplay === "0" && str != "AC" && str != "DEL")? currentDisplay = str:(currentDisplay.length + 1 > 10 && str != "AC" && str != "DEL")? currentDisplay = "ERROR":(currentDisplay === "ERROR" && "AC")? 1:(str === "AC")? allClear():(str === "DEL")? removeADigit(): currentDisplay += str;

    display.textContent = currentDisplay;
}

function removeADigit(){
    let displayToArray = [...currentDisplay];
    currentDisplay = displayToArray.slice(0,displayToArray.length-1).join("");
    if(currentDisplay.length < 1){
        currentDisplay = "0";
    }
}

function allClear(){
    currentDisplay = "0";
    storedNumber = 0;
    currentOperation = "";
}

function operate(operator){
    currentOperation = operator;
    (operator === "plus")? addition(): 1;
}

function addition(){
    if(currentDisplay === "ERROR"){
        return;
    }
    let result = +storedNumber + +currentDisplay;
    storedNumber = currentDisplay;
    currentDisplay = result.toString();

    console.log([result,storedNumber,currentDisplay]);

    display.textContent = currentDisplay;
}