import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        console.log("🔥 ISAUTH HIT");

        const token = req.cookies.token;

        console.log("🍪 TOKEN:", token);
        console.log("🍪 TOKEN TYPE:", typeof token);

        if (!token || token === "undefined" || token === "null") {
            return res.status(401).json({
                message: "Token is not found"
            });
        }

        const verifyToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("✅ VERIFIED TOKEN:", verifyToken);

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        console.log("❌ ISAUTH ERROR:", error);

        return res.status(401).json({
            message: `Authentication failed: ${error.message}`
        });
    }
};

export default isAuth;