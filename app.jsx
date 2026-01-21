import React, { useState } from "react";
import axios from "axios";

const App = () => {
    // const [p, setP] = useState("");
    // const [role, setRole] = useState(localStorage.getItem('user')); // Initialize from storage
    // const [error, setError] = useState("");

    // const loginf = async (e) => {
    //     e.preventDefault();
    //     setError(""); // Clear previous errors

    //     try {
    //         // Note the full URL to the backend port 8000
    //         const res = await axios.post("http://localhost:8000/login", { pass: p });
            
    //         if (res.status === 200) {
    //             const userRole = res.data.User.role; 
    //             localStorage.setItem('user', userRole);
    //             setRole(userRole);
    //         }
    //     } catch (err) {
    //         // Handle 401 or network errors
    //         setError("Login failed. Please check your password.");
    //         console.error("Axios Error:", err.message);
    //     }
    // };

    // const handleLogout = () => {
    //     localStorage.removeItem('user');
    //     setRole(null);
    //     setP("");
    // };

    // // View 1: Logged In State
    // if (role) {
    //     return (
    //         <div style={{ padding: '20px', textAlign: 'center' }}>
    //             <h2>Welcome!</h2>
    //             <p>You are logged in as: <strong>{role}</strong></p>
    //             <button onClick={handleLogout}>Logout</button>
    //         </div>
    //     );
    // }

    // // View 2: Login Form State
    // return (
    //     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
    //         <form onSubmit={loginf} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    //             <h3>Login</h3>
    //             <input 
    //                 type="password" 
    //                 placeholder="Enter Password"
    //                 value={p}
    //                 onChange={(e) => setP(e.target.value)} 
    //                 required
    //             />
    //             <button type="submit">Login</button>
    //             {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
    //         </form>
    //     </div>
    // );

    const [NF, setNF] = useState(false)
    const [E, setE] = useState(true)
    const [pass, setP] = useState('')
    const Mpost = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:8000/login', {pass: pass})
            if(res.status === 404){
                setNF(true)
            }
        }
        catch(error){
            console.error(error.message)
            setE(true)
        }
    }

    return(<>
            {E && <p ref={ref}>error</p>}
            <form onSubmit={Mpost}>
                <input type="password" value={pass} onChange={(e)=>setP(e.target.value)}/>
                <button type="submit">Make Post</button>
            </form>
        </>)
};

export default App;