const form = document.getElementById('spellcheck-form');
const inputText = document.getElementById('input-text');
const checkSpellingButton = document.getElementById('check-spelling');
const resultDiv = document.getElementById('result');

checkSpellingButton.addEventListener('click', (e) => {
    e.preventDefault();
    const text = inputText.value.trim(); //extract input :trim removes whitespace characters from input string
    if (!text) { // if text is empty
        resultDiv.textContent = 'Please enter some text';
        return; 
    }

    fetch("spellcheck?text="+ encodeURIComponent(text)).then((response)=>{
        response.json().then(data => {
            if(data.error){
                resultDiv.textContent=data.error;
            }
            else{
                resultDiv.textContent = "processing.....";
                /*const correctedText = replaceWithBestCandidate(data);*/
                resultDiv.textContent = `Corrected text: ${data.correctedText}`;
            }
        });
    });
});   


// code  for post method
    /*if (text) {
        fetch('/spellcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = "processing.....";
            const correctedText = replaceWithBestCandidate(data);
            resultDiv.textContent = `Corrected text: ${correctedText}`;
        })
        .catch(error => {
            console.error('Error:', error);  
        });
    } else {
        resultDiv.textContent = 'Please enter some text';
    }
}); */





