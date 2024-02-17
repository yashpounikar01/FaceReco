const fileInput = document.getElementById('fileInput');
const inputImage = document.getElementById('inputImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    inputImage.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

inputImage.onload = function() {
  // Draw image on canvas
  canvas.width = inputImage.width;
  canvas.height = inputImage.height;
  ctx.drawImage(inputImage, 0, 0, inputImage.width, inputImage.height);

  // Detect faces
  const faceDetector = new FaceDetector();
  faceDetector.detect(inputImage)
    .then(faces => {
      faces.forEach(face => {
        drawFaceRectangle(face.boundingBox);
      });
    })
    .catch(error => {
      console.error('Face detection failed:', error);
    });
}

function drawFaceRectangle(box) {
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.strokeRect(box.x, box.y, box.width, box.height);
}
