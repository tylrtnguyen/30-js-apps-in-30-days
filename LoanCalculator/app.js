// Arrow functions should be declared at the beginning for hoisting
const calculateLoan = (e) => {
    // Client input elements
    const loanAmount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('year');

    // Result elements
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest')

    // Get elements' value
    const principal = parseFloat(loanAmount.value)
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal*x*calculatedInterest)/(x-1)
    let afterInterestPayment = monthly*calculatedPayments

    // Check if number is infinite
    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = afterInterestPayment.toFixed(2);
        totalInterest.value = (afterInterestPayment - principal).toFixed(2);
        // Show results
         document.querySelector('#results').style.display = "block";
         // Hide spinner
         document.querySelector('#loading').style.display = "none";
    } else {
        showError();
    }

    e.preventDefault();
}


// Show Error
const showError = (error) => {
    // Hide results
    document.querySelector('#results').style.display = "none";
    // Hide spinner
    document.querySelector('#loading').style.display = "none";
    // Create a Div
    const errorDiv = document.createElement('div');

    // Get elements
    const card = document.querySelector('.card')
    const form = document.querySelector('#loan-form')

    // Add class
    errorDiv.className = 'alert alert-danger';

    error = "Please check you input";

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    // Insert after heading
    card.insertBefore(errorDiv, form);

    // Clear Error
    setTimeout(clearError, 3000)
}

const clearError = () =>{
    document.querySelector('.alert').remove();
}

// Handle submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.querySelector('#results').style.display = "none";
    // Show loader
    document.querySelector('#loading').style.display = "block";

    setTimeout(calculateLoan, 2000);
    e.preventDefault();

})

