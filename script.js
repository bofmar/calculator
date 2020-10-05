const keys = document.querySelectorAll("button");
const display = document.querySelector(".display");

let currentDisplay = "0";
let currentOperation = "";
let nextOperation = "";

let awaitNumber = false;

let num1;
let num2;

display.textContent = currentDisplay;

keys.forEach(key => {
    key.addEventListener("click", getKeyID);
})

function getKeyID(e) {
    const keyId = e.target.id;
    switch (keyId) {
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
        case "minus":
            operate("minus");
            break;
        case "divide":
            operate("divide");
            break;
        case "multiply":
            operate("multiply");
            break;
        case "power":
            operate("power");
            break;
        //decimal
        case "point":
            updateDisplay(".");
            break;
        default:
            console.log("something else was pressed");
    }
}

function updateDisplay(str) {
    //max length of display = 10 chars
    (currentDisplay === "0" && str === "0") ? 1 : (currentDisplay === "ERROR" && str != "AC") ? 1 : (str === "." && currentDisplay.includes(str)) ? 1 : (currentDisplay === "0" && str === ".") ? currentDisplay += str : (currentDisplay === "0" && str != "AC" && str != "DEL") ? currentDisplay = str : (currentDisplay.length + str.length > 10 && str != "AC" && str != "DEL") ? currentDisplay = "ERROR" : (str === "AC") ? allClear() : (str === "DEL") ? removeADigit() : currentDisplay += str;

    display.textContent = currentDisplay;
    awaitNumber = false;
}

function removeADigit() {
    let displayToArray = [...currentDisplay];
    currentDisplay = displayToArray.slice(0, displayToArray.length - 1).join("");
    if (currentDisplay.length < 1) {
        currentDisplay = "0";
    }
}

function allClear() {
    currentDisplay = "0";
    storedNumber = 0;
    currentOperation = "";
}

function operate(operator) {
    if (currentDisplay === "ERROR") {
        return;
    }
    if (awaitNumber) {
        currentOperation = operator;
    }
    else if (currentOperation === "") {
        currentOperation = operator;
        num1 = +currentDisplay;
        awaitNumber = true;
        currentDisplay = "0";
        return;
    }
    else {
        num2 = +currentDisplay;
        nextOperation = operator;

        switch (currentOperation) {
            case "plus":
                add(num1, num2);
                break;
            case "minus":
                subtract(num1,num2);
                break;
            case "divide":
                divide(num1,num2);
                break;
            case "multiply":
                multiply(num1,num2);
                break;
            case "power":
                power(num1,num2);
                break;
        }
    }
}

function add(x, y) {
    let result = x + y;
    reset(result);
}

function subtract(x,y){
    let result = x - y;
    reset(result);
}

function multiply(x,y){
    let result = x * y;
    reset(result);
}

function reset(result) {
    if (result.toString().length > 10) {
        currentDisplay = "ERROR";
        updateDisplay("ERROR");
        return;
    }
    awaitNumber = true;
    num1 = result;
    currentOperation = nextOperation;
    nextOperation = "";
    num2 = 0;
    currentDisplay = "0";

    updateDisplay(result.toString());

    currentDisplay = "0";
}