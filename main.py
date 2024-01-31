import requests
from time import sleep
from openai import OpenAI

client = OpenAI(api_key="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")


def getRand():
    url = "https://en.wikipedia.org/api/rest_v1/page/random/summary"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        title = data.get("title", "")
        extract = data.get("extract", "")
        if len(extract) <= 100:
            print("An error occurred. 696")
            getRand()
        else:
            return title
    else:
        print(f"An error occurred. {response.status_code}")
        getRand()

topic = getRand()

response = client.completions.create(
  model="gpt-3.5-turbo-instruct",
  prompt=f"Come up with a trivia question about {topic}. The question should be in the style of Reach for the Top trivia contest questions. The answer MUST be attached below, and cannot be none. Format questions like 'Question: (question)\n\nAnswer: (answer)'",
  max_tokens=200
)

output_text = response.choices[0].text
output_text = output_text.split("\n")
qna = []
for e in output_text:
    if e != '' and e != ' ':
        qna.append(e)

print(qna[0].split())
qna[0] = qna[0].split()

for e in qna[0]:
    print(e + " ", end="", flush=True)
    sleep(0.25)
print(qna[1])