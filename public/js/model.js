export async function loadModel() {
  try {
    const model = await tflite.loadTFLiteModel("./../model.tflite");
    return model;
  } catch (error) {
    console.error("Error loading TFLite model:", error);
  }
}

export function preprocessImage(image) {
  const tensor = tf.browser
    .fromPixels(image)
    .resizeNearestNeighbor([224, 224]) // Adjust according to your model's input size
    .toFloat()
    .expandDims();
  return tensor;
}

export async function classifyImage(model, imageElement) {
  const tensor = preprocessImage(imageElement);
  try {
    const predictions = await model.predict(tensor);
    return predictions.arraySync(); // Convert predictions to a JavaScript array
  } catch (error) {
    console.error("Error during prediction:", error);
  }
}
