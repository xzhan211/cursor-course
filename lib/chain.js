import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY in environment variables');
}

// Create schema for the structured output
const schema = z.object({
  summary: z.string().describe("A concise summary of what the GitHub repository is about"),
  cool_facts: z.array(z.string()).describe("A list of interesting facts or key features from the repository"),
  technologies: z.array(z.string()).describe("List of main technologies, frameworks, and tools used in the project"),
  purpose: z.string().describe("The main purpose or goal of this repository")
});

// Create the prompt template with formatting instructions
const prompt = PromptTemplate.fromTemplate(`
You are a technical documentation expert. Analyze this GitHub repository README and provide a structured summary.
Be specific and extract actual information from the README rather than making general statements.

README Content:
{readme_content}

Remember to:
1. Focus on concrete details from the README
2. List actual technologies mentioned
3. Extract the real purpose of the project
4. Highlight unique or interesting features
`);

// Create the model with structured output
const model = new ChatOpenAI({
  temperature: 0.3,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY
}).withStructuredOutput(schema);

// Create the chain
const chain = RunnableSequence.from([
  {
    readme_content: (input) => input.readme_content
  },
  prompt,
  model
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