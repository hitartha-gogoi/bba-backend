import jwt from 'jsonwebtoken'
import 'dotenv/config'

const createToken = (user) => {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.type, timestamp: user.timestamp },
      process.env.JWT_SECRET,
    //  { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  };

  export default createToken