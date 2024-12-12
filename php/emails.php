<?php
if ($_SERVER["REQUEST_METHOD"]=="POST"){
    $name=htmlspecialchars($_POST['name']);
    $email=htmlspecialchars($_POST['email']);
    $message=htmlspecialchars($_POST['message']);
    $to="fds"
    $subject="Message from Site"
    $body="Sender: $name.\n\n".
          "Email: $email\n\n". 
          "Message:\n$message"
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        // If the email was sent successfully, show a success message
        echo "<p>Thank you for your message! We'll get back to you shortly.</p>";
    } else {
        // If the email sending failed, show an error message
        echo "<p>Oops! Something went wrong, and we couldn't send your message. Please try again later.</p>";
    }

}