const postmark = require('postmark');

  export default async (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = new postmark.ServerClient(process.env.FROM_EMAIL_ADDRESS);

    try {
      const result = await client.sendEmail({
        From: email,
        To: process.env.CONTACT_FORM_EMAIL_DEST,
        Subject: subject,
        TextBody: text,
      });

      console.log('Email sent successfully:', result.Message);
      res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error sending email:', err.message);
      res.status(500).json({ error: 'Failed to send email' });
    }
  };