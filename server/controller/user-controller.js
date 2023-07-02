import User from '../model/user-schema.js';

export const userSignUp = async (request, response) => {
  try {

    const exist = await user.findone({ username: request.body.username });
    if (exist) {
        return response.status(401).json({ message: 'username already exist'});
    }

    const user = request.body;
    const newUser = new User(user);
    await newUser.save();

    response.status(200).json({ message: user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


