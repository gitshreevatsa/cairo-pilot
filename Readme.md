## Introduction
Cairo is an evolving language developed by Starkware that has gone through ground breaking changes over its lifetime. The improvement of syntax and semantics from Cairo 0 to Cairo 1 and the following versions were a great advancements.
However the complexity of the language and the concepts of starknet which are slightly varies from other L2s make it difficult for new programmers willing to enter cairo and starknet ecosystem.
Addressing this requirement we have designed a Copilot/AI  which is dedicated to generating text and code responses which is up to date with the current tech specifications of starknet.
The AI is capable of completing code, answer conceptual questions and queries around Starknet infrastructure questions.

![image_2023-12-07_13-05-29](https://github.com/gitshreevatsa/cairo-pilot/assets/55878940/68a37f33-e16d-4d5f-acc1-9d68cbdb3139)



## Tech stack
- Cairo smart contracts (sourced from github repos of openzeppelin,cairo book and starknet book)
- Pinecone vector DB - to store trained data
- Embedding generator - GPT 4
- AI Pipeline - Langchain
- JS stack - PERN
## Demo Video

## Usage
- We have deployed a frontend for users to query from(widget is in work)
- Link - 
- Or hit the open endpoint with any custom application like an extention for VS code or a widget 
```
https://url.com/?q={querystring}
```
![image](https://github.com/gitshreevatsa/cairo-pilot/assets/55878940/3ec29e67-fafb-48f3-b5f1-f748b74f8e70)

## Applications
- Docs Intelligent search
- Updated information of cairo and starknet always available to new devs who want to learn. Easy lookup with code generation too.
- Code completion and example lookup based on logic requirements
- General Cairo/starknet specific questions
## Further Developments
- Fine tuning and generative learning powered by custom models on huggingface
- IDE extentions for realtime code completion and learning
- Integration of widget to docs of starknet and cairo for easy lookup
