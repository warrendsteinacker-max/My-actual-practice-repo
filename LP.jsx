import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';

export const LP = ({ setA, setP, pass }) => {
    const nav = useNavigate();
    const [error, setError] = useState(false); // To track if login failed

    const loginf = async (e) => {
        e.preventDefault(); // Stop page reload
        try {
            const res = await axios.post('http://localhost:8000/login', { pass: pass });
            
            const R = {Aloud: res.data.User}

            localStorage.setItem('role', JSON.stringify(R))

            if (res.status === 200) {
                setA(true);
                nav('/dash');
            }
        } catch (err) {
            setError(true); // Show the "try again" message
            console.log("Login failed");
        }
    };

    return (
        <form onSubmit={loginf}>
            {error && <p style={{color: 'red'}}>Try again</p>}
            <input 
                type='password' 
                placeholder="Enter Password"
                onChange={(e) => setP(e.target.value)} 
            />
            <button type='submit'>Login</button>
        </form>
    );
};

export const PR = () => {
    const RR = JSON.parse(localStorage.getItem('role'))
    if(RR.Aloud === 'user'){
        return <Outlet/>
    }
    else{
        return <Navigate to='/'/>
        }
}

export const DashBoard = () => {
    const RRR = JSON.parse(localStorage.getItem('role'))

    return(<><p>{RRR.Aloud}</p></>)
}



