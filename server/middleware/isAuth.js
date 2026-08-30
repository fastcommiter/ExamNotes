import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    console.log("🔥 ISAUTH HIT");

    const token = req.cookies?.token;

    console.log("🍪 TOKEN TYPE:", typeof token);

    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({
        success: false,
        message: "Token is not found",
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(
      "✅ VERIFIED TOKEN:",
      verifyToken
    );

    // =====================================
    // GET USER ID FROM JWT
    // =====================================

    const userId =
      verifyToken.userId ||
      verifyToken._id ||
      verifyToken.id;

    console.log(
      "🆔 EXTRACTED USER ID:",
      userId
    );

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // =====================================
    // ATTACH USER ID TO REQUEST
    // =====================================

    req.userId = userId;

    // Also keep user object available
    req.user = {
      _id: userId,
    };

    console.log(
      "✅ req.userId SET:",
      req.userId
    );

    console.log(
      "✅ req.user SET:",
      req.user
    );

    next();

  } catch (error) {

    console.log(
      "❌ ISAUTH ERROR:",
      error
    );

    return res.status(401).json({
      success: false,
      message: `Authentication failed: ${error.message}`,
    });
  }
};

export default isAuth;
