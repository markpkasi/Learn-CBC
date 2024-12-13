async function processPayment(phone, amount) {
    const responseElement = document.getElementById("paymentMessage");

    // Validate phone number and amount
    if (!/^07\d{8}$/.test(phone)) {
        responseElement.innerText = "Invalid phone number. Please enter a valid Kenyan number.";
        responseElement.style.color = "red";
        return;
    }

    if (amount <= 0) {
        responseElement.innerText = "Amount must be greater than zero.";
        responseElement.style.color = "red";
        return;
    }

    // Send payment request to backend
    try {
        const response = await fetch("http://localhost:5000/api/mpesa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, amount }),
        });

        const result = await response.json();
        if (result.success) {
            responseElement.innerText = "Payment successful! You can now access your course.";
            responseElement.style.color = "green";
        } else {
            throw new Error(result.error || "Payment failed.");
        }
    } catch (error) {
        responseElement.innerText = Error: ${error.message};
        responseElement.style.color = "red";
    }
}

// Handle form submission
document.getElementById("paymentForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const phone = document.getElementById("phone").value;
    const amount = document.getElementById("amount").value;

    processPayment(phone, amount);
});
