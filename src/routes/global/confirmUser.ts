import { Router } from "express";
import JWTHelper from "../../helpers/JWTHelper";
import { confirmUser } from "../../models/UserModel";

const router = Router()

//patch
router.get("/:token",(req,res)=>{ 
    const userToken = req.params.token.split('=')[1]
    const {email} = new JWTHelper().decode(userToken) as {email:string}
    if (!email) {
        return res.sendStatus(402)
    }
    confirmUser(email)
    return res.sendStatus(200)
})

export default router