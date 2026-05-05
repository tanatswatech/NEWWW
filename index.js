const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve website
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Website running on port ${PORT}`);
});

// WhatsApp bot
const client = new Client({
  authStrategy: new LocalAuth()
});

client.on('qr', qr => {
  console.log('Scan this QR code:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('Bot is ready!');
});

// 🧠 SMART DEMO RESPONSES
client.on('message', async msg => {
  if (msg.fromMe) return;

  const text = msg.body.toLowerCase();

  // GREETING
  if (text.includes("hi") || text.includes("hello")) {
    return msg.reply(
`Hello 👋 and welcome!

Thank you for reaching out to us. We're really glad you're here.

We specialize in helping businesses grow through smart digital solutions such as website development, branding, and automation tools that improve efficiency and customer engagement.

Feel free to ask anything — whether it's about our services, pricing, or how we can help your business specifically. I'm here to assist you step by step.`
    );
  }

  // SERVICES
  if (text.includes("services")) {
    return msg.reply(
`Great question — here's a detailed overview of what we offer:

1️⃣ Website Development  
We create modern, responsive websites that not only look professional but also convert visitors into customers.

2️⃣ Branding & Design  
We help businesses build strong identities through logos, color systems, and visual strategies.

3️⃣ Automation Solutions  
We implement tools like WhatsApp bots (like this one), chat systems, and workflows to save time and improve customer service.

4️⃣ Digital Marketing Support  
From strategy to execution, we help you reach the right audience and grow your presence online.

If you'd like, I can recommend the best solution based on your specific business needs.`
    );
  }

  // PRICING
  if (text.includes("price") || text.includes("cost")) {
    return msg.reply(
`That's an important question, and the answer depends on what exactly you're looking for.

Our pricing is flexible because we tailor each solution to the client's needs. For example:

- A simple website project will cost less than a full business automation system.
- Branding packages vary depending on the number of design elements required.
- Advanced solutions like chatbots or integrations are priced based on complexity.

The best approach is for us to understand your goals first, then recommend a solution that fits both your needs and your budget.

Would you like to briefly describe what you're trying to achieve?`
    );
  }

  // DEFAULT (AI-LIKE RESPONSE)
  msg.reply(
`Thank you for your message — I really appreciate you reaching out.

From what you've said, it sounds like you're looking for a solution that can improve how your business operates or connects with customers. That's exactly where we come in.

Our approach is not just to provide a service, but to understand your situation and recommend something practical, efficient, and scalable.

If you can share a bit more detail about your goals or challenges, I’ll be able to guide you more precisely and suggest the best next step.`
  );
});

client.initialize();
