const cards = document.querySelectorAll(".card");
const startButton = document.querySelector('.start');
const gameBoard = document.querySelector('.wrapper');
const matchIceCreamsTitle = document.querySelector('h1');
const countDownTimer = document.querySelector(".timer");
const controlsEl = document.querySelector(".controls");
const flipEl = document.querySelector(".flip");
const winTimeEl = document.querySelector(".wining-time");
const winFlipEl = document.querySelector(".wining-flips");





let matchedCard;
    let firstCard;
    let secondCard;
    let disableClick;
    let time;
    let flips

    function updateTime() {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        if (seconds < 10) {
            countDownTimer.innerHTML = `&nbsp;&nbsp;Time 0${minutes} : 0${seconds}`;
        } else {
            countDownTimer.innerHTML = `&nbsp;&nbsp;Time 0${minutes} : ${seconds}`;
        }

        if (time === 15) {
            countDownTimer.style.color = "red";
        }

        if (time <= 0) {
            countDownTimer.innerHTML = `&nbsp;&nbsp;Time 00 : 00`;
            disableClick = true;
            gameOver()
        } else {
            time--;
        }

        
    }

function init(){
    matchedCard = 0
    firstCard = null
    secondCard = null
    disableClick = false 
    flips = 0 
}

function flipCard(e) {
    flips+=1
    flipEl.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; Flips : ${flips}`
    let clickedCard = e.currentTarget

    if (!disableClick && clickedCard !== firstCard) {
        clickedCard.classList.add('flip')

        if (firstCard === null) {
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
                endGame()
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

startButton.addEventListener("click", () => {
    gameBoard.classList.remove('hide');
    matchIceCreamsTitle.classList.add('hide');
    countDownTimer.classList.remove('hide');
    controlsEl.classList.remove('hide');
    time = 59;
    setInterval(updateTime, 1000);
    startButton.classList.add('hide');
});

function endGame() {
    gameBoard.classList.add('hide');
    matchIceCreamsTitle.innerHTML = "You Won!";
    winTimeEl.innerHTML = `Final Time: ${(59 - time)} seconds`;
    controlsEl.classList.add('hide');
    matchIceCreamsTitle.classList.remove('hide');
    winFlipEl.classList.remove('hide');
    winTimeEl.classList.remove('hide');
     matchIceCreamsTitle.style.color = "green";
     matchIceCreamsTitle.style.fontSize = "70px"
    winFlipEl.innerHTML = `<p>Total Flips: ${flips}</p>`
}

function  gameOver() {
    gameBoard.classList.add('hide');
    matchIceCreamsTitle.innerHTML = "You Lose!";
    controlsEl.classList.add('hide');
    matchIceCreamsTitle.classList.remove('hide');
    winFlipEl.classList.remove('hide');
    winTimeEl.classList.remove('hide');
     matchIceCreamsTitle.style.color = "red";
     matchIceCreamsTitle.style.fontSize = "70px"
    winFlipEl.innerHTML = `<p>Total Flips: ${flips}</p>`
}