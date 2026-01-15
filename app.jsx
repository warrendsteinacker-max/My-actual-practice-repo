import React, { useState } from "react";
import axios from "axios";

const App = () => { // Removed 'async'
    const [p, setP] = useState("");
    const [role, setRole] = useState(null); // Use state to show the role on screen

    const loginf = async (e) => {
        e.preventDefault(); // Prevents page reload
        try {
            // Point this to your node.js server address
            const res = await axios.post("/login", { pass: p });
            
            if (res.status === 200) {
                const userRole = res.data.User.role; // Access data through .data
                localStorage.setItem('user', userRole);
                setRole(userRole); // Update state to trigger a re-render
            }
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    // If we have a role, show it; otherwise show the form
    if (role) {
        return <p>Logged in as: {role}</p>;
    }

    return (
        <form onSubmit={loginf}>
            <input 
                type="password" 
                placeholder="Enter Password"
                onChange={(e) => setP(e.target.value)} 
            />
            <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default App;