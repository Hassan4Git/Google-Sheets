import { google } from "googleapis"

export default async function handler(req, res) {
    const body = req.body
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            // key: process.env.API_KEY,
        },
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets'
        ],
    })
    const sheets = google.sheets({
        version: 'v4',
        auth: auth
    })
    
    switch (req.method) {
        case 'POST':
            const response = await sheets.spreadsheets.values.append({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'A1:D1',
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [
                        [body.name, body.number, body.email, body.packageNum]
                    ]
                }
            })
            return res.status(200).json({
                data: response.data
            })
        case 'GET':
            const resp = await sheets.spreadsheets.values.get({
                spreadsheetId: process.env.GOOGLE_SHEET_ID,
                range: 'Orders'
            }).then(res => res.data.values)
            console.log(resp)
            res.status(200).json({
                data: resp
            })
    }
}