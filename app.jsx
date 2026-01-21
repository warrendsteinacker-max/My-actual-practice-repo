import React, { useState, useRef, useEffect } from "react";
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
    const reff = useRef(null)
    const [id, setId] = useState(1)

    useEffect(()=>{
    const fetchd = async() =>{
    try{
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        console.log(res.data)
    }
    catch(error){
        console.error(error.message)
    }}
    fetchd()
    }, [id])

    const newid = () => {
        const nid = id + 1
        setId(nid)
    }

    const Mpost = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:8000/login', {pass: pass})
            if(res.status === 404){
                setNF(true)
            }
            reff.current.style.color = 'red'
        }
        catch(error){
            console.error(error.message)
            setE(true)
        }
    }

    return(<>
            {E && <p ref={reff}>error</p>}
            <div style={{display: "flex", gap: '20px', flexDirection: 'column'}}><p>H</p><p>H</p><nav style={{textDecoration: 'none'}}><a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent/KtbxLvHkRzNzxCLRzdlxFJJctRvQRZcRDB">go to</a></nav></div>
            <img src='./public/textures' alt='is pic'/>
            <form onSubmit={Mpost}>
                <input type="password" value={pass} onChange={(e)=>setP(e.target.value)}/>
                <button type="submit">Make Post</button>
            </form>
            <button onClick={newid}>fetch data</button>
        </>)
};

export default App;