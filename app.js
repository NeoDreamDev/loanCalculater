// Liten for Submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.getElementById('results').style.display = "none";

    // Show loader when 
    document.getElementById('loading').style.display = "block";

    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

// Calculate Results
function calculateResults() {
    console.log('Calculating...');

    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value); //taking amount from the input field and getting the value
    const calcInterest = parseFloat(interest.value) / 100 / 12;
    const calcPayments = parseFloat(years.value) * 12;

    // compute the monthly payments
    const x = Math.pow(1 + calcInterest, calcPayments);
    const monthly = (principal * x * calcInterest) / (x - 1);

    // find if this number is a finite number
    if (isFinite(monthly)) {
        // display results - toFixed sets the number of decimals
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calcPayments).toFixed(2);
        totalInterest.value = ((monthly * calcPayments) - principal).toFixed(2);

        // SHow the Results
        document.getElementById('results').style.display = "block";
        // hide the spinner loading icon
        document.getElementById('loading').style.display = "none";

    } else {
        // if this isnt finite then something went wrong so there will be an error
        // console.log('CHECK YOUR NUMBERS BRUH!');
        showError('Yo check your numbers, something is wrong!');
    }


}

// Show error
function showError(error) {

    // Show the Results
    document.getElementById('results').style.display = "none";
    // hide the spinner loading icon
    document.getElementById('loading').style.display = "none";

    // Create Div
    const errorDiv = document.createElement('div');

    /// Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add A Class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to the div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear Error after 3 seconds
    setTimeout(clearError, 3000);

    // Clear Error
    function clearError() {
        document.querySelector('.alert').remove();
    }
}