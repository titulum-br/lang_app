/**
 * This script generates images using a local ComfyUI instance (assumed to be running on 127.0.0.1:8188).
 * It reads prompts and configuration from `image_config.json`.
 * For each prompt, it generates a specified number of images (`tries`),
 * using a workflow defined in `basic_img_gen.json`.
 * Each image generation uses a unique seed based on the current time and the try number.
 * The generated images are saved to the `generated_images` directory.
 */

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const API_URL = "http://127.0.0.1:8188";

// Load the workflow template
const workflow = JSON.parse(fs.readFileSync('basic_img_gen.json', 'utf8'));

async function generateImage(prompt, negativePrompt, outputName, seed) {
    // Update the workflow with the new prompts and seed
    workflow['6'].inputs.text = prompt;
    workflow['7'].inputs.text = negativePrompt;
    workflow['3'].inputs.seed = seed; // Update the seed in KSampler

    // Send the workflow to ComfyUI
    const response = await fetch(`${API_URL}/prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: workflow })
    });
    
    const { prompt_id } = await response.json();
    console.log(`Generating image with prompt: ${prompt} (seed: ${seed})`);

    // Wait for the image to be generated
    while (true) {
        const history = await fetch(`${API_URL}/history/${prompt_id}`).then(r => r.json());
        if (history[prompt_id]?.outputs?.['9']?.images) {
            const imageData = history[prompt_id].outputs['9'].images[0];
            const imageResponse = await fetch(
                `${API_URL}/view?filename=${imageData.filename}&subfolder=${imageData.subfolder}&type=output`
            );
            const imageBuffer = await imageResponse.buffer();
            fs.writeFileSync(outputName, imageBuffer);
            console.log(`Image saved as ${outputName}`);
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function main() {
    try {
        // Load configuration
        const config = JSON.parse(fs.readFileSync('image_config.json', 'utf8'));
        
        // Create output directory if it doesn't exist
        const outputDir = 'generated_images';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // Base seed for random number generation
        const baseSeed = Date.now();

        // Generate images for each prompt
        for (const { filename, prompt, negative_prompt, tries } of config.prompts) {
            for (let i = 0; i < tries; i++) {
                // Generate a unique seed for each try
                const seed = baseSeed + (i * 1000);
                const outputName = path.join(outputDir, `${filename}-${i + 1}.png`);
                await generateImage(prompt, negative_prompt, outputName, seed);
            }
        }

        console.log('All images generated successfully!');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main(); 