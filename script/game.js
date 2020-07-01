let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,
    
    kittens: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5', 'cat6', 'cat7', 'cat8', 'cat9', 'cat10'],
    cards: null,

    setCard: function (id){
        let card = this.cards.filter(card=>card.id===id)[0]
        console.log(card)
        
        if (card.flipped || this.lockMode) {
            return false
        } 
        if (!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },
    CheckMatch: function (){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },
    clearCards: function (){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false  
    },

    unflipCards(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver (){
        return this.cards.filter(card => !card.flipped).length == 0
    },
    
    createCardsFromKittens: function() {
    this.cards = []
    this.kittens.forEach((kitten) => {
        this.cards.push(this.createPairFromKitten(kitten))
    })
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards()
    return this.cards
    },

    createPairFromKitten: function(kitten) {
    return [{
        id: this.createIdWithKitten(kitten),
        icon: kitten,
        flipped: false
    },{
        id: this.createIdWithKitten(kitten),
        icon: kitten,
        flipped: false}
    ]   
    },
    createIdWithKitten: function(kitten) {
        return kitten + parseInt(Math.random() * 1000)
    },

    shuffleCards: function(cards) {
    let currentIndex = this.cards.length
    let randonIndex = 0
    while (currentIndex !== 0) {
        randonIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [this.cards[randonIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randonIndex]]
        }
    }
}