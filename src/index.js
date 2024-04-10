const { VertexAI, HarmCategory, HarmBlockThreshold } = require('@google-cloud/vertexai');
require('dotenv').config();
const {Storage} = require('@google-cloud/storage');

const PROJECT_ID = '{YOUR_PROJECT_ID}'
const LOCATION = '{YOUR_LOCATION}';

// Initialize Vertex AI with the necessary project and location information once
const vertexAiOptions = { project: PROJECT_ID, location: LOCATION };
const vertex_ai = new VertexAI(vertexAiOptions);

// Define model name
const GEMINI_PRO_MODEL_NAME = 'gemini-pro';

// Safety settings can be moved outside of the model instantiation,
// if they are static and reused across multiple instances
const safetySettings = [{
  category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
}];

// Instantiate models once outside of functions to avoid repeated initializations
const generativeModelOptions = {
  model: GEMINI_PRO_MODEL_NAME,
  safety_settings: safetySettings,
  generation_config: { max_output_tokens: 256 },
};
const generativeModel = vertex_ai.preview.getGenerativeModel(generativeModelOptions);

function streamGenerateContent() {
  const request = {
    contents: [{ role: 'user', parts: [{ text: 'Tell me what is the capital of Germany?' }] }],
  };

  return (async () => {
    try {
      const streamingResp = await generativeModel.generateContentStream(request);
      for await (const item of streamingResp.stream) {
        console.log('stream chunk: ', item.candidates[0].content.parts[0]);
      }
    } catch (error) {
      console.error('An error occurred during content generation:', error);
    }
  })();
}

// Invoking the function to start the content generation process
streamGenerateContent();