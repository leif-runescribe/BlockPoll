import axios from 'axios';

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:5000/register', {
      username,
      email,
      password,
    });

    // Handle the successful registration response
    console.log('Registration successful:', response.data);
    // You can also store the token or user data in the state or local storage

    return response.data;
  } catch (error) {
    // Handle the registration error
    console.error('Registration error:', error.response.data);
    throw error;
  }
};



export const loginUser = async(email,password)=>{
  try{
    const response = await axios.post('http://localhost:5000/login',{
      email,
      password
    });
    console.log("Logins successful", response.data);
    return response.data
  }
  catch(error){
    console.log('Login error: ', error.response.data);
    throw error
  }
}

