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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = color;
    ctx.font = `${size}px "${font}"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 20;
    ctx.shadowColor = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.shadowBlur = 0;
    
    updateOrderSummary();
}

function updateNeon() {
    color = neonColorPicker.value;
    font = fontPicker.value;
    size = sizePicker.value;
    text = textInput.value;
    drawNeon();
}

neonColorPicker.addEventListener('change', updateNeon);
fontPicker.addEventListener('change', updateNeon);
sizePicker.addEventListener('input', updateNeon);
textInput.addEventListener('input', updateNeon);

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Dynamically add the form-name input to ensure Netlify recognizes the form
    const formNameInput = document.createElement('input');
    formNameInput.type = 'hidden';
    formNameInput.name = 'form-name';
    formNameInput.value = 'orderForm';
    this.appendChild(formNameInput);

    const formData = new FormData(this);
    const orderData = {};
    formData.forEach((value, key) => { orderData[key] = value; });

    // Submit to the Netlify endpoint
    fetch('/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Redirect or display a success message
        alert('Thank you for your order!');
        // Optionally, redirect to a thank-you page
        // window.location.href = '/thank-you.html';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was a problem with your order. Please try again.');
    });
});

updateNeon(); // Initial setup
