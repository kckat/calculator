//selectors for DOM elements
const calculator = document.querySelector('.calculator-wrapper')
const btns = calculator.querySelector('.buttons-wrapper')

const displayPrevious = document.querySelector('previous-numbers')
const displayCurrent = document.querySelector('.current-numbers')
const clearBtn = document.querySelector('[data-clear]')
const numberBtns = document.querySelectorAll('[data-number]')
const operatorBtns = document.querySelectorAll('[data-operator]')

//variables to store calculations
let previousValue = ''
let currentValue = displayCurrent.textContent
let currentOperation = ''
let previousOperation = ''



//math functions
function add (a, b) { return parseFloat(a) + parseFloat(b)}

function subtract (a,b) { return parseFloat(a) - parseFloat(b)}

function multiply (a,b) { return parseFloat(a) * parseFloat(b)}

function divide (a,b) { 
    if(b == 0){
        return 'not in this life'
    } else{
        return parseFloat(a) / parseFloat(b)
    }
}

function operate(numA, operator, numB) {
    let result = ''
    console.log(operator)
    if(operator === 'add'){
        result = add(numA,numB)
    } else if (operator === 'subtract'){
        result = subtract(numA, numB)
    } else if(operator === 'multiply'){
        result = multiply(numA, numB)
    } else if (operator === 'divide'){
        result = divide(numA, numB)
    } else {
        result = 'error'
    }
    return result
}

// add click handlers
btns.addEventListener('click', function (element){
    calculate(element)
})

// document.addEventListener('keydown', function(element){

// })


// calculator operations

function calculate(input){
    const char = input.target
    const action = char.dataset.action
    let display = displayCurrent.textContent

    if (!action){
        if (currentValue != 0){
            displayCurrent.textContent += char.value
            currentValue = displayCurrent.textContent
        } else {
            displayCurrent.textContent = char.value
            currentValue = displayCurrent.textContent
        }
        console.log(currentValue)
    }
    if (action == 'decimal' && !currentValue.includes('.')) {
        displayCurrent.textContent = currentValue + '.'
        if (currentOperation) {
            displayCurrent.textContent = '0.'
        } else if (currentValue == 0){
            displayCurrent.textContent = '0.'
        }   
    }
    if (action == 'add'||
        action == 'subtract'||
        action == 'divide'||
        action == 'multiply'){
            currentOperation = char.dataset.action
        if (currentValue != 0){
            previousValue = currentValue;
            currentValue = 0
            console.log(currentOperation, previousValue)
        }
    }
    if (action == 'calculate'){
        if (currentValue){
            console.log(previousValue, currentOperation, currentValue)
            displayCurrent.textContent = operate(previousValue, currentOperation, currentValue)
            currentValue = displayCurrent.textContent
            historyValue = currentValue
        }
        
        console.log('calculate')
    }

    if (action =='clear'){
        currentOperation = ''
        historyValue = ''
        currentValue = 0
        displayCurrent.textContent = 0
    }
}