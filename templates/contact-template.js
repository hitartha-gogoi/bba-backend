const CONTACT_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Request</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      overflow: hidden;
      border: 1px solid #e0e0e0;
    }
    .header {
      background-color: #1e40af;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 22px;
      font-weight: 600;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .field {
      margin-bottom: 20px;
    }
    .field-title {
      font-weight: bold;
      margin-bottom: 5px;
      color: #1e3a8a;
    }
    .message-box {
      background-color: #f3f4f6;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #d1d5db;
      white-space: pre-wrap;
    }
    .footer {
      background-color: #f9fafb;
      text-align: center;
      font-size: 12px;
      color: #888;
      padding: 15px;
      border-top: 1px solid #eee;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">New Contact Request</div>
    <div class="content">
      <div class="field">
        <div class="field-title">Name</div>
        <div>{name}</div>
      </div>
      <div class="field">
        <div class="field-title">Email</div>
        <div>{email}</div>
      </div>
      <div class="field">
        <div class="field-title">Message</div>
        <div class="message-box">{message}</div>
      </div>
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Bar Association Bahadurgarh. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export default CONTACT_TEMPLATE;
