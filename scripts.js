
//selectors
const calculator = document.querySelector('.calculator-wrapper')
const btns = calculator.querySelector('.buttons-wrapper')

const displayPrevious = document.querySelector('previous-numbers')
const displayCurrent = document.querySelector('.current-numbers')
const clearBtn = document.querySelector('[data-clear]')
const numberBtns = document.querySelectorAll('[data-number]')
const operatorBtns = document.querySelectorAll('[data-operator]')

//variables to store calculations
let display = '0'

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

function roundNumbers(number){
    if (number.length > 5){
        number = Math.round(number * 100000) / 100000
    }
    return number
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
    
    if (typeof(result) == 'number') {
        roundNumbers(result)
    }
    return result
}

//calculation section
function calculate(element) {
    console.log(element)
        const btn = element
        const action = btn.dataset.action
        const btnContent = btn.value
        const displayNum = displayCurrent.textContent
        const prevKeyType = calculator.dataset.prevKeyType

        //if button doesnt have an action, it is a number. Update the number on calculator
        if(!action){
            if(displayNum === '0' || prevKeyType == 'operator'){
                displayCurrent.textContent = btnContent
                calculator.dataset.prevKeyType = 'number'
            } else {
                displayCurrent.textContent = displayNum + btnContent
                calculator.dataset.prevKeyType = 'number'
            }
            console.log('number key')
            console.log(btnContent)
            }

            // add decimal to number
            if (action === 'decimal' && !displayNum.includes('.')) {
                displayCurrent.textContent = displayNum + '.'
                if (prevKeyType == 'operator' ) {
                    displayCurrent.textContent = '0.'
                }
                calculator.dataset.prevKeyType = 'decimal'
            }

            // perform operation and show result if multiple operations are strung together
            if (
                action === 'add' ||
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide') {

                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = displayNum

                if (firstValue && operator && prevKeyType !== 'operator') {  
                    const calcValue = operate(firstValue, operator, secondValue) 
                    displayCurrent.textContent = calcValue
                    calculator.dataset.firstValue = calcValue
                    console.log(calcValue)
                    console.log(calculator.dataset.firstValue )
                } else {
                    calculator.dataset.firstValue = displayNum
                }
                
                
                btn.classList.add('is-selected')
                calculator.dataset.prevKeyType = 'operator'
                calculator.dataset.operator = action

               
            }


            // calculate result and let result be the new current value
            if (action === 'calculate') {
                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = displayNum
                console.log(firstValue, operator, secondValue)

                if(firstValue) {
                    if(prevKeyType === 'calculate'){
                        calculator.dataset.firstValue = displayNum
                    }
                    displayCurrent.textContent = operate(firstValue, operator, secondValue)
                }

                
                calculator.dataset.modValue = secondValue 
                calculator.dataset.prevKeyType = 'calculate'
            }

            if (action === 'clear') {
                displayCurrent.textContent = '0'
                calculator.dataset.prevKeyType = ''
                calculator.dataset.firstValue = ''
                calculator.dataset.operator = ''
            }

            if (action === 'back') {
                displayCurrent.textContent = displayNum.substring(0, displayNum.length -1)
                console.log(displayNum)
                if (displayNum.length == 1){
                    displayCurrent.textContent = '0'
                }
            }


            Array.from(btn.parentNode.children)
                .forEach(b => b.classList.remove('is-selected'))

}



//add event listeners 
btns.addEventListener('click', function(element){
    if (element.target.matches('button')){
    calculate(element.target)
    }
})


<<<<<<< HEAD
//added keyboard functionality 
document.onkeydown = function(e) {
    switch (e.keyCode){
        case 49:
=======
//add keyboard functionality
function keyListener(element) {
    switch(true){
        case(element.keyCode == 49):
        calculate(btns.querySelector('#one-button'))
            break;
        case(element.keyCode == 50):
        calculate(btns.querySelector('#two-button'))
            break;
        case(element.keyCode == 51):
        calculate(btns.querySelector('#three-button'))
            break;
        case(element.keyCode == 52):
        calculate(btns.querySelector('#four-button'))
            break;
        case(element.keyCode == 53):
        calculate(btns.querySelector('#five-button'))
            break;
        case(element.keyCode == 54):
        calculate(btns.querySelector('#six-button'))
            break;
        case(element.keyCode == 55):
        calculate(btns.querySelector('#seven-button'))
            break;
        case(element.keyCode == 56):
        calculate(btns.querySelector('#eight-button'))
            break;
        case(element.keyCode == 57):
        calculate(btns.querySelector('#nine-button'))
            break;
        case(element.keyCode == 48):
        calculate(btns.querySelector('#0-button'))
            break;
        case(element.keyCode == 13):
        calculate(btns.querySelector('#equals-button'))
            break;
        case(element.keyCode == 190):
        calculate(btns.querySelector('#decimal-button'))
            break;
        
    }
}

document.addEventListener('keydown', keyListener, true)

>>>>>>> bc65aa8d6870310ed6632cd29278f0355950a0b4

    }
}


