import validator from 'validator';
import userModel from "../model/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // Fixed: Added bcrypt import

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// User login
const loginUser = async (req, res) => { // Fixed: Added req, res parameters
    try {
        const { email, password } = req.body; // Moved this to the top

        if (!email || !password) {
            return res.json({ success: false, message: 'Please provide email and password!' });
        }

        const user = await userModel.findOne({ email }); // Fixed: Added await and changed find to findOne
        
        if (!user) {
            return res.json({ success: false, message: 'User not found!' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid credentials' }); // Fixed typo: Invalide -> Invalid
        }
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        
        // Check if user already exists
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.json({ success: false, message: 'User already exists' }); // Fixed typo: existed -> exists
        }
        
        // Validating email format and password strength
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email format' }); // More specific message
        }
        
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter a strong password (minimum 8 characters)' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Fixed: Create token properly with object payload
            const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            // Added error response for invalid admin credentials
            res.json({ success: false, message: 'Invalid admin credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { loginUser, loginAdmin, registerUser };