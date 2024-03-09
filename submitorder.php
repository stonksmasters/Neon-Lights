<?php
header('Content-Type: application/json');

// Only process POST requests.
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the raw POST data
    $content = file_get_contents("php://input");
    $decoded = json_decode($content, true);

    if (!empty($decoded)) {
        // Process your order here. For example, save to database or send email

        // Send a success response back to the client
        echo json_encode(["message" => "Order received successfully"]);
        exit; // Ensure no further execution
    } else {
        // Send an error response if data is missing
        http_response_code(400);
        echo json_encode(["message" => "No data received"]);
        exit; // Ensure no further execution
    }
} else {
    // Not a POST request, send an error response
    http_response_code(405);
    echo json_encode(["message" => "Method Not Allowed"]);
    exit; // Ensure no further execution
}
?>
