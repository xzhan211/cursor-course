import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables');
}

// Create schema for the structured output
const schema = z.object({
  summary: z.string().describe("A concise summary of what the GitHub repository is about"),
  cool_facts: z.array(z.string()).describe("A list of interesting facts or key features from the repository")
});

// Create output parser from schema
const parser = StructuredOutputParser.fromZodSchema(schema);

// Create the prompt template with formatting instructions
const prompt = PromptTemplate.fromTemplate(`
Summarize this GitHub repository from the README file content below.

{format_instructions}

README Content:
{readme_content}
`);

// Create the model with API key
const model = new ChatOpenAI({
  temperature: 0.3,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY
});

// Create the chain
const chain = RunnableSequence.from([
  {
    format_instructions: () => parser.getFormatInstructions(),
    readme_content: (input) => input.readme_content
  },
  prompt,
  model,
  parser
]);

export async function analyzeReadme(readmeContent) {
  try {
    // Run the chain and get structured output
    const result = await chain.invoke({
      readme_content: readmeContent
    });
    
    return result;
  } catch (error) {
    console.error('Error analyzing readme:', error);
    throw error;
  }
} 