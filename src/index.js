const cards = document.querySelectorAll(".color")
const startButton = document.querySelector("#start")
const resetButton = document.querySelector("#reset")
const winMessage = document.querySelector(".win")
const memotest = document.querySelectorAll(".item")

let pairs = ["teal", 
    "tan", 
    "black", 
    "sienna", 
    "darkred", 
    "mediumseagreen", 
    "midnightblue",
    "orange",
    "teal", 
    "tan", 
    "black", 
    "sienna", 
    "darkred", 
    "mediumseagreen", 
    "midnightblue",
    "orange"
]

const audio = document.querySelector("#audio")
audio.volume = 0.3;

let turnCounter = 0

startButton.addEventListener("click", function(){
    startButton.style.display = "none"
    displayItemColors(cards, pairs)
    hideItemColors(cards)
    resetButton.style.display = "block"
    setTimeout( () => {
        beginGame()
    }, 2500)
    turnCounter = 0
    audio.currentTime = 1
    audio.play()
})

resetButton.addEventListener("click", function() {
    resetGame()
    resetButton.style.display = "none"
    startButton.style.display = "block"
})

function displayItemColors(cards, colors){
    let randomColors = colors.sort(function () {
        return 0.5 - Math.random()
    })
    randomColors.forEach( (color, i) => {
        cards[i].classList.add(color)
        cards[i].style.opacity = "1"
    })
}

function hideItemColors(cards){
    setTimeout(() => {
        cards.forEach( (card) => {
            card.style.opacity = "0"
        })
    }, 2000)
}

let user = []

function beginGame(){
    memotest.forEach( (item) => {
        item.addEventListener("click", () => {
            item.firstElementChild.style.opacity = "1"
            user.push(item.firstElementChild)
            if (user.length === 2){
                turnCounter++
                checkUserClick(user)
            }
        })
    })
}

function checkUserClick(cardClicked){
    if (cardClicked[0].isEqualNode(cardClicked[1])){
        setTimeout( () => {
            cardClicked[0].className = "correct-card"
            cardClicked[1].className = "correct-card"
            cardClicked[0].parentElement.className = "correct-card"
            cardClicked[1].parentElement.className = "correct-card"
            checkIfGameEnded()
            return user = []
        }, 400)
    }
    else {
        setTimeout( () => {
            cardClicked[0].style.opacity = "0"
            cardClicked[1].style.opacity = "0"
            return user = []
        }, 300)    
    }
}

function checkIfGameEnded(){
    let counter = 0
    cards.forEach( (card) => {
        if (card.classList.contains("correct-card")){
            counter++
        }
        else {
            counter--
        }
    })
    if (counter === 16){
        winMessage.style.display = "block"
        winMessage.innerHTML = `It took you ${turnCounter} turns to win!`
    }
}

function resetGame(){
    winMessage.style.display = "none"
    memotest.forEach( function(item) {
        item.className = ""
        item.classList.add("item")
        item.addEventListener("click", () => {
            user = []
        })
        cards.forEach( function (card) {
            card.className = ""
        })
    })
    cards.forEach( function (card) {
        card.className = ""
        card.classList.add("color")
    })
}


