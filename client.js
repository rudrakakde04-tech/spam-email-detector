// 1. Initialize the classifier
const classifier = bayes();

// 2. Training the model with sample data on startup
function trainModel() {
    // Spam examples
    classifier.learn('win money cash prize free reward click', 'spam');
    classifier.learn('congratulations you won lottery claim now', 'spam');
    classifier.learn('urgent account verification needed bank', 'spam');
    classifier.learn('cheap pharmacy meds discount buy', 'spam');

    // Ham (Normal) examples
    classifier.learn('hello how are you meeting tomorrow', 'ham');
    classifier.learn('project update report attached thanks', 'ham');
    classifier.learn('dinner tonight at 7 pm', 'ham');
    classifier.learn('can you send me the files for the review', 'ham');
    
    console.log("NLP Model trained in-browser.");
}

// Run training immediately
trainModel();

function checkSpam() {
    const text = document.getElementById('emailInput').value;
    const resultBox = document.getElementById('result');
    const categoryText = document.getElementById('categoryText');
    const indicatorBar = document.getElementById('indicatorBar');

    if (!text.trim()) {
        alert("Please enter some email text to analyze.");
        return;
    }

    // 3. Perform the NLP classification locally
    const category = classifier.categorize(text);

    // 4. Update the UI
    resultBox.classList.remove('hidden');
    categoryText.innerText = category.toUpperCase();

    if (category === 'spam') {
        categoryText.className = 'spam-text';
        indicatorBar.style.width = '100%';
        indicatorBar.style.backgroundColor = '#d93025';
    } else {
        categoryText.className = 'ham-text';
        indicatorBar.style.width = '100%';
        indicatorBar.style.backgroundColor = '#188038';
    }
}
