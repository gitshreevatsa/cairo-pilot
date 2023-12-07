const express = require("express");

const { Pinecone } = require("@pinecone-database/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAI } = require("langchain/llms/openai");
const cors = require("cors");
const { VectorDBQAChain } = require("langchain/chains");

const app = express();

const port = 3000;
app.use(cors());
app.get("/", async (req, res) => {
  const response = await fetchWhat(req.query.q);
  res.send(response);
});

async function fetchWhat(question) {
  const pinecone = new Pinecone({
    environment: "gcp-starter",
    apiKey: "6ed07b86-295c-4f80-9598-efeadf7cbf7c",
  });
  const index = pinecone.Index("cairo-pilot");
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "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",
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });

  console.log("vectorStore", vectorStore);
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
  });
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 5,
    returnSourceDocuments: true,
  });

  const response = await chain.call({
    query: question,
  });

  console.log(response);
  return response[0];
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//
