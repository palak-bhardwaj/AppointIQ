import jwt from "jsonwebtoken";

// admin authentication middleware

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, missing token." });
    }
    const atoken = authHeader.split(" ")[1];

    if (!atoken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized, invalid token.",
      });
    }

    const tokenDecode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      res.status(401).json({
        success: false,
        message: "Unauthorized, invalid token.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;
