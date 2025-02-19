// Scripts BreakDown
// 1. Math Function Declaration (Add,Sub,Mul,Div) !
// 2. Declare DOM variables available on current HTML !
// 3. Clear Button Function !
// 4. BackSpace Button Function !
// 5. Number Button Function
// 6. Operators Button Function
// 7. Fetch Operation Function !
// 8. Keydown Events

// 1. Create functions of basic for calculators
// Addition, Subtraction, Multiplication, Division

function addNum(a, b) {
    return Number(a) + Number(b)
}

function subNum(a, b) {
    return Number(a) - Number(b)
}

function mulNum(a, b) {
    return Number(a) * Number(b)
}

function divNum(a, b) {
    // Show error message when user try to divide by zero
    if (Number(b) === 0) {
        counterResult.innerHTML = ""
        counterContainer = [];
        errorDisplay.textContent = "Divide by 0 will cause infinite result"
    } else {
        return (Number(a) / Number(b)).toFixed(4)
    }
}

// 2. Declare Variables from HTML file
// Create counter display for button input
const counterResult = document.querySelector(".counter-result")
const counterInput = document.querySelector(".counter-input")
let counterContainer = []; // Container for operation
let inputContainer = []; // Container for user input

// Set variable for input buttons (number and operators)
const numButton = document.querySelector(".number-button")
const opButton = document.querySelector(".operator-button")
const nonOpButton = document.querySelector(".non-operator-button")

// Set variable for error message
const errorDisplay = document.querySelector(".error-display")

// 3. Create Clear Button Function
// Create Clear Button to clear all inputs
const clearButton = document.createElement("button")
clearButton.id = "clear-button"
nonOpButton.appendChild(clearButton)
clearButton.addEventListener("click", createClearButton)

function createClearButton() {
    inputContainer = [];
    counterContainer = [];
    counterInput.innerHTML = ""
    counterResult.innerHTML = "";
    errorDisplay.innerHTML = "";
}

// 4. Create BackSpace Button
// Create backspace button
const backButton = document.createElement("button")
backButton.textContent = "BackSpace"
backButton.id = "back-button"
nonOpButton.appendChild(backButton)
backButton.addEventListener("click", createDelButton)
function createDelButton() {
    const lastInput = counterInput.lastChild
    inputContainer.pop();
    if (counterInput.childElementCount !== 0) {
        errorDisplay.innerHTML = ""
        lastInput.remove();
    }
}

// 5. Create Number Buttons
// Create number Buttons from (0-9) and (.)
const numberInputList = [0,".", 3, 2, 1, 6, 5, 4, 9, 8, 7]  // The array will be arranged in that position
numberInputList.reverse().map((item) => {
    const createButton = document.createElement("button")
    createButton.setAttribute("id", `number-${item}`)
    createButton.setAttribute("class", `numbers`)
    createButton.value = item
    createButton.textContent = item;
    numButton.appendChild(createButton)
})

function createNumButtons(e) {
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "number-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterInput.appendChild(spanBox)
}

function numberClick(e) {
    let numValue = e.target.value;
    numberButtonFunction(numValue)
}

function numberButtonFunction(value) {
    errorDisplay.innerHTML = ""
    const getOperator = inputContainer[0]
    const lastIndex = inputContainer.length - 1
    const lastElement = inputContainer[lastIndex]
    
    // Check if user use equal button before
    if (inputContainer.length == 0 && counterContainer.length == 1){
        createClearButton()
    }

    // Check if previous elements in inputContainer contains one operators
    if (getOperatorList.includes(lastElement) && inputContainer.length > 1) {        console.log("test")
        counterContainer.push(lastElement) // Push operator to counterContainer
        createSpanResult(lastElement)
        inputContainer.shift()
        inputContainer.push(value)
        counterInput.innerHTML = ``
        createNumButtons(value)

    }
    if (exceptMinusOperation.includes(getOperator) && counterContainer.length == 0) {
        errorDisplay.textContent = "Input Numbers before Operators"
    } else {
        inputContainer.push(value)
        createNumButtons(value)
    }

    if (getOperatorList.includes(getOperator) && inputContainer.length >= 1 && counterContainer.length != 0) {
        let joinValue;
        if (!getMinusOperation.includes(getOperator)) {
            joinValue = getOperator
            counterContainer.push(joinValue)
            createSpanResult(joinValue)
            inputContainer.shift()
            counterInput.innerHTML = ""
            createNumButtons(value)
        }
    }
}

const numberButtons = document.querySelectorAll(".numbers")
numberButtons.forEach(button => {
    button.addEventListener("click", numberClick);
})

// 6. Create Operators Button
// Create Operators Objects to be used
const operators = [
    {
        symbol: "+",
        meaning: "plus",
        isEqual: false,
        functionUsed: addNum,

    },
    {
        symbol: "-",
        meaning: "substract",
        isEqual: false,
        functionUsed: subNum,


    },
    {
        symbol: "*",
        meaning: "multi",
        isEqual: false,
        functionUsed: mulNum,


    },
    {
        symbol: "/",
        meaning: "divide",
        isEqual: false,
        functionUsed: divNum,

    },
    {
        symbol: "=",
        meaning: "equal",
        isEqual: true
    },

]

const getOperatorList = [...operators.map((item) => item.symbol)] // Get operators availabel
const getMinusOperation = operators.find(item => item.symbol === "-")?.symbol
const exceptMinusOperation = getOperatorList.filter(item => item != "-" && item != "=")

operators.reverse().map((item) => {
    const createButton = document.createElement("button")
    createButton.setAttribute("id", `operator-${item.meaning}`)
    createButton.textContent = item.symbol;
    createButton.value = item.symbol
    if (item.isEqual) { // Will check for equal buttons
        createButton.setAttribute("class", `equals`)
        numButton.appendChild(createButton)

    } else { // The rest of operators buttons
        createButton.setAttribute("class", `operators`)
        opButton.appendChild(createButton)
    }
})

// Create Operators Button Function
function createOpButtons(e) {
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "op-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterInput.appendChild(spanBox)
}

function operatorClick(e) {
    let opValue = e.target.value;
    operatorButtonFunction(opValue)
}

function operatorButtonFunction(value) {
    let lastIndex = inputContainer.length - 1// Index before operators added 
    let filterOperation = inputContainer.filter(item => getOperatorList.includes(item))
    const firstIdxMinus = getMinusOperation.includes(inputContainer[0])
    let joinArray = inputContainer.slice().join("")

    if (!(Number(joinArray)) && inputContainer[lastIndex]!=="0" && inputContainer.length !=0 && !getOperatorList.includes(value)) {
        errorDisplay.textContent = "Input appropriate number"}
    else{
// Check condition if number has been inputed before
if (counterContainer.length == 0 && exceptMinusOperation.includes(value) && inputContainer.length === 0) {
    errorDisplay.textContent = "Input Numbers before Operators"
}
// Check if previous element contain another operator
if (filterOperation.length >= 1 && !firstIdxMinus && counterContainer.length === 0) {
    errorDisplay.textContent = "Will only accept one operators"
}
else if (counterContainer.length != 0 && getOperatorList.includes(inputContainer[0])) {
    if (getMinusOperation.includes(value) && !getOperatorList.includes(counterContainer[1])) {
        const getFirstOperator = inputContainer[0]
        counterContainer.push(getFirstOperator)
        createSpanResult(getFirstOperator)
        inputContainer.shift()
        counterInput.innerHTML = ""
        inputContainer.push(value)
        createSpanInput(value)
    } else {
        errorDisplay.textContent = "Will only accept one operators"

    }
}

else if (getMinusOperation.includes(inputContainer[lastIndex])) {
    inputContainer.push(value)
    createSpanInput(value)
}

else {
    if (Number(inputContainer[lastIndex]) || inputContainer[lastIndex] == "0") {
        let firstValue = counterContainer[0] //Check if value exit in counterContainer
        let secValue = counterContainer[1] //Check if operator exists in counterContainer
        let joinNum;
        if (firstIdxMinus) {
            joinArray = inputContainer.slice().join("")
        }
        
        if (!firstValue) {
            joinArray = inputContainer.slice() // Take numbers elements and join into one
            counterContainer.push(joinArray.join("")) // Push joined number to counter result
            createSpanResult(joinArray.join(""))
        }
        else if (firstValue && secValue) {
            joinNum = inputContainer.slice(0, lastIndex + 1).join("")
            counterContainer.push(Number(joinNum))
        }
        else {
            joinNum = inputContainer.slice(0, lastIndex + 1).join("")
            counterContainer.push(value)
            counterContainer.push(Number(joinNum))
        }
        inputContainer = [];
        counterInput.innerHTML = ""
    }
    // Operator span will be created regardless condition
    if (counterContainer.length == 3) { operate() }

    createOpButtons(value)
    inputContainer.push(value)
}
    }
    

}


const opButtons = document.querySelectorAll(".operators")
opButtons.forEach((button) => {
    button.addEventListener("click", operatorClick)
})

// Bonus : Create Span Element for Inputs
function createSpanResult(e) { // To CounterResult
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "span-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterResult.appendChild(spanBox)
}

function createSpanInput(e) { // TO Counter-Input
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "span-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterInput.appendChild(spanBox)
}

// 7. Create Fetch Operation Function
// This function will operate when user pressing equal button
function operate() {
    const getFirstNum = Number(counterContainer[0])
    const getOperator = counterContainer[1]
    const getOperatorObject = operators.find(oper => oper.symbol === getOperator)
    const getLastNum = Number(counterContainer[2])

    // Check if counterContainer contains complete requirement (two numbers and operator)
    if (!getOperator) {
        errorDisplay.textContent = "Please input at least one operators"
    } else if (!getFirstNum && !getLastNum && !!getLastNum != 0) {
        errorDisplay.textContent = "Please input at least two functional numbers"
    }
    else {
        errorDisplay.innerHTML = ""
        const getFunction = getOperatorObject.functionUsed // Get function from object attached

        // Create span with the result
        const resultSpan = document.createElement("span")
        let result = getFunction(getFirstNum, getLastNum)
        if (result !== undefined) {
            resultSpan.textContent = String(result)
            resultSpan.id = "result-counter"
            counterResult.innerHTML = ""
            counterResult.appendChild(resultSpan)
            // Take the calculated result to continue
            counterContainer = [result];
        }
    }
}

// Create event for equal button
const equalButton = document.querySelector("#operator-equal");
equalButton.addEventListener("click", equalButtonFunction)

function equalButtonFunction() {
    let getOperator = inputContainer[0]

    // TO handle subtration function
    if (counterContainer.length != 0 && getMinusOperation.includes(getOperator)){
        if (counterContainer[1] !== "-"){
            counterContainer.push(getOperator)
            inputContainer.shift()
            counterInput.innerHTML = ""
        } 
    }
    if (counterContainer.length == 0 && getOperatorList.includes(getOperator)) {
        errorDisplay.textContent = "Input Numbers before Operators"
    }
    else {
        let firstValue = counterContainer[0]
        let secValue = counterContainer[1]
        // Check if counterContainer is empty or does not contain operator
        if (!typeof Number(firstValue) == "number" || !secValue) {
            errorDisplay.textContent = "Please input at least one operator"
        }
        else if (inputContainer.length == 0 && counterContainer.length >= 2) {
            errorDisplay.textContent = "Please input one more number to operate"
        }
        else {
            const joinNum = inputContainer.join("")
            const allNumberSpan = document.querySelectorAll(".number-counter")
            const spanCounter = document.querySelectorAll(".span-counter")
            if (!Number(joinNum)){
                errorDisplay.textContent = "Please input appropriate number"

            } else{
                counterContainer.push(joinNum)
                inputContainer = [];
                allNumberSpan.forEach(e => e.remove())
                spanCounter.forEach(e => e.remove())
                createSpanResult(joinNum)
            }

        }

    }
    if (counterContainer.length == 3) {
        operate();
        inputContainer = [];
    };
}

// 8. Keydown Events
document.addEventListener("keydown", (e) => {
    let keyInput = e.key
    const inputOperator = getOperatorList.includes(keyInput)
    if (keyInput === "Enter" || keyInput === "=") { equalButtonFunction() }
    else if (keyInput === "Backspace") { createDelButton() }
    else if (keyInput === "c" && e.altKey) {
        e.preventDefault();
        createClearButton()
    }
    else if (Number(keyInput) || keyInput === "." || keyInput == "0") { numberButtonFunction(keyInput) }
    else if (inputOperator) { operatorButtonFunction(keyInput) }
    console.log(inputContainer)
    console.log(counterContainer)
})