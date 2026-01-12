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
        res.status(400).json({S: false})
    }

    const isuserP = await bycrpt.compare(pass, isuser.pass)

    if(!isuserP){
        return res.status(400).json({S: false})
    }

    jwt.sign(isuser, process.env.V, expiresIn: '7d')
}