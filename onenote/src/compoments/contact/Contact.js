import React from 'react'
import './Contact.css'
export default function Contact() {
  return (
    <>
        <header>
        <h1>Contact Us</h1>
    </header>

    <main class="contact-section">
        <p>For any inquiries, please contact us:</p>
        <address>
            <strong>Our Address:</strong><br/>
            123 Street, Cityville, Country
        </address>
        <p><strong>Email:</strong> contact@example.com</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
    </main>

    <footer>
        &copy; 2024 Contact Us Page
    </footer>
    </>
  )
}
