import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        next("Authorization failed");
    }
    
    const token = authHeader?.split(" ")[1];

    try{
        const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

        req.body.user = {
            userId: userToken.userId,
        };

        next();
    } catch(err) {
        console.log(err);
        next("Authorization failed");
    }
}

export default userAuth;