const register = async(req, res) => {
    try{
        const {email, password, username} = req.body

        const isuser = await User.findOne({email})
            if(isuser){
                return res.status(400).json({S: false})
            }
        
        const user = await User.create({email, password, username})

        if(user){
            return res.status(200).json({S: true})
        }
    }
    catch(error){
        res.status(500).json({S: false, error: error.message})
    }
}

const login = async(req, res, next) => {
    const {pass, email} = req.body

    const isuser = await User.findOne({email});

    if(!isuser){
        return res.status(400).json({S: false})
    }

    const isuserP = await bcrypt.compare(pass, isuser.pass)

    if(!isuserP){
        return res.status(400).json({S: false})
    }

    const atoken = jwt.sign({id: isuser._id}, process.env.V, {expiresIn: '7d'})
    const rtoken = jwt.sign({id: isuser._id}, process.env.V, {expiresIn: '20d'})

    return res.status(200).json({at: atoken, rt: rtoken})

    next()
}


const cheakT = (req, res, next) => {

    try{
        if(!req.headers.authorization){
            return res.status(400).json({S: false});
        }

        const token = req.headers.authorization.split(" ")[1];

        const d = jwt.verify(token, process.env.V);

        req.user = d;

        next();
    }
    catch(error){
        console.error(error.message);
        return res.status(401).json({S: false});
    }

}
///




const log = async (req, res) => {
    try{
        const {user, pass} = req.body

        const ismatch = await Users.findOne({user})
        if(!ismatch){
            return res.status(400).json({F: false})
        }
        const isuser = await bcrypt.compare(pass, ismatch.pass)    
        if(!isuser){
            return res.status(400).json({F: false})
        }

        const token = jwt.sign({id: ismatch._id}, process.env.v, {expiresIn: '7d'})

        return res.status(200).json({T: token})
    }
    catch(error){
        console.error(error.message)
    }
}

const reg = async(req, res) => {
    
    try{
        const {pass, username} = req.body

        const ismatchuser = await Users.findOne({username})

        if(ismatchuser){
           return res.status(400).json({S: false})
        }

        const nuser = await Users.create({pass, username}) 
        const token = jwt.sign({id: nuser._id}, process.env.v, {expiresIn: '7d'})

        res.status(200).json({T: token})
    }
    catch(error){
        console.error(error.message)
    }

}


////