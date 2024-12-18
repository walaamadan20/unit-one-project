const cards = document.querySelectorAll(".card");
const startButton = document.querySelector('.start');
const gameBoard = document.querySelector('.wrapper');
const matchTitle = document.querySelector('h1');
const countDownTimer = document.querySelector(".timer");
const controlsEl = document.querySelector(".controls");
const flipEl = document.querySelector(".flip");
const winTimeEl = document.querySelector(".wining-time");
const winFlipEl = document.querySelector(".wining-flips");
const playAgainEl = document.querySelector(".play-again");
const questionMarkEl = document.querySelector(".material-icons");
const canvas = document.querySelector('#confetti');






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
                winGame()
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
    let imgArray = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    imgArray.sort(() => Math.random() > 0.5 ? 1 : -1)


    cards.forEach((card, index) => {
        card.classList.remove('flip')
        let imgTag = card.querySelector('img')
        imgTag.src = `icecream/img-${imgArray[index]}.png`
        card.addEventListener('click', flipCard)
    });
}
shuffleCard()
init()

cards.forEach(card => {
    card.addEventListener('click', flipCard)
});




playAgainEl.addEventListener("click", () => {
    gameBoard.classList.remove('hide');
    matchTitle.classList.add('hide');
    countDownTimer.classList.remove('hide');
    controlsEl.classList.remove('hide');
    time = 59;
    flips = 0;

    // Clear the existing interval before starting a new one
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);

    startButton.classList.add('hide');
    winFlipEl.classList.add('hide');
    winTimeEl.classList.add('hide');
    playAgainEl.classList.add('hide');
    flipEl.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp; Flips : 0`
    shuffleCard()
    init()
    jsConfetti.clearCanvas()
});

let timerInterval; // Variable to store the interval ID

startButton.addEventListener("click", () => {
    shuffleCard()
init()
    gameBoard.classList.remove('hide');
    matchTitle.classList.add('hide');
    countDownTimer.classList.remove('hide');
    controlsEl.classList.remove('hide');
    time = 59;

    // Clear the existing interval before starting a new one
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);

    startButton.classList.add('hide');
});

function winGame() {
    gameBoard.classList.add('hide');
    matchTitle.innerHTML = "You Won!";
    winTimeEl.innerHTML = `Final Time: ${(59 - time)} seconds`;
    controlsEl.classList.add('hide');
    matchTitle.classList.remove('hide');
    winFlipEl.classList.remove('hide');
    winTimeEl.classList.remove('hide');
    matchTitle.style.color = "green";
    matchTitle.style.fontSize = "70px"
    winFlipEl.innerHTML = `<p>Total Flips: ${flips}</p> <br><br>`
    playAgainEl.classList.remove('hide');
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
        emojis: ['🍨', '🍧', '🍦', '🍨', '🍧', '🍦'],
    }).then(() => jsConfetti.addConfetti())
}

function  gameOver() {
    gameBoard.classList.add('hide');
    matchTitle.innerHTML = "You Lose!";
    controlsEl.classList.add('hide');
    matchTitle.classList.remove('hide');
    winFlipEl.classList.remove('hide');
    winTimeEl.classList.remove('hide');
    matchTitle.style.color = "red";
    matchTitle.style.fontSize = "70px"
    winFlipEl.innerHTML = `<p>Total Flips: ${flips}</p>`
    playAgainEl.classList.remove('hide');

}