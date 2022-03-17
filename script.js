class Calculator{
    constructor(previousOperandAndTextElement,currentOperandAndTextElement){
        this.previousOperandAndTextElement = previousOperandAndTextElement;
        this.currentOperandAndTextElement = currentOperandAndTextElement;
        this.clear();
    }

    //clear
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    //delete
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    //append number
    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")){
            return
        } //prevent multiple periods from being added
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    //choose operation
    chooseOperation(operation){
        if(this.currentOperand === ""){
            return;
        }
        if(this.previousOperand !== ""){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    //compute
    compute(){
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)){
            return;
        }
        switch(this.operation){
            case "+":
                computation = previous + current;
                break;
            case "-":
                computation = previous - current;
                break;
            case "×": 
                computation = previous * current;
                break;
            case "^": 
                computation = Math.pow(previous, current);
                break;
            case "÷": 
                computation = previous / current;
                break;
            case "√": 
                computation = Math.pow(previous, 1 / current);
                break;
            default:
                console.error(`Invalid computation ${this.operation}`);
                return;            
            }
            this.currentOperand = computation;
            this.operation = undefined;
            this.previousOperand = "";
        }
        
        getDisplayNumber(number){
        const strNumber = number.toString();
        const intDigits = parseFloat(strNumber.split(".")[0]);
        const decimalDigits = strNumber.split(".")[1];
        let intDisplay;
        if(isNaN(intDigits)){
            intDisplay = "";
        }
        else{
            intDisplay = intDigits.toLocaleString("en", {maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${intDisplay}.${decimalDigits}`;
        }
        else{
            return intDisplay;
        }
    }
    
    //update display
    updateDisplay(){
        this.currentOperandAndTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandAndTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;            
        }
        else{
            this.previousOperandAndTextElement.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll(".number-buttons");
const operations = document.querySelectorAll(".operations");
const equals = document.querySelector(".equals-button");
const allClear = document.querySelector(".AC-button");
const deleteButton = document.querySelector(".del-button");
const previousOperandAndTextElement = document.querySelector("[data-previous-operand]");
const currentOperandAndTextElement = document.querySelector("[data-current-operand]");
const numArray = ["0","1","2","3","4","5","6","7","8","9","."]
const operatorsArray = ["+","-","^"]

const calculator = new Calculator(previousOperandAndTextElement, currentOperandAndTextElement);
console.log(calculator);

numberButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operations.forEach(operation =>{
    operation.addEventListener("click", () =>{
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();
    })
})

equals.addEventListener("click", (button) =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClear.addEventListener("click", ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

//keyboard support

// prevent default keyboard interaction

window.addEventListener("keydown", (e) => {
    e.preventDefault();
    console.log(e.key);
    if(numArray.includes(e.key.toString())){
        calculator.appendNumber(e.key.toString());
        calculator.updateDisplay();
        numberButtons.forEach(button => {
            if(button.innerText.toString() === e.key.toString()){
                button.classList.add("active-num-op");
            }
        })
    }
    else if(operatorsArray.includes(e.key.toString())){
        calculator.chooseOperation(e.key.toString());
        calculator.updateDisplay();
        operations.forEach(op => {
            if(op.innerText.toString() === e.key.toString()){
                op.classList.add("active-num-op")
            }
        })
    }
    else if(e.key.toString() === "*"){
        calculator.chooseOperation("×");
        calculator.updateDisplay();
        operations.forEach(op => {
            if(op.innerText.toString() === "×"){
                op.classList.add("active-num-op")
            }
        })
    }
    else if(e.key.toString() === "/"){
        calculator.chooseOperation("÷");
        calculator.updateDisplay();
        operations.forEach(op => {
            if(op.innerText.toString() === "÷"){
                op.classList.add("active-num-op")
            }
        })
    }
    else if(e.key.toString() === "Enter"){
        calculator.compute();
        calculator.updateDisplay();
        equals.classList.add("active-eq");
    }
    else if(e.key.toString() === "Delete"){
        calculator.clear();
        calculator.updateDisplay();
        allClear.classList.add("active-green");
    }
    else if(e.key.toString() === "Backspace"){
        calculator.delete();
        calculator.updateDisplay();
        deleteButton.classList.add("active-green");
    }
    else{
        return;
    }
});

window.addEventListener("keyup", () => {
    const targetNum = document.querySelector(".active-num-op");
    if(targetNum !== null){
        targetNum.classList.remove("active-num-op");
        return
    }

    const targetGreen = document.querySelector(".active-green");
    if(targetGreen !== null){
        targetGreen.classList.remove("active-green");
        return
    }

    const targetEq = document.querySelector(".active-eq");
    if(targetEq !== null){
        targetEq.classList.remove("active-eq");
        return
    }

    return
})