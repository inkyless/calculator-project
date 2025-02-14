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
    return Number(a) / Number(b)
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

const resultDisplay = document.querySelector(".result-display")


// Create Clear Button to clear all inputs
function createClearButton() {
    const clearButton = document.createElement("button")
    clearButton.textContent = "Clear"
    clearButton.addEventListener("click", () => {
        numContainer = [];
        counterResult.innerHTML = "";
    })
    opButton.appendChild(clearButton)
}

// Create Reset Button to clear all inputs including the results
function createResetButton() {
    const resetButton = document.createElement("button")
    resetButton.textContent = "Reset"
    resetButton.addEventListener("click", () => {
        resultDisplay.innerHTML = ""
        numContainer = [];
        counterResult.innerHTML = "";
    })
    opButton.appendChild(resetButton)
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

// Create number Buttons from (0-9)
function createNumButtons() {
    for (let i = 0; i < 10; i++) {
        const createButton = document.createElement("button")
        createButton.setAttribute("id", `number-${i}`)
        createButton.setAttribute("class", `numbers`)
        createButton.value = i
        createButton.textContent = i;
        numButton.appendChild(createButton)
    }
    const numberButtons = document.querySelectorAll(".numbers")
    numberButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            // Add the inputed button to counter display]
            const numValue = Number(e.target.value)
            numContainer.push(numValue)
            const spanBox = document.createElement("span")
            spanBox.setAttribute("class", "input-counter")
            spanBox.value = numValue
            spanBox.textContent = numValue
            counterResult.appendChild(spanBox)
        })
    })

}



// Create Operators Numbers
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
        if (item.isEqual) {
            createButton.setAttribute("class", `equals`)

        } else {
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
            spanBox.value = opValue
            spanBox.textContent = opValue
            counterResult.appendChild(spanBox)

            if (button.classList.contains("operators")) {
                const getOperatorList = [...operators.map((item) => item.symbol)] // Get operators availabel
                const filterOp = numContainer.filter((sub) => getOperatorList.includes(sub))
                const filterSecOp = filterOp.length > 1
                // Create a function where input second operator will use operate automatically 
                function secondOperator() {
                    numContainer.pop()
                    operate()
                    counterResult.appendChild(spanBox)
                    numContainer.push(opValue)
                }

                if (filterSecOp) {
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
    const getIdx = Number(operatorIdx.filter((idx => parseInt(idx) > -1)))
    const operatorValue = numContainer[getIdx]
    // Create variable for fist and last number
    let getfirstNum = Number(numContainer.slice(0, getIdx).join(""))
    let getLastNum = Number(numContainer.slice(Number(getIdx) + 1).join(""))

    // Assign function for each operators symbol
    const assignOperator = operators.find(oper => oper.symbol === operatorValue)
    const getFunction = assignOperator.functionUsed

    // Return calculate result
    let result = getFunction(getfirstNum, getLastNum)
    counterResult.textContent = result

    // Clear the counter display 
    numContainer = [result];
}




// Main Function
createNumButtons()
createOpButtons()
createClearButton()
createDelButton()
createResetButton()

const equalButton = document.querySelector("#operator-equal");
equalButton.addEventListener("click", operate)



