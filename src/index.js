import { VertexAI, HarmCategory, HarmBlockThreshold } from '@google-cloud/vertexai'
import 'dotenv/config'
import chalk from 'chalk';
import { input } from '@inquirer/prompts';



const PROJECT_ID = '***ProjectId***'
const LOCATION = 'europe-west1';

// Initialize Vertex AI with the necessary project and location information once
const vertexAiOptions = { project: PROJECT_ID, location: LOCATION };
const vertex_ai = new VertexAI(vertexAiOptions);

// Define model name
const MODEL_NAME = 'gemini-pro';

// Safety settings can be moved outside of the model instantiation,
// if they are static and reused across multiple instances
const safetySettings = [{
  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
}];

// Instantiate models once outside of functions to avoid repeated initializations
const generativeModelOptions = {
  model: MODEL_NAME,
  safety_settings: safetySettings,
  generation_config: { max_output_tokens: 256 },
};
const generativeModel = vertex_ai.preview.getGenerativeModel(generativeModelOptions);

function streamGenerateContent(question) {
  const request = {
    contents: [{ role: 'user', parts: [{ text: question }] }],
  };

  return (async () => {
    try {
      const streamingResp = await generativeModel.generateContentStream(request);
      let response = ""
      for await (const item of streamingResp.stream) {
       response+=item.candidates[0].content.parts[0].text;
      }
      console.log(chalk.greenBright(response))
    } catch (error) {
      console.error('An error occurred during content generation:', error);
    }
  })();
}

console.log(chalk.magentaBright("~ Welcome to AI with Patty ~"))

const question = await input({ message: 'What would you like to ask?' });

streamGenerateContent(question)
