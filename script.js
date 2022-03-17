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
        console.log(this.operation)
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

    //update display
    updateDisplay(){
        this.currentOperandAndTextElement.innerText = this.currentOperand;
        this.previousOperandAndTextElement.innerText = this.previousOperand;
    }
}

const numberButtons = document.querySelectorAll(".number-buttons");
const operations = document.querySelectorAll(".operations");
const equals = document.querySelector(".equals-button");
const allClear = document.querySelector(".AC-button");
const deleteButton = document.querySelector(".del-button");
const previousOperandAndTextElement = document.querySelector("[data-previous-operand]");
const currentOperandAndTextElement = document.querySelector("[data-current-operand]");

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