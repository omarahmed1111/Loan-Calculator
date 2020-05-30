// Listen to submit
document.getElementById('loan-form').addEventListener('submit', caculateResults);

// Calculate results
function caculateResults(e){
    // UI vars
    const UIamount = document.getElementById('amount'); 
    const UIinterest = document.getElementById('interest');
    const UIyears = document.getElementById('years');
    const UImonthlyPayment = document.getElementById('monthly-payment');
    const UItotalPayment = document.getElementById('total-payment');
    const UItotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(UIamount.value);
    const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(UIyears.value) * 12;

    // Compute the monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)){
        UImonthlyPayment.value = monthly.toFixed(2);
        UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Please Enter valid numbers');
    }

    e.preventDefault();
}

// Show error
function showError(errorMsg){
    // Create a div
    const errorDiv = document.createElement('div');
    
    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(errorMsg));

    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // Insert errorDiv above heading
    card.insertBefore(errorDiv, heading);

    // Clear error ater 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError(){
    document.querySelector('.alert').remove();
}


