
// Define the class names
const classNames = ['Anthracnose', 'Healthy', 'Powdery Mildew', 'Sooty Mould'];

// Load the TensorFlow.js model
export async function loadModel() {
    try {
        const model = await tf.loadLayersModel('./app/model.json');
        return model;
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

// Preprocess the input image
export function preprocessImage(image) {
    const tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([240, 240])  // Adjust according to your model's input size
        .toFloat()
        .div(tf.scalar(255.0))
        .expandDims();
    return tensor;
}

// Classify the image and return the class name
export async function classifyImage(model, imageElement) {
    const tensor = preprocessImage(imageElement);
    try {
        const predictions = await model.predict(tensor);
        const scores = predictions.softmax().arraySync()[0];

        // Find the index of the highest score
        const predictedClassIndex = scores.indexOf(Math.max(...scores));
        
        // Get the class name
        const className = classNames[predictedClassIndex];
        const confidence = (Math.max(...scores) * 100).toFixed(2);

        return {
            className: className,
            confidence: confidence
        };
    } catch (error) {
        console.error('Error during prediction:', error);
    }
}