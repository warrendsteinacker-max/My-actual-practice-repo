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