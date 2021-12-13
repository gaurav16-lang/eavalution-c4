module.exports = function(permittedRoles)
{
    return function(req,res,next)
    {
        user = req.user.user
        isAllowed = fale
        user.roles.map((role=>{
            if(permittedRoles.includes(role)){
                isAllowed = true
            }
        }))
        if(!isAllowed)
        {
            return res.status(401).json({status:"Failed",message:"you ara not allowed to access this"})
        }
          
        }
}
