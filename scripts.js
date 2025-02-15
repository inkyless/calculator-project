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
let numContainer = []; // Create container to put all value inputed
let firstValue = document.querySelector(".first-num")
let operator = document.querySelector(".operator-function")
let secondValue = document.querySelector(".second-num")

// Set variable for input buttons (number and operators)
const numButton = document.querySelector(".number-button")
const opButton = document.querySelector(".operator-button")

const resultDisplay = document.querySelector(".error-display")


// Create Clear Button to clear all inputs
function createClearButton() {
    const clearButton = document.createElement("button")
    clearButton.textContent = "Clear"
    clearButton.addEventListener("click", () => {
        numContainer = [];
        counterResult.innerHTML = "";
        resultDisplay.innerHTML = "";
    })
    opButton.appendChild(clearButton)
}


// Create backspace button
function createDelButton() {
    const backButton = document.createElement("button")
    backButton.textContent = "BackSpace"
    backButton.addEventListener("click", () => {
        const lastInput = document.querySelector("span:last-child")
        numContainer.pop();
        lastInput.remove(); // Remove last value inputted
    })
    opButton.appendChild(backButton)
}

// Create number Buttons from (0-9) and (.)
function createNumButtons() {
    // The array will be arranged in that position
    const numberInputList = [".",0,3,2,1,6,5,4,9,8,7]
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
            if (numValue === ".") {
                numContainer.push(".")
            }
            else {
                numContainer.push(numValue)
            }
            const spanBox = document.createElement("span")
            spanBox.setAttribute("class", "number-counter")
            spanBox.value = numValue
            spanBox.textContent = numValue
            counterResult.appendChild(spanBox)
        })
    })
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
        symbol: "X",
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



// Create Operators Button Function
function createOpButtons() {

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
            numContainer.push(opValue)
            const spanBox = document.createElement("span")
            spanBox.setAttribute("class", "op-counter")
            spanBox.value = opValue
            spanBox.textContent = opValue
            counterResult.appendChild(spanBox)

            // Will select buttons with "operators" class (which exclude equal buttons)
            if (button.classList.contains("operators")) {
                const getOperatorList = [...operators.map((item) => item.symbol)] // Get operators availabel
                const filterOp = numContainer.filter((sub) => getOperatorList.includes(sub))
                const filterSecOp = filterOp.length > 1
                // Create a function where input second operator will use operate automatically 
                function secondOperator() {
                    const lastCounter = counterResult.lastChild.previousSibling;
                    const checkClass = lastCounter.className
                    // Check if user input double operators consecutively
                    if (checkClass === "op-counter") {
                        resultDisplay.textContent = "Error : Will only accept one operator only"
                    } else {
                        numContainer.pop()
                        operate()
                        counterResult.appendChild(spanBox)
                        numContainer.push(opValue)
                    }
                }
                if (filterSecOp) { // Check if there is double operators detected
                    secondOperator()
                }
            }
        })
    })
}

// This function will operate when user pressing equal button
function operate() {
    // First to seperate operator symbol from array
    const getOperatorList = [...operators.map((item) => item.symbol)] // Get operators availabel

    // Get index of operator to splice the array to first and second input number
    const operatorIdx = getOperatorList.map(item => { return numContainer.indexOf(item) })
    const getIdx = Number(operatorIdx.filter((idx => parseInt(idx) > 0)))

    //Check if user input the operator or not
    if (getIdx <= 0) {
        resultDisplay.textContent = "Error : No operator inputted, please try again"
    } else {
        const operatorValue = numContainer[getIdx]
        // Create variable for fist and last number
        let getFirstNum = (numContainer.slice(0, getIdx).join(""))
        let getLastNum = (numContainer.slice(Number(getIdx) + 1).join(""))
        // Assign function for each operators symbol
        const assignOperator = operators.find(oper => oper.symbol === operatorValue)

        // Check if user input second number or not
        if (getLastNum === "") {
            resultDisplay.textContent = "Error : No second number inputted, try again"
        } 
        // Check if the inputed number could be converted to number
        else if (!Number(getLastNum) || !Number(getFirstNum)) {
            resultDisplay.textContent = "Error : Pleace Check Your Input Again"
        } 
        else { // When all conditions are fulfilled
            resultDisplay.innerHTML = ""
            const getFunction = assignOperator.functionUsed
            // Return calculate result
            let result = getFunction(getFirstNum, Number(getLastNum))
            counterResult.textContent = result

            // Take the calculated result to continue
            numContainer = [result];
        }
    }
}

// Main Function
createNumButtons()
createOpButtons()
createClearButton()
createDelButton()

// Create event for equal button
const equalButton = document.querySelector("#operator-equal");
equalButton.addEventListener("click", operate)



