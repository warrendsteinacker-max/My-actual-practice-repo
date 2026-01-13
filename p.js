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
        if(req.user && req.user.role === admin){
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