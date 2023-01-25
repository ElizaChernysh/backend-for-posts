import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoute from './routes/auth.js';
import postRoute from './routes/post.js';
import commentRoute from './routes/comments.js'
import { getAll } from './controllers/posts.js';

mongoose.set('strictQuery', false);

const app = express();
dotenv.config();

//Constants 
// const PORT = process.env.PORT || 3001;
// const DB_USER = process.env.DB_USER;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_NAME = process.env.DB_NAME;


// Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

//Routes
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

app.get('/', (req, res) => {
  res.send({
    message: 'All is fine.'
  })
})

app.get('/api/posts', getAll);

// async function start() {
//   try {
//     // await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@lyka.qjfwbgw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
//     await mongoose.connect(process.env.MONGODB_URI);

//     app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)
//     );

//   } catch (error) {
//     console.log(error)
//   }
// }

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

// start();

app.listen(process.env.PORT || 3001, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});