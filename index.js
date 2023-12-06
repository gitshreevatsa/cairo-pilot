const axios = require("axios");
const htmlparser2 = require("htmlparser2");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const {
  CheerioWebBaseLoader,
} = require("langchain/document_loaders/web/cheerio");

const { OpenAIEmbeddings } = require("langchain/embeddings/openai");

const { MemoryVectorStore } = require("langchain/vectorstores/memory");

const { RetrievalQAChain } = require("langchain/chains");
const { ChatOpenAI } = require("langchain/chat_models/openai");

async function fetchWhat() {
  try {
    const loader = new CheerioWebBaseLoader(
      "https://book.cairo-lang.org/ch02-01-variables-and-mutability.html"
    );

    const joinedText = await loader.load();

    // console.log(codeBlocks);
    // console.log(joinedText);

    // Combine text and code
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 0,
    });

    const splitDocs = await textSplitter.splitDocuments(joinedText);
    const embeddings = new OpenAIEmbeddings();

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    console.log(vectorStore);

    const relevantDocs = await vectorStore.similaritySearch("What is Cairo?");

    console.log(relevantDocs.length);
    const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" });
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

    const response = await chain.call({
      query: "What is cairo?",
    });

    console.log(response);
  } catch (err) {
    throw new Error(err);
  }
}

fetchWhat();
