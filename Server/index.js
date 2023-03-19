import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import User from './models.js'


const app = express();

const uri = "mongodb+srv://eldhoseiype211:Eldhose321@social1.rzqbhnu.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();



// Routes


app.post('/find', async (req, response) => {
  const { email,friend } = req.body
  
  try {
    const check = await User.findOne({ email: email })
    const friendId=await User.findOne({ _id: friend })
    if (check) {
      response.json({ message: 'User found', user: check });
      
    }
    else if(friendId){
      response.json({ message: 'User found', user: friendId });
    }
    else {
      response.json("notfound")
    }
  } catch (error) {
    console.log(error)
  }
});

app.post('/mutual',async(req,response)=>{

  const {email,friend}=req.body
  console.log(email,friend)
  try{
    const user= await User.findOne({email:email})
    const friends= await User.findOne({_id:friend})
    const userFriends=user.friends
    const friendFriends=friends.friends
    const mutualFriendsIds = userFriends.filter((userId) =>
    friendFriends.includes(userId)
  );
  const mutualFriends = await User.find({
    _id: { $in: mutualFriendsIds }
  });

  console.log(mutualFriends);
  response.json({message:"mutual friends found",mutualFriends});
  }catch(e){
    console.log(e)
  }
})


app.post('/', async (req, response) => {
  const { email, password } = req.body
  
  try {
    const check = await User.findOne({ email: email })
    if (check) {
      response.json("found")
      console.log(email,password)
    }
    else {
      response.json("notfound")
    }
  } catch (error) {
    console.log(error)
  }
});

//for signup


app.post('/signup', async (req, response) => {
  const { FirstName, LastName, email, password } = req.body;
  const description = '';
  const cover = '';
  const profile = '';
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      response.json({ message: 'exists' });
    } else {
      await User.create({ FirstName, LastName, email, password ,description,cover,profile});
      response.json({ message: 'created' });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/sfriends', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }); // Find the user by email
    if (!user) {
      res.json({ message: 'User not found' });
      return;
    }
    const connectedFriendIds = user.friends.map(friendId => friendId.toString());

    const suggestedFriends = await User.find({
      email: { $ne: email },
      _id: { $nin: connectedFriendIds }
    });

    res.json({ message: 'Suggested friends found', suggestedFriends });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Error occurred' });
  }
});

app.post('/findfriends', async(req,response)=>
{
  const {email}=req.body
  try
  {
    const currentuser=await User.findOne({email:email})
    if(currentuser)
    {
      const friendIds = currentuser.friends;
      if(friendIds.length<0)
      {
        response.json({ message: 'No friends found'});
      }
      const friends = await User.find({ _id: { $in: friendIds } });
      response.json({ message: ' friends found', friends }); 
    }
    else
    {
        response.json({ message: 'No User found'});
    }
    
  }catch(e){
    console.log(e)
  }
});



app.post('/removefriend',async(req,response)=>{
  const {email,userId}=req.body
  console.log(req.body)
  console.log(email,userId)
  try
  {
    const user=await User.findOne({email:email})
    if(user)
    {
      
      const update=await User.findOneAndUpdate
      (
        {email:email },
        {
          $pull:{friends:userId}
        },
        {new:true}
        )
        console.log(update)
        response.json({ user: update });  
    }
    else{
      response.json('user not found')
    }

  }
  catch(e)
  {
    console.log(e)
  }
});

app.post('/search', async (req, response) => {
  const { search } = req.body;
  console.log(req.body)
  try {
    const results = await User.find({
      $or: [
        { FirstName: { $regex: search, $options: 'i' } },

      ],
    });
    response.json({ user: results });   } catch (error) {
    console.error(error);
    response.status(500).send('Internal server error');
  }
});


app.post('/addfriend', async (req, response) => {
  const { id, email } = req.body;
  console.log(req.body);
  console.log(id,email);
  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    {
      $addToSet: {
        friends: id
      }
    },
    { new: true }
  )
  

    .then(updatedUser => {
      console.log(`Added friend with id ${id} to user with email ${email}. Updated user:`, updatedUser);
      response.json(updatedUser);
    })
    .catch(error => {
      console.error(`Error adding friend to user:`, error);
      response.status(500).json({ message: 'Internal server error' });
    });
});


//for profile edit
app.post('/edit', async (req, response) => {

  const { First, Last, description, email,coverimage,profileimage } = req.body
  const find = await User.findOne({ email: email })
  console.log(First,Last,description,coverimage,profileimage)
  console.log(req.body,find)
  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    {
      $set: {
        FirstName: First,
        LastName: Last,
        description: description,
        cover: coverimage,
        profile: profileimage
      }
    },
    { new: true }
  );
  response.json({ message: 'User updated', user: updatedUser });

});


app.listen(8000, () => {
  console.log("Server started on port 8000");
});
