function calculateEligibility() {
    // Get input values
    let grossSalary = parseFloat(document.getElementById("grossSalary").value);
    let pfDeduction = parseFloat(document.getElementById("pfDeduction").value);
    let itDeduction = parseFloat(document.getElementById("itDeduction").value);
    let otherDeductions = parseFloat(document.getElementById("otherDeductions").value);
    let existingEMIs = parseFloat(document.getElementById("existingEMIs").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value);
    let loanTenure = parseFloat(document.getElementById("loanTenure").value);

    // Validate inputs
    if (isNaN(grossSalary) || isNaN(pfDeduction) || isNaN(itDeduction) || isNaN(otherDeductions) || isNaN(existingEMIs) || isNaN(interestRate) || isNaN(loanTenure)) {
        document.getElementById("result").innerHTML = "Please fill out all fields correctly.";
        return;
    }

    // Total statutory deductions
    let totalDeductions = pfDeduction + itDeduction + otherDeductions;

    // Net Take Home Pay after deductions (before EMIs)
    let netTakeHomePayBeforeEMIs = grossSalary - totalDeductions;

    // Loan tenure in months
    let tenureInMonths = loanTenure * 12;

    // Prompt for loan amount and calculate proposed EMI
    let loanAmount = prompt("Enter the loan amount you are applying for (₹):");
    let monthlyInterestRate = interestRate / (12 * 100);
    let proposedEMI = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths)) / 
                      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    // Final NTHP after deducting existing EMIs and proposed EMI
    let finalNetTakeHomePay = netTakeHomePayBeforeEMIs - existingEMIs - proposedEMI;

    // Determine minimum NTHP percentage based on salary slabs
    let minNTHPPercentage;
    let minNTHP;
    if (grossSalary <= 50000) {
        minNTHPPercentage = 0.4;  // 40%
    } else if (grossSalary > 50000 && grossSalary <= 100000) {
        minNTHPPercentage = 0.3;  // 30%
        minNTHP = 20000;  // Minimum NTHP: ₹20,000
    } else if (grossSalary > 100000) {
        minNTHPPercentage = 0.25;  // 25%
        minNTHP = 30000;  // Minimum NTHP: ₹30,000
    }

    // Required minimum NTHP
    let requiredNTHP = grossSalary * minNTHPPercentage;

    // Eligibility check
    if (finalNetTakeHomePay < requiredNTHP || (minNTHP && finalNetTakeHomePay < minNTHP)) {
        document.getElementById("result").innerHTML = `Sorry, your NTHP after deductions is ₹${finalNetTakeHomePay.toFixed(2)}. It does not meet the required criteria.`;
        return;
    }

    // If eligible
    document.getElementById("result").innerHTML = `Congratulations! Your final NTHP is ₹${finalNetTakeHomePay.toFixed(2)}. Your proposed EMI is ₹${proposedEMI.toFixed(2)}.`;
}
