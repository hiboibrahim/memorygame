document.addEventListener("DOMContentLoaded", function () {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    let gameArray = [];
    let flippedCards = [];

    let matchedPairs = 0;

    gameArray = colors.concat(colors);
    // sorts the array so the colours are randomly displayed

    gameArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById("gameBoard");

    for (let i = 0; i < gameArray.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.color = gameArray[i];
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);


    }
    function handleCardClick(event) {
        const clickedCard = event.target;
        // ignore click if the card as already been flipped or matched
        if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return
        }
        // show the cards
        const cardColor = clickedCard.dataset.color;
        clickedCard.style.backgroundColor = cardColor;
        clickedCard.classList.add('flipped');

        // Add card to the flippedCards array
        flippedCards.push(clickedCard);

        //check for a match

        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.dataset.color === secondCard.dataset.color) {
                // match found 
                firstCard.classList.add('matched')
                secondCard.classList.add('matched');
                matchedPairs = matchedPairs++;

                //reset flippedCards array
                flippedCards = [];

                // check for game completion
                if (matchedPairs === colors.length) {
                    alert('You won!!!!!');
                }
            } else {
                //cards don't match, flip them back over
                setTimeout(() => {
                    firstCard.style.backgroundColor = '';
                    firstCard.classList.remove('flipped');
                    secondCard.style.backgroundColor = '';
                    secondCard.classList.remove('flipped');
                    flippedCards = [];


                }, 500);
                return;
            }
        }
    }

}


)