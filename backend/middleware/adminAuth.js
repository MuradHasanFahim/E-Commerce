import jwt from 'jsonwebtoken'

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, message: 'Not Authorized!!' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", decoded); // 🔍 debug

    // ✅ check BOTH email + role (stronger security)
    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== 'admin') {
      return res.json({ success: false, message: 'Not Authorized!!' });
    }

    next();

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
}

export default adminAuth;