const front = 'card-front'
const back = 'card-back'
const Card = 'card'
const Icon = 'icon'

let kittens = [
    'cat1',
    'cat2',
    'cat3',
    'cat4',
    'cat5',
    'cat6',
    'cat7',
    'cat8',
    'cat9',
    'cat10'
]

let cards = null
startGame()

function startGame() {
    cards = createCardsFromKittens(kittens)
    shuffleCards(cards)
    
    
    initializeCards(cards)
}

function initializeCards(cards) {
    let gameBoard = document.getElementById('gameBoard')
    cards.forEach(card =>{
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(Card)
        cardElement.dataset.icon = card.icon
        createCardContent(card, cardElement)
        cardElement.addEventListener('click', flipCard)

        gameBoard.appendChild(cardElement)
    })
    
    
}
function createCardContent(card, cardElement) {
    createCardFace(front, card, cardElement)
    createCardFace(back, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face === front) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(Icon)
        iconElement.src = './assets/' + card.icon + '.png'
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}


function shuffleCards(cards) {
    let currentIndex = cards.length
    let randonIndex = 0
    while (currentIndex != 0) {
        randonIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [cards[randonIndex], cards[currentIndex]] = [cards[currentIndex], cards[randonIndex]]
    }
}


createCardsFromKittens(kittens)
function createCardsFromKittens(kitten) {
    let cards = []
    kittens.forEach((kitten) => {
        cards.push(createPairFromKitten(kitten))
    })
    return cards.flatMap(pair => pair);
}

function createPairFromKitten(kitten) {
    return [{
        id: createIdWithKitten(kitten),
        icon: kitten,
        flipped: false
    },{
        id: createIdWithKitten(kitten),
        icon: kitten,
        flipped: false}
    ]   
}
function createIdWithKitten(kitten) {
    return kitten + parseInt(Math.random() * 1000)
}

function flipCard() {
    this.classList.add('flip')
}


