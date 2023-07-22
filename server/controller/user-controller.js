import User from '../model/user-schema.js';



//signup
export const userSignup = async (request, response) => {
  try {

    const exist = await User.findOne({ username: request.body.username });
    if (exist) {
      return response.status(401).json({ message: 'Username already exists' });
    }
    
    const user = request.body;
    const newUser = new User(user);
    await newUser.save();

    response.status(200).json({ message: user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}


//login
export const userLogin = async(request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let user = await User.findOne({ username: username, password: password });
    if (user) {
      return response.status(200).json({data: user});
     }else {
      return response.status(401).json('Invalid login');
    }

  } catch (error) {
    response.status(500).json('Error', error.message);

  }
}