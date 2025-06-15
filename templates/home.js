const HOME_PAGE_TEMPLATE = ({ stats }) => `
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Admin Dashboard | Bar Association System</title>
        <style>
            body {
                margin: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f4f4f4;
                color: #333;
            }
            header {
                background-color: #2c3e50;
                color: white;
                padding: 20px;
                text-align: center;
            }
            .container {
                padding: 30px;
            }
            .status {
                font-size: 24px;
                margin-bottom: 20px;
                color: green;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }
            .card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .card h3 {
                margin: 0 0 10px;
                font-size: 18px;
                color: #555;
            }
            .card p {
                font-size: 28px;
                font-weight: bold;
                color: #2c3e50;
            }
            footer {
                text-align: center;
                margin-top: 40px;
                font-size: 14px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Bar Association Admin Dashboard</h1>
            <p>Bahadurgarh - Civil Courts Complex</p>
        </header>
        <div class="container">
            <div class="status">✅ The system is running all good</div>
            <div class="grid">
                <div class="card">
                    <h3>Total Lawyers</h3>
                    <p>${stats.lawyers}</p>
                </div>
                <div class="card">
                    <h3>Total Receipts</h3>
                    <p>${stats.transactions}</p>
                </div>
                <div class="card">
                    <h3>Server Uptime</h3>
                    <p>${stats.uptime}</p>
                </div>
                <div class="card">
                    <h3>PDFs Generated</h3>
                    <p>289</p>
                </div>
            </div>
        </div>
        <footer>
            &copy; ${new Date().getFullYear()} Bar Association, Bahadurgarh. All rights reserved.
        </footer>
    </body>
    </html>
`

export default HOME_PAGE_TEMPLATE;