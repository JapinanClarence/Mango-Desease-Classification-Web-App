export async function loadModel() {
    const model = await tflite.loadTFLiteModel('./model.tflite');
    return model;
}

export function preprocessImage(image) {
    let tensor = tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224]) // Adjust according to your model's input size
        .toFloat()
        .expandDims();
    return tensor;
}

export async function classifyImage(model, imageElement) {
    const tensor = preprocessImage(imageElement);
    const predictions = await model.predict(tensor);
    return predictions;
}
