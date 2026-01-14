import e from "cors"
import { useState } from "react"
import { AlwaysStencilFunc } from "three/src/constants.js"

const Uuser = async(req, res) => {
    const {email, pass} = req.body

    try{
        const salt = await bcrypt.genSalt(10)
        const Hpass = await bcrypt.hash(pass, salt)
        const Euser = await Users.findByIdAndUpdate(req.user.id, {p: Hpass, e: email})
        res.status(200).json({T: true})
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({E: false})       
    }
}


const Duser = async(req, res) => {
    try{
        const Du = await Users.findByIdAndDelete(req.user.id)        
        res.status(200).json({deleted: Du})
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({F: false})
    }
}

const Nuser = async(req, res) => {
    try{
        const {email, pass} = req.body
        const salt = await bcrypt.genSalt(10)
        const Hpass = await bcrypt.hash(pass, salt)
        const nuser = await Users.create({email, Hpass})
        return res.status(200).json({NU: nuser})
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({F: false})
    }
}


const Euser = async(req, res) => {
    try{
        const {pass, email} = req.body
        const salt = await bcrypt.genSalt(10)
        const npsas = await bcrypt.hash(pass, salt)
        const EEuser = await Users.findByIdAndUpdate(req.user.id, {pass: npsas, email: email})
        return res.status(200).json({Updatedto: EEuser})
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({notUpdatedto: EEuser})
    }
}
////////
/// //


const Tcheak = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1] 
        const D = jwt.verify(token, process.env.V)
        req.user = D
        next() 
    }
    catch(error){
        console.error(error.message)
        res.status(400).json({T: "tokenbad"})
    }
}



const Rcheak = async(req, res, next) => {
    try{
        if(req.user && req.user.role === "admin"){
            next()
        }
        else{
            return res.status(403).json({permision: false})
        }
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({error: true})
    }
}


const prof = () => {

    const userd = JSON.parse(localStorage.getItem('user'))
    
    return( <>
            <div>
                <p>{userd.N}</p>
            </div>
            </> )
}


const login = () => {

    const [email, setMail] = useState()
    const [pass, setPass] = useState()

    const Lfunc = async(e) => {
        e.preventDefault()
        try
        {
            const res = await axios.post('/log', {email, pass})
            if(res.data){
                localStorage.setItem('user', JSON.stringify(res.data))
                nav('/home')
            }
        }
        catch(error){
            console.error(error.message)
        }


    }

    return(<>
    <form onSubmit={Lfunc}>
    <input type="text" value={email} onChange={(e)=>setMail(e.target.value)}></input>
    <input type="text" value={pass} onChange={(e)=>setPass(e.target.value)}></input>
    <button type="submit">l</button>
    </form></>)
}


const Lpage = () => {
    const [E, setE] = useState()
    const [P, setP] = useState()
    const nav = useNavigate()
    const {isauth, setIsauth} = useContext(Datap)       
    const LLfunnc = async(e) => {
        try{
            e.preventDefault()
            const res = await axios.post('/login', {email: E, pass: P})
            const data = res.data
            if(res.status === 200){
                localStorage.setItem('userd', JSON.stringify({name: data.name, age: data.age}))
                localStorage.setItem('token', JSON.stringify({T: data.token}))
                localStorage.setItem('role', JSON.stringify({R: data.role}))
                setIsauth(true)
                nav('/H')
            }
            }
            catch(error){
                console.error(error.message)
            }
    }    

    return(<>
    <form onSubmit={LLfunnc}>
        <input value={P} type="text" onChange={(e)=>setP(e.target.value)}></input>
        <input value={E} type="email" onChange={(e)=>setE(e.target.value)}></input>
        <button type="submit"></button>
    </form>
        </>)
}

const Proroute = ({ Aroles }) => {
    const { isauth } = useContext(Datap);
    
    // 1. Check authentication first
    if (!isauth) {
        return <Navigate to="/" replace />;
    }

    // 2. Get the role object and extract the string 'R'
    const roleData = JSON.parse(localStorage.getItem('role'));
    const userRole = roleData?.R; // Use optional chaining in case it's null

    // 3. Check if the role string exists in the allowed roles array
    if (Aroles && !Aroles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }

    // 4. If both pass, show the page
    return <Outlet />;
}

//////////remeber to leave thes so I can prac makeing whol proj

