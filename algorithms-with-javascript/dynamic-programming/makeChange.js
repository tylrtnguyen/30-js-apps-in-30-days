const cache = {};
const coins = [10, 6, 1];

const makeChange = (amount) => {
    if(cache[amount]) return cache[amount];
    let minCoins = -1;

    console.log('Amount',amount);

    coins.forEach(coin => {
        if(amount - coin >= 0) {
            let currMinCoins = makeChange(amount - coin);
            if(minCoins === -1 || currMinCoins < minCoins) {
                minCoins = currMinCoins;
                console.log('Min coins:',minCoins);
            }
        }
        
    });
    cache[amount] = minCoins + 1;
    return cache[amount];
}

console.log(makeChange(12))