const cards = document.querySelectorAll(".card");

let matchedCard
let firstCard
let secondCard
let disableClick

function init(){
    matchedCard = 0
    firstCard = null
    secondCard = null
    disableClick = false  
}

function flipCard(e) {
    let clickedCard = e.currentTarget

    if (!disableClick && clickedCard !== firstCard) {
        clickedCard.classList.add('flip')

        if (!firstCard) {
            firstCard = clickedCard
        } else {
            secondCard = clickedCard
            let firstCardImg = firstCard.querySelector("img").src
            let secondCardImg = secondCard.querySelector("img").src
            matchCards(firstCardImg, secondCardImg)
        }
    }
}

function matchCards(img1, img2) {
    disableClick = true

    if (img1 === img2) {
        matchedCard++

        if (matchedCard === 8) {
            setTimeout(() => {
                shuffleCard()
            }, 1200)
        }

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard = null
        secondCard = null
        disableClick = false
    } else {
        setTimeout(() => {
            firstCard.classList.add('shake')
            secondCard.classList.add('shake')
        }, 400);

        setTimeout(() => {
            firstCard.classList.remove('shake', 'flip')
            secondCard.classList.remove('shake', 'flip')
            firstCard = null
            secondCard = null
            disableClick = false
        }, 1200);
    }
}

function shuffleCard() {
    init()
    let imgArray = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    imgArray.sort(() => Math.random() > 0.5 ? 1 : -1)


    cards.forEach((card, index) => {
        card.classList.remove('flip')
        let imgTag = card.querySelector('img')
        imgTag.src = `memory-img/img-${imgArray[index]}.png`
        card.addEventListener('click', flipCard)
    });
}
shuffleCard()

cards.forEach(card => {
    card.addEventListener('click', flipCard)
});