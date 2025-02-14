// Create functions of basic for calculators
// Addition, Subtraction, Multiplication, Division

const addNum = function (a,b) {
    return Number(a) + Number(b)
}

const subNum = function (a,b) {
    return Number(a) - Number(b)
}

const mulNum = function (a,b) {
    return Number(a) * Number(b)
}

const divNum = function (a,b) {
    return Number(a) / Number(b)
}

// Create counter display for button input
const counterResult = document.querySelector(".counter-result")
const numContainer = []; // Create container to put all value inputed
let firstValue = document.querySelector(".first-num")
let operator = document.querySelector(".operator-function")
let secondValue = document.querySelector(".second-num")

// Set variable for input buttons (number and operators)
const numButton = document.querySelector(".number-button")
const opButton = document.querySelector(".operator-button")

// Create backspace button
function createDelButton(){
    const backButton = document.createElement("button")
    backButton.textContent = "BackSpace"
    backButton.addEventListener("click",()=>{
        const lastInput = document.querySelector("span:last-child")
        numContainer.pop();
        lastInput.remove(); // Remove last value inputted
        console.log(numContainer)
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
    numberButtons.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            // Add the inputed button to counter display]
            const numValue = Number(e.target.value)
            numContainer.push(numValue)
            console.log(numContainer)
            const spanBox = document.createElement("span")
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
        isEqual: false
        
    },
    {
        symbol: "-",
        meaning: "substract",
        isEqual: false

    },
    {
        symbol: "X",
        meaning: "multi",
        isEqual: false

    },
    {
        symbol: "/",
        meaning: "divide",
        isEqual: false
    },
    {
        symbol: "=",
        meaning: "equal",
        isEqual: true
    },

]

function createOpButtons() {
    operators.map((item) => {
        const createButton = document.createElement("button")
        createButton.setAttribute("id", `operator-${item.meaning}`)
        if (item.isEqual){
            createButton.setAttribute("class", `equals`)

        } else{
            createButton.setAttribute("class", `operators`)
        }
        createButton.textContent = item.symbol;
        createButton.value = item.symbol
        opButton.appendChild(createButton)
    })
    const opButtons = document.querySelectorAll(".operators")
        opButtons.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            // Add the inputed button to counter display]
            const opValue = e.target.value
            numContainer.push(opValue)
            console.log(numContainer)
            const spanBox = document.createElement("span")
            spanBox.value = opValue
            spanBox.textContent = opValue
            counterResult.appendChild(spanBox)
        })
    })

}


// This function will operate when user pressing equal button
function operate() {
    // First to seperate operator symbol from array
    const getOperator = operators.map((item)=>item.symbol) // Get operators availabel
    const equalSpan = document.querySelector(".equals")
    numContainer.pop("=") // Delete equal symbol from numContainer array
    
    const operatorInput = numContainer.filter(item=>item in getOperator)
    console.log(operatorInput)

}

createNumButtons()
createOpButtons()
createDelButton()

const addButton = document.querySelector(".operator-plus");
const subButton = document.querySelector(".operator-substract");
const mulButton = document.querySelector(".operator-mutli");
const divButton = document.querySelector(".operator-divide");
const equalButton = document.querySelector("#operator-equal");

equalButton.addEventListener("click",operate)



