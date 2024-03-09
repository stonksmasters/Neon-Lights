const canvas = document.getElementById('neonCanvas');
const ctx = canvas.getContext('2d');
const neonColorPicker = document.getElementById('neonColorPicker');
const fontPicker = document.getElementById('fontPicker');
const sizePicker = document.getElementById('sizePicker');
const textInput = document.getElementById('textInput');
const customTextElement = document.getElementById('customText');
const colorNameElement = document.getElementById('colorName');
const sizeValueElement = document.getElementById('sizeValue');
const fontNameElement = document.getElementById('fontName');
const backgroundImage = new Image();

// Specify your background image path here
backgroundImage.src = '/assets/livingroom.jpg';

let color = neonColorPicker.value;
let font = fontPicker.value;
let size = sizePicker.value;
let text = textInput.value;

function updateOrderSummary() {
    customTextElement.textContent = text;
    colorNameElement.textContent = neonColorPicker.options[neonColorPicker.selectedIndex].text;
    sizeValueElement.textContent = size + 'px';
    fontNameElement.textContent = font;
}

backgroundImage.onload = function() {
    drawNeon();
};

function drawNeon() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // Draw background image
    
    // Neon text settings
    ctx.fillStyle = color;
    ctx.font = `${size}px "${font}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.shadowBlur = 0; // Reset shadowBlur for next draw
    
    updateOrderSummary(); // Update the order summary with the current customization
}

function updateNeon() {
    color = neonColorPicker.value;
    font = fontPicker.value;
    size = sizePicker.value;
    text = textInput.value;
    drawNeon();
}

// Attach event listeners for real-time updates
neonColorPicker.addEventListener('change', updateNeon);
fontPicker.addEventListener('change', updateNeon);
sizePicker.addEventListener('input', updateNeon);
textInput.addEventListener('input', updateNeon);

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const orderData = {
        customerName: document.querySelector('[name="customerName"]').value,
        customerEmail: document.querySelector('[name="customerEmail"]').value,
        customerAddress: document.querySelector('[name="customerAddress"]').value,
        neonText: text,
        neonColor: color,
        neonSize: size,
        neonFont: font,
    };

    fetch('submitOrder.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Thank you for your order!');
        // Here you can redirect the user or clear the form
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Initial setup
updateNeon(); // To ensure everything is set up correctly on page load
