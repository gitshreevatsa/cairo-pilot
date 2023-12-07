const express = require("express");

const { Pinecone } = require("@pinecone-database/pinecone");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { OpenAI } = require("langchain/llms/openai");
const cors = require("cors");
const { VectorDBQAChain } = require("langchain/chains");

const {
  CheerioWebBaseLoader,
} = require("langchain/document_loaders/web/cheerio");

const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

// const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");

const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");
const app = express();

const port = 3000;
app.use(cors());
app.get("/", async (req, res) => {
  const response = await fetchWhat(req.query.q);
  res.send(response);
});

async function fetchWhat(question) {
  const loader = new CheerioWebBaseLoader(
    "https://book.starknet.io/ch02-09-starknet-js.html"
  );
  const data = await loader.load();
  console.log(data);
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });

  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );
  const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever(), {
    returnSourceDocuments: true,
  });

  const response = await chain.call({
    query: question,
  });
  console.log(response);
  return response;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
