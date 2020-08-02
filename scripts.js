console.log('hello')

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
    result = Math.round(result * 1000) / 1000
    return result
}

//add event listeners 
btns.addEventListener('click', element =>{
    if (element.target.matches('button')){
        const btn = element.target
        const action = btn.dataset.action
        const btnContent = btn.value
        const displayNum = displayCurrent.textContent
        const prevKeyType = calculator.dataset.prevKeyType

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

            if (action === 'decimal' && !displayNum.includes('.')) {
                displayCurrent.textContent = displayNum + '.'
                if (prevKeyType == 'operator' ) {
                    displayCurrent.textContent = '0.'
                }
                calculator.dataset.prevKeyType = 'decimal'
            }

            if (
                action == 'add' ||
                action == 'subtract' ||
                action == 'multiply' ||
                action == 'divide') {

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

})





