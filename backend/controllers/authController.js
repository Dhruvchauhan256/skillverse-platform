const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

// Register User
exports.registerUser = async (req, res) => {
try {
const { name, email, password, role } = req.body;

```
const existingUser = await prisma.user.findUnique({
  where: { email },
});

if (existingUser) {
  return res.status(400).json({
    success: false,
    message: "User already exists",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    role,
  },
});

const { password: _, ...userWithoutPassword } = user;

res.status(201).json({
  success: true,
  message: "User registered successfully",
  user: userWithoutPassword,
});
```

} catch (error) {
console.log(error);

```
res.status(500).json({
  success: false,
  message: "Server Error",
});
```

}
};

// Login User
exports.loginUser = async (req, res) => {
try {
const { email, password } = req.body;

```
const user = await prisma.user.findUnique({
  where: { email },
});

if (!user) {
  return res.status(400).json({
    success: false,
    message: "Invalid credentials",
  });
}

const isMatch = await bcrypt.compare(
  password,
  user.password
);

if (!isMatch) {
  return res.status(400).json({
    success: false,
    message: "Invalid credentials",
  });
}

const token = jwt.sign(
  {
    id: user.id,
    role: user.role,
  },
  process.env.JWT_SECRET || "skillverse_secret",
  {
    expiresIn: "7d",
  }
);

const { password: _, ...userWithoutPassword } = user;

res.status(200).json({
  success: true,
  token,
  user: userWithoutPassword,
});
```

} catch (error) {
console.log(error);

```
res.status(500).json({
  success: false,
  message: "Server Error",
});
```

}
};
