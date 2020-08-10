function makeChange(coins, amount) {
    if(value === 0) return 0;
    coins.sort((a, b) => b - a);
    let result = {};
    let i = 0;
    while (amount > 0) {
        if (coins[i] <= amount) {
            amount -= coins[i]
            result[coins[i]] = result[coins[i]] ? ++result[coins[i]] : 1;
        } else {
            i++;
        }
    }
    const coinTotal = Object.values(result).reduce((t, n) => t + n)
    return `Total coin: ${coinTotal} (${JSON.stringify(result)})`
    
};

console.log(makeChange([5, 10, 25], 40));
console.log(makeChange([5, 25, 10], 50))
console.log(makeChange([1, 6, 10], 12))