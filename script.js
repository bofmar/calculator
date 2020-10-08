const keys = document.querySelectorAll("button");
const display = document.querySelector(".display");

const usableKeys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 109, 106, 111, 110, 190, 8, 13];

window.addEventListener("keydown", (e) => {
    if (usableKeys.some(element => e.keyCode === element)) {
        let code;
        switch (e.keyCode) {
            case 48:
            case 96:
                code = "zero";
                break;
            case 49:
            case 97:
                code = "one";
                break;
            case 50:
            case 98:
                code = "two";
                break;
            case 51:
            case 99:
                code = "three";
                break;
            case 52:
            case 100:
                code = "four";
                break;
            case 53:
            case 101:
                code = "five";
                break;
            case 54:
            case 102:
                code = "six";
                break;
            case 55:
            case 103:
                code = "seven";
                break;
            case 56:
            case 104:
                code = "eight";
                break;
            case 57:
            case 105:
                code = "nine";
                break;
            case 110:
            case 190:
                code = "point";
                break;
            case 107:
                code = "plus"
                break;
            case 109:
                code = "minus";
                break;
            case 106:
                code = "multiply";
                break;
            case 111:
                code = "divide";
                break;
            case 13:
                code = "equals";
                break;
            case 8:
                code = "back";
                break;
        }

        if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96){
            document.querySelector(`#${code}`).classList.add("active-num");
        }
        else if(e.key == "Backspace"){
            document.querySelector(`#${code}`).classList.add("active-del");
        }
        else if(e.key === "Enter"){
            document.querySelector(`#${code}`).classList.add("active-eq")
        }
        e.preventDefault();
        delegate(code);
    }
});

window.addEventListener("keyup", (e) => {
    if(e.key === "Backspace"){
        document.querySelector(".active-del").classList.remove("active-del");
    }
    else if(e.key === "Enter"){
        document.querySelector(".active-eq").classList.remove("active-eq");
    }
    document.querySelector(".active-num").classList.remove("active-num");
})

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
    delegate(keyId);
}

function delegate(code) {
    switch (code) {
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
        case "equals":
            operate("equals");
            break;
        //decimal
        case ".":
            updateDisplay("point");
            break;
        case "neg":
            updateDisplay("-");
            break;
        default:
            console.log("something else was pressed");
    }
}

function updateDisplay(str) {
    //max length of display = 10 chars
    (currentDisplay === "0" && str === "0") ? 1 : (currentDisplay === "ERROR" && str != "AC") ? 1 : (str === "." && currentDisplay.includes(str)) ? 1 : (str === "-" && currentDisplay.includes(str)) ? 1 : (str === "-" && currentDisplay != "0") ? currentDisplay = str + currentDisplay : (str === "-") ? currentDisplay = str : (currentDisplay === "0" && str === ".") ? currentDisplay += str : (currentDisplay === "0" && str != "AC" && str != "DEL") ? currentDisplay = str : (currentDisplay.length + str.length > 10 && str != "AC" && str != "DEL") ? currentDisplay = "ERROR" : (str === "AC") ? allClear() : (str === "DEL") ? removeADigit() : currentDisplay += str;

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
                subtract(num1, num2);
                break;
            case "divide":
                divide(num1, num2);
                break;
            case "multiply":
                multiply(num1, num2);
                break;
            case "power":
                power(num1, num2);
                break;
            default:
                console.error("Something went really wrong");
                break;
        }

        if (currentOperation === "equals") {
            currentOperation = "";
        }
    }
}

function add(x, y) {
    let result = x + y;
    reset(result);
}

function subtract(x, y) {
    let result = x - y;
    reset(result);
}

function multiply(x, y) {
    let result = x * y;
    reset(result);
}
function divide(x, y) {
    if (y === 0) {
        currentDisplay = "ERROR";
        updateDisplay("ERROR");
        return;
    }
    else {
        let result = x / y;
        if (result.toString().length > 10 && result.toString().includes(".") && result.toString().indexOf(".") < 8) {
            result = Number.parseFloat(result).toPrecision(6);
        }
        reset(result);
    }
}

function power(x, y) {
    let result = Math.pow(x, y);
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