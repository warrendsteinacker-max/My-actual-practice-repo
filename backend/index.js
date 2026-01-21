import express from 'express';
import cors from 'cors';
import Users from './data.js';

const app = express();

// Middleware: Allows Express to parse JSON sent from Axios
app.use(express.json());

// Middleware: Allows your React app (port 5173) to talk to this server (port 8000)
const corsOptions = {
    origin: 'http://localhost:5173', // More secure than '*'
    methods: ['GET', 'POST'],
    credentials: true,
};
app.use(cors(corsOptions));

app.post('/login', (req, res) => {
    try {
        const { pass } = req.body;
        const user = Users.find((U) => U.pass === pass);

        if (!user) {
            // 401 Unauthorized is better for failed logins
            return res.status(401).json({ error: 'Invalid password' });
        }

        // We wrap the role in an object so frontend "res.data.User.role" works
        return res.status(200).json({ 
            User: { 
                role: user.role 
            } 
        });
    } catch (error) {
        console.error("Server Error:", error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
//////
app.listen(8000, () => {
    console.log('✅ Server running on http://localhost:8000');
});
////////////