// Handle Submit
document.querySelector('#bmi-form').addEventListener('submit', function (e) {
    // Hide results
    document.querySelector('#results').style.display = "none";
    document.querySelector('#loading').style.display = "block";

    setTimeout(calculateBMI, 2000);
    e.preventDefault();
})

function calculateBMI() {
    // client input elements
    // Imperial form
    const feet = document.querySelector('#feet');
    const inch = document.querySelector('#inch');
    const pound = document.querySelector('#pound');

    // Metric form
    const meter = document.querySelector('#meter');
    const kilogram = document.querySelector('#kilogram');

    // result elements
    const bmiIndex = document.querySelector('#bmi-index');
    const bodyStatus = document.querySelector('#status');

    // Get element values
    // Case 1: Imperial
    const feetValue = parseFloat(feet.value);
    const inchValue = parseFloat(inch.value);
    const poundValue = parseFloat(pound.value);
    const imperialHeight = feetValue * 12 + inchValue

    // Calculate
    const imperialResult = poundValue * 703 / (Math.pow(imperialHeight, 2))

    // Case 2: Metric
    const meterValue = parseFloat(meter.value);
    const kilogramValue = parseFloat(kilogram.value);

    // Calculate
    const metricResult = kilogramValue / Math.pow(meterValue, 2)
    console.log(metricResult)
    console.log(imperialResult)

    let result;
    if(isFinite(imperialResult)){
        result = imperialResult.toFixed(1)
    }
    else if(isFinite(metricResult)){
        result = metricResult.toFixed(1)
    }
    else {
        showError();
    }

    let status
    if(result <= 18.5){
        status = 'Underweight';
    }
    else if(result > 18.5 && result < 24.9){
        status = 'Normal weight';
    }
    else if(result >= 25 && result < 29.9){
        status ='Overweight';
    }
    else if(result >= 30 && result < 34.9){
        status = 'Obesity class 1';
    }
    else if(result >= 35 && result < 39.9) {
        status = 'Obesity class 2';
    }
    else if(result > 40){
        status = 'Obesity class 3';
    }
    else {
        status = 'undefined';
    }

    // Display result
    bmiIndex.value = result;
    bodyStatus.value = status;
    // show results
    document.querySelector('#results').style.display = 'block';
    // hide spinner
    document.querySelector('#loading').style.display = 'none';
}

// Show Error
function showError(error) {
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

function clearError() {
    document.querySelector('.alert').remove();
}

