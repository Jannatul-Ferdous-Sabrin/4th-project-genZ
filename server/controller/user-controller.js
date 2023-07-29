
import User from '../model/user-schema.js';





// Signup
export const userSignup = async (request, response) => {
  try {
    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json({ message: 'Username already exists' });
    }

    const user = request.body;
    const newUser = new User(user);
    await newUser.save();

    response.status(200).json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    response.status(500).json({ message: 'Error during signup', error: error.message });
  }
};

// Login
export const userLogin = async (request, response) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username, password });
    if (user) {
      response.status(200).json({ message: 'Login successful', data: user });
    } else {
      response.status(401).json({ message: 'Invalid login' });
    }
  } catch (error) {
    response.status(500).json({ message: 'Error during login', error: error.message });
  }
};
