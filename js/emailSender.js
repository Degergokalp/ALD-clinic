function sendEmail(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = "-"
    const phone = document.getElementById('phone').value;
    const message = "-"

    // Email configuration
    const emailData = {
        from: 'tsc.trade.notify@gmail.com',
        to: 'info@aldhair.com', // Your receiving email
        subject: 'New Contact Form Message from ' + name,
        text: `
Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`
    };

    // Using fetch to send to our local server
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Email sent successfully!');
            document.getElementById('contactForm').reset();
        } else {
            alert('Failed to send email: ' + (data.error || 'Unknown error'));
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send email. Please try again later.');
    });

    return false;
} 