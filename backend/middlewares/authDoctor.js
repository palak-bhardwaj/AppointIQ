import jwt from "jsonwebtoken";

// Doctor authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, missing token." });
    }
    const dtoken = authHeader.split(" ")[1];

    if (!dtoken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized, invalid token.",
      });
    }

    const tokenDecode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.docId = tokenDecode.id

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
