import mongoose from "mongoose"


const userSchema = new mongoose.Schema
({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  description:{
    type: String,
   default: '',
  },
  cover: {
    type: String,
   default: '',
   
  },
  profile: {
    type: String,
   default: '',
    
  },
  friends: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'userSchema' 
    }]
});



// Create a model based on the schema
const User = mongoose.model('User', userSchema);

export default User;