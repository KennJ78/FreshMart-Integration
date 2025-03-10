const requireAuth = async (req, res, next) =>{
    //verify authentication
    const {authorization} = req.headers
    

    if(!authorization){
        return res.status(401).json({success: false, message: 'You do not have permission to access such data'})
    }

     try {
        const response = await axios.post(`${process.env.AUTH_SERVICE}/auth-check/${authorization}`)
        if(!response.data.success){
            res.status(401).json({success: false, message: 'Request is not authorized'})
        }else{
            next()
        }
    } catch (error) {
        res.status(401).json({success: false, message: error.message})
    }
}

module.exports = requireAuth