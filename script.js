// Get elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snapButton = document.getElementById('snap');
const manifestList = document.getElementById('manifest-list');

// Start camera
navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error('Camera error:', err);
        alert('Couldn’t access camera. Check permissions!');
    });

// Snap photo and process
snapButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    const imageData = canvas.toDataURL('image/jpeg');
    
    // Simulate sending to LLM (replace with real API call later)
    processImage(imageData).then(result => {
        addToManifest(result);
    });
});

// Mock LLM processing (replace with actual API)
async function processImage(imageData) {
    // Placeholder: Simulate LLM response
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                product: 'Coca-Cola 12oz',
                price: 1.99,
                sku: '12345'
            });
        }, 1000); // Fake delay
    });
}

// Add to manifest list
function addToManifest(item) {
    const li = document.createElement('li');
    li.textContent = `${item.product} - €${item.price} (SKU: ${item.sku})`;
    manifestList.appendChild(li);
}