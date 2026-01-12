const register = async(req, res) => {
    const {email, password} = req.body

    const ismatch = await User.findOne({email})

    if(ismatchE){
        return res.status(400).json({sucess: false})
    }

    const ismatchP = await bcrypt.compare(password, ismatch.password)

    if(ismatchP){
        return res.status(400).json({succes: false})   
    }

    
}