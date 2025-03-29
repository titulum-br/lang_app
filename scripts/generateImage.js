const fs = require('fs');
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');

// Define the API endpoint
const API_URL = "http://127.0.0.1:8188";

async function generateImage() {
    try {
        console.log('Starting image generation process...');
        
        // Check if ComfyUI is running
        try {
            const healthCheck = await fetch(`${API_URL}/system_stats`);
            if (!healthCheck.ok) {
                throw new Error(`ComfyUI is not running or not accessible at ${API_URL}`);
            }
            console.log('ComfyUI is running and accessible');
        } catch (error) {
            console.error('Error connecting to ComfyUI:', error.message);
            console.log('Please make sure ComfyUI is running and accessible at http://127.0.0.1:8188');
            return;
        }

        // Load your workflow JSON
        console.log('Loading workflow from basic_img_gen.json...');
        const workflow = JSON.parse(fs.readFileSync('basic_img_gen.json', 'utf8'));
        console.log('Workflow loaded successfully');

        // Modify the workflow with your specific inputs
        // For example, set the text prompt
        workflow['6'].inputs.text = "A scenic landscape with mountains blue   ";
        console.log('Workflow modified with new prompt');

        // Send the workflow to the ComfyUI API
        console.log('Sending workflow to ComfyUI API...');
        const response = await fetch(`${API_URL}/prompt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: workflow })
        });
        
        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }
        
        const responseData = await response.json();
        console.log('Received response from API:', responseData);

        // Extract the prompt ID
        const promptId = responseData.prompt_id;
        console.log('Prompt ID:', promptId);

        // Poll the API to check if the image generation is complete
        console.log('Starting to poll for completion...');
        let historyData;
        let attempts = 0;
        const maxAttempts = 60; // 1 minute timeout

        while (attempts < maxAttempts) {
            console.log(`Polling attempt ${attempts + 1}/${maxAttempts}`);
            const historyResponse = await fetch(`${API_URL}/history/${promptId}`);
            historyData = await historyResponse.json();
            
            // Log the history data for debugging
            console.log('History data:', JSON.stringify(historyData, null, 2));
            
            // Check if the output exists and has images
            if (historyData && historyData[promptId] && historyData[promptId].outputs && 
                historyData[promptId].outputs['9'] && historyData[promptId].outputs['9'].images) {
                console.log('Image generation completed!');
                break;
            }
            
            attempts++;
            // Wait for a second before polling again
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (attempts >= maxAttempts) {
            throw new Error('Timeout waiting for image generation');
        }

        // Retrieve the generated image
        console.log('Retrieving generated image...');
        const imageData = historyData[promptId].outputs['9'].images[0];
        console.log('Image data:', imageData);
        
        const imageResponse = await fetch(
            `${API_URL}/view?filename=${imageData.filename}&subfolder=${imageData.subfolder}&type=output`
        );
        
        if (!imageResponse.ok) {
            throw new Error(`Failed to retrieve image: ${imageResponse.status}`);
        }
        
        const imageBuffer = await imageResponse.buffer();
        console.log('Image retrieved successfully');

        // Save the image
        fs.writeFileSync('generated_image.png', imageBuffer);
        console.log('Image saved as generated_image.png');

        // Open the image with the system's default viewer
        console.log('Opening generated image...');
        if (process.platform === 'win32') {
            require('child_process').exec('start generated_image.png');
        } else if (process.platform === 'darwin') {
            require('child_process').exec('open generated_image.png');
        } else {
            require('child_process').exec('xdg-open generated_image.png');
        }

        console.log('Process completed successfully!');

    } catch (error) {
        console.error('Error generating image:', error.message);
        if (error.stack) {
            console.error('Stack trace:', error.stack);
        }
    }
}

// Run the function
console.log('Starting script...');
generateImage(); 