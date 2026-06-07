
DHRUV HARISH CHAUHAN@LAPTOP-AAUELRQ1 MINGW64 ~/skillverse-platform/backend (main)
$ cat middleware/authMiddleware.js
const protect = (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  try {
    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
DHRUV HARISH CHAUHAN@LAPTOP-AAUELRQ1 MINGW64 ~/skillverse-platform/backend (main)
