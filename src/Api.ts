import { Configuration, OpenAIApi } from "openai";

let configuration: Configuration;
let openai: OpenAIApi;

export function init() {
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
        throw Error("No API key!");
    }

    configuration = new Configuration({
        organization: "org-PLOQrmXXbo0UNOqoMEwG6lKE",
        apiKey: process.env.REACT_APP_OPENAI_API_KEY
    });

    openai = new OpenAIApi(configuration);
}

export async function getStoryText(_prompt: string) {
    return openai.createCompletion({ 
        model: "text-davinci-003",
        prompt: _prompt,
        max_tokens: 4000
    });
}

export async function getStoryImage(_prompt: string) {
    return openai.createImage({
        prompt: _prompt,
        n: 1
    });
}
