<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize inputs
    $name    = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $project = htmlspecialchars(trim($_POST['project'] ?? ''));
    $budget  = htmlspecialchars(trim($_POST['budget'] ?? ''));

    // Basic validation
    if (!$name || !$email || !$project) {
        http_response_code(400);
        echo "❌ Missing required fields.";
        exit;
    }

    // Email config (CHANGE THIS)
    $to = "hello@uniquitys.com";
    $subject = "🚀 New Project Inquiry from $name";

    // Email body
    $message = "
New inquiry from your website:

Name: $name
Email: $email
Budget: $budget

Project Idea:
$project
";

    // Headers
    $headers = "From: no-reply@uniquitys.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send mail
    if (mail($to, $subject, $message, $headers)) {
        // Redirect to success page or show message
        echo "<script>
            alert('✅ Inquiry sent! We\\'ll reply within 24 hours.');
            window.location.href = '/';
        </script>";
    } else {
        http_response_code(500);
        echo "❌ Failed to send message. Try again later.";
    }
}
?>
