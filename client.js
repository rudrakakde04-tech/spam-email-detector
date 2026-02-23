async function checkSpam() {
    const emailText = document.getElementById('emailInput').value;
    const resultBox = document.getElementById('result');
    const categoryText = document.getElementById('categoryText');
    const confidenceText = document.getElementById('confidenceText');
    const spamBar = document.getElementById('spamBar');
    const hamBar = document.getElementById('hamBar');

    if(emailText.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    // Show loading state (optional)
    resultBox.classList.remove('hidden');
    categoryText.innerText = "Analyzing...";

    try {
        const response = await fetch('/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emailText })
        });

        const data = await response.json();

        // Update UI with result
        categoryText.innerText = data.category.toUpperCase();
        
        if(data.category === 'spam') {
            categoryText.className = 'spam-text';
        } else {
            categoryText.className = 'ham-text';
        }

        // Display fake confidence for visual (since Bayes returns log probabilities)
        // In a real app, you would parse the raw probabilities properly.
        let spamProb = 50; 
        if(data.category === 'spam') spamProb = 90;
        else spamProb = 10;

        spamBar.style.width = `${spamProb}%`;
        hamBar.style.width = `${100 - spamProb}%`;
        
        confidenceText.innerText = "Analysis Complete";

    } catch (error) {
        console.error('Error:', error);
        categoryText.innerText = "Error";
        confidenceText.innerText = "Could not connect to server.";
    }
}
