// Create functions of basic for calculators
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
        counterResult.textContent = "Error";
        resultDisplay.textContent = "Divide by 0 will cause infinite result"
    } else {
        return (Number(a) / Number(b)).toFixed(4)
    }
}

// Create counter display for button input
const counterResult = document.querySelector(".counter-result")
const counterInput = document.querySelector(".counter-input")
let counterContainer = []; // Container for operation
let inputContainer = []; // Container for user input
let firstValue = document.querySelector(".first-num")
let operator = document.querySelector(".operator-function")
let secondValue = document.querySelector(".second-num")

// Set variable for input buttons (number and operators)
const numButton = document.querySelector(".number-button")
const opButton = document.querySelector(".operator-button")

const errorDisplay = document.querySelector(".error-display")

// Create Clear Button to clear all inputs
const clearButton = document.createElement("button")
clearButton.textContent = "Clear"
opButton.appendChild(clearButton)
clearButton.addEventListener("click", createClearButton)

function createClearButton() {
    inputContainer= [];
    counterContainer = [];
    counterInput.innerHTML = "Input :"
    counterResult.innerHTML = "";
    errorDisplay.innerHTML = "";
}

// Create backspace button
const backButton = document.createElement("button")
backButton.textContent = "BackSpace"
opButton.appendChild(backButton)
backButton.addEventListener("click", createDelButton)
function createDelButton() {
    const lastInput = counterInput.lastChild
    inputContainer.pop();
    if (counterInput.childElementCount !== 0) {
        lastInput.remove();
    }
}

// Create number Buttons from (0-9) and (.)
const numberInputList = [".", 0, 3, 2, 1, 6, 5, 4, 9, 8, 7]  // The array will be arranged in that position
numberInputList.reverse().map((item) => {
    const createButton = document.createElement("button")
    createButton.setAttribute("id", `number-${item}`)
    createButton.setAttribute("class", `numbers`)
    createButton.value = item
    createButton.textContent = item;
    numButton.appendChild(createButton)
})

const numberButtons = document.querySelectorAll(".numbers")
numberButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Add the inputed button to counter display
        const numValue = (e.target.value)
        const lastIndex = inputContainer.length-1
        if (numValue === ".") {
            inputContainer.push(".")
        } 
        // Check if previous elements in inputContainer contains one operators
        else if (getOperatorList.includes(inputContainer[lastIndex])&& inputContainer.length === 1){
            const getOperator = inputContainer[0]
            counterContainer.push(getOperator) // Push operator to counterContainer
            createSpanResult(getOperator)
            counterInput.innerHTML = "Input : "
            inputContainer.shift()
            inputContainer.push(numValue)
        }
        else {
            inputContainer.push(numValue)
        }
        createNumButtons(numValue)
    })
})

function createNumButtons(e) {
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "number-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterInput.appendChild(spanBox)
}

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

operators.map((item) => {
    const createButton = document.createElement("button")
    createButton.setAttribute("id", `operator-${item.meaning}`)
    if (item.isEqual) { // Will check for equal buttons
        createButton.setAttribute("class", `equals`)

    } else { // The rest of operators buttons
        createButton.setAttribute("class", `operators`)
    }
    createButton.textContent = item.symbol;
    createButton.value = item.symbol
    opButton.appendChild(createButton)
})

const opButtons = document.querySelectorAll(".operators")
opButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Add the inputed button to counter display]
        const opValue = e.target.value
        inputContainer.push(opValue)
        // Check the inputContainer has numbers inputed before operators
        let lastTwoIndex = inputContainer.length - 2// Index before operators added 
        let lastIndex = inputContainer.slice(-1) // Take only operator element
        if (Number(inputContainer[lastTwoIndex])) {
            let firstValue = counterContainer[0] //Check if value exit in counterContainer
            let secValue = counterContainer[1] //Check if operator exists in counterContainer
            let joinNum;
            if (!firstValue){
                joinNum = inputContainer.slice(0, lastTwoIndex+1).join('') // Take numbers elements and join into one
                counterContainer.push(joinNum) // Push joined number to counter result
                createSpanResult(joinNum)
            } else if(firstValue && secValue){
                joinNum = inputContainer.slice(0,lastTwoIndex+1).join("")
                counterContainer.push(Number(joinNum))
            }
            else{
                joinNum = inputContainer.slice(0,lastTwoIndex+1).join("")
                counterContainer.push(opValue)
                counterContainer.push(Number(joinNum))
            }
            counterInput.innerHTML = "Input : "
            inputContainer = lastIndex
         } 

        if (counterContainer.length==3){
            operate()
        }
        // Operator span will be created regardless condition
        if (counterContainer.length==3){ operate()}
        createOpButtons(opValue)

    })
})

// Create Operators Button Function
function createOpButtons(e) {
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "op-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterInput.appendChild(spanBox)
}

function createSpanResult(e) {
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "span-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterResult.appendChild(spanBox)
}

function createSpanInput(e) {
    const spanBox = document.createElement("span")
    spanBox.setAttribute("class", "span-counter")
    spanBox.value = e
    spanBox.textContent = e
    counterInput.appendChild(spanBox)
}


// This function will operate when user pressing equal button
function operate() {
    const getFirstNum = Number(counterContainer[0])
    const getOperator = counterContainer[1]
    const getOperatorObject = operators.find(oper => oper.symbol === getOperator)
    const getLastNum = Number(counterContainer[2])

    // Check if counterContainer contains complete requirement (two numbers and operator)
    if (!getOperator){
        errorDisplay.textContent = "Error : Please input at least one operators"
    } else if(!getLastNum || !getFirstNum){
        errorDisplay.textContent = "Error : Please input at least two functional numbers"
    } else{
        errorDisplay.innerHTML = ""
        const getFunction = getOperatorObject.functionUsed // Get function from object attached

        // Create span with the result
        const resultSpan = document.createElement("span")
        let result = getFunction(getFirstNum, Number(getLastNum))
        resultSpan.textContent = String(result)
        resultSpan.id = "result-counter"
        counterResult.innerHTML = ""
        counterResult.appendChild(resultSpan)

        // Take the calculated result to continue
        counterContainer = [result];
    }
}

// Create event for equal button
const equalButton = document.querySelector("#operator-equal");
equalButton.addEventListener("click", ()=>{
    let getOperator = inputContainer[0]

    if (getOperatorList.includes(getOperator)){
        const lastSpan = counterInput.lastChild
        lastSpan.remove()
        createSpanResult(getOperator)
    } else { 
        let firstValue = counterContainer[0]
        let secValue = counterContainer[1]
        // Check if counterContainer is empty or does not contain operator
        if (!typeof Number(firstValue) == "number" || !secValue){
            errorDisplay.textContent = "Error : Please input at least one operator"
        } else{
        const joinNum = inputContainer.join("")
        const allNumberSpan = document.querySelectorAll(".number-counter")
        counterContainer.push(joinNum)
        inputContainer = [];
        allNumberSpan.forEach(e=>e.remove())
        createSpanResult(joinNum)
        }
        
    }
    if (counterContainer.length==3){
        operate()
        inputContainer = []};
})
const getOperatorList = [...operators.map((item) => item.symbol)] // Get operators availabel

document.addEventListener("keydown", (e) => {
    let keyInput = e.key
    let getOperator = inputContainer[0]

    const inputOperator = getOperatorList.includes(keyInput)
    if (keyInput === "Enter" || keyInput === "=") { 
        if (getOperatorList.includes(getOperator)){
            const lastSpan = counterInput.lastChild
            lastSpan.remove()
            createSpanResult(getOperator)
        } else { 
            let firstValue = counterContainer[0]
            let secValue = counterContainer[1]
            // Check if counterContainer is empty or does not contain operator
            if (!typeof Number(firstValue) == "number" || !secValue){
                errorDisplay.textContent = "Error : Please input at least one operator"
            } else{
            const joinNum = inputContainer.join("")
            const allNumberSpan = document.querySelectorAll(".number-counter")
            counterContainer.push(joinNum)
            inputContainer = [];
            allNumberSpan.forEach(e=>e.remove())
            createSpanResult(joinNum)
            }
            
        }
        if (counterContainer.length==3){
            operate()
            inputContainer = []};

    }
         
    else if (keyInput === "Backspace") { createDelButton() }
    else if (keyInput === "c" && e.altKey) {
        e.preventDefault();
        createClearButton()
    }
    else if (Number(keyInput) || keyInput === "." || keyInput === "0") {
         // Add the inputed button to counter display
         const numValue = keyInput
         const lastIndex = inputContainer.length-1
         if (numValue === ".") {
             inputContainer.push(".")
         } 
         // Check if previous elements in inputContainer contains one operators
         else if (getOperatorList.includes(inputContainer[lastIndex])&& inputContainer.length === 1){
             const getOperator = inputContainer[0]
             counterContainer.push(getOperator) // Push operator to counterContainer
             createSpanResult(getOperator)
             counterInput.innerHTML = "Input : "
             inputContainer.shift()
             inputContainer.push(numValue)
         }
         else {
             inputContainer.push(numValue)
         }
         createNumButtons(numValue)
    }

    else if (inputOperator) {
        const opValue = keyInput
        inputContainer.push(opValue)
         // Check the inputContainer has numbers inputed before operators
         let lastTwoIndex = inputContainer.length - 2// Index before operators added 
         let lastIndex = inputContainer.slice(-1) // Take only operator element
         if (Number(inputContainer[lastTwoIndex])) {
            let firstValue = counterContainer[0] //Check if value exit in counterContainer
            let secValue = counterContainer[1] //Check if operator exists in counterContainer
            let joinNum;
            if (!firstValue){
                joinNum = inputContainer.slice(0, lastTwoIndex+1).join('') // Take numbers elements and join into one
                counterContainer.push(joinNum) // Push joined number to counter result
                createSpanResult(joinNum)
            } else if(firstValue && secValue){
                joinNum = inputContainer.slice(0,lastTwoIndex+1).join("")
                counterContainer.push(Number(joinNum))
            }
            else{
                joinNum = inputContainer.slice(0,lastTwoIndex+1).join("")
                counterContainer.push(opValue)
                counterContainer.push(Number(joinNum))
            }
            counterInput.innerHTML = "Input : "
            inputContainer = lastIndex
         } 

         if (counterContainer.length==3){
             operate()
         }
         // Operator span will be created regardless condition
         createOpButtons(opValue)

    }
    console.log(inputContainer)
    console.log(counterContainer)
})