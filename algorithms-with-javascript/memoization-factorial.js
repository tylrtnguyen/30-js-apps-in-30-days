const memoization = (fn) => {
	let cache = {};
	return (...args) => {
		let n = args[0];
		if(n in cache) {
			console.log('Fetching result from cache:',n);
			return cache[n];
		}
		else {
			console.log('Calculating the result:', n);
			let result = fn(n);
			cache[n] = result;
			return result;	
		}
	}
}

const factorial = memoization(
	(x) => {
		if(x === 0){
			return 1;
		}
		else {
			return x*factorial(x-1);
		}
	}
)

console.log(factorial(6)) // Expect 720
console.log(factorial(5)) // Expect 120;
