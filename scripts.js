console.log('hello')

function add (a, b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function multiply (a,b) {
	return a*b;
}

function divide (a,b) {
	return a/b; 
}

function operate(operator, numA, numB) {
    if(operator === '+'){
        return add(numA,numB)
    } else if (operator === '-'){
        return subtract(numA, numB)
    } else if(operator === '*'){
        return multiply(numA, numB)
    } else if (operator === '/'){
        return divide(numA, numB)
    } else {
        return 'not a valid operator'
    }
}

let display = ''

function displayInput(){
    document.getElementById("input").innerHTML = display;
    
}
displayInput();

function addInput(x){
    let newValue = document.getElementById(x).value
    console.log(newValue)
    display = display+newValue
    console.log(display)
    displayInput()
}



