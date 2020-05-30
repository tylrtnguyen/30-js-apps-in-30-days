document.addEventListener('DOMContentLoaded', () => {
    const p1 = Math.floor(Math.random()*6) + 1;
    const p2 = Math.floor(Math.random()*6) + 1;
    document.querySelector('.img1').src = `images/dice${p1}.png`;
    document.querySelector('.img2').src = `images/dice${p2}.png`;

    const winner = document.getElementById('winner');

    if(p1 > p2) {
        winner.innerHTML = "Player 1 wins";
    }
    else if(p1 < p2) {
        winner.innerHTML = "Player 2 wins";
    }
    else {
        winner.innerHTML = "A draw game";
    }
})