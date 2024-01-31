let stop = false;
async function halt() {
    stop = true;
}

async function getRand(apiUrl) {
        const response = await axios.get(apiUrl);
        if (response.status === 200) {
            const data = response.data;
            const title = data.title || '';
            const extract = data.extract || '';
            return title;
        } else {
            console.log(`An error occurred. ${response.status}`);
            await getRand();
        }
    }

function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    return match ? match[1] : null;
}

async function generateTriviaQuestion() {

    var apiKey = getCookie("apikey");
    const apiUrl = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';
    const openaiUrl = 'https://api.openai.com/v1/completions';
    let difficulty = document.getElementById("difficulty").value; 
    letAct = "";
    let topic = "";
    console.log(topic);
    if (document.getElementById("topic").value != "" && document.getElementById("topic").value != " ") {
        topic = document.getElementById("topic").value;
    } else {
        topic = await getRand(apiUrl);
    }
    console.log(topic);
        const openaiData = {
            model: 'gpt-3.5-turbo-instruct',
            prompt: `Come up with a ${difficulty} trivia question about ${topic}. The question should be in the style of Reach for the Top trivia questions. The answer should be short, MUST be attached below, and cannot be none. Format questions like 'Question: (question)\n\nAnswer: (answer)'. Do not repeat questions.`,
            max_tokens: 200
        };

        const response = await axios.post(openaiUrl, openaiData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        const outputText = response.data.choices[0].text;
        const qna = outputText.split('\n').filter(e => e !== '' && e !== ' ');
        var questionRes = [];
        questionRes = qna[0].split(" ")
        var catalogueContainer = document.getElementById("questionsActive"); 
        for (const word of questionRes) {
            if (word != "Question:") {
                letAct = letAct + word + ' ';
                catalogueContainer.innerHTML = letAct
                await new Promise(resolve => setTimeout(resolve, 250));
                if (stop) {
                    break;
                }
            }
        }
        stop = false;

    console.log(qna[1]);
}