const axios = require("axios");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
// const {
//   CheerioWebBaseLoader,
// } = require("langchain/document_loaders/web/cheerio");

const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

// const { MemoryVectorStore } = require("langchain/vectorstores/memory");

const { Pinecone } = require("@pinecone-database/pinecone");
const { PineconeStore } = require("langchain/vectorstores/pinecone");
const { VectorDBQAChain } = require("langchain/chains");

// const { RetrievalQAChain } = require("langchain/chains");
// const { ChatOpenAI } = require("langchain/chat_models/openai");
const { OpenAI } = require("langchain/llms/openai");

async function fetchWhat(question) {
  // add all links
  const linkArrays = [];
  const pinecone = new Pinecone();
  const index = pinecone.Index("cairo-pilot");
  const embeddings = new OpenAIEmbeddings();

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });

  console.log("vectorStore", vectorStore);
  const model = new OpenAI({
    modelName : "gpt-3.5-turbo"
  });
  const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
    k: 5,
    returnSourceDocuments: true,
  });

  const response = await chain.call({
    query: question,
  });

  console.log(response);
  // change to pinecone-database from in memory and then check pinecone compatiblity with lanhcgain seeing the pinecone prompts and stroing using langchain
  // ref : https://js.langchain.com/docs/integrations/vectorstores/pinecone
  // const vectorStore = await MemoryVectorStore.fromDocuments(
  //   splitDocs,
  //   embeddings
  // );
}

fetchWhat();
