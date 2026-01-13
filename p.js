const Uuser = async(req, res) => {
    const {email, pass} = req.body

    try{
        const salt = await bcrypt.genSalt(10)
        const Hpass = bcrypt.hash(pass, salt)
        const Euser = await Users.findOneByIdAndUpdate(req.user.id, {p: Hpass}, {e: email})
        res.status(200).json({T: true})
    }
    catch(error){
        console.error(error.message)
        return res.status(400).json({E: false})       
    }
}

///