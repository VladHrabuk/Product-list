require('dotenv').config();
const config = require('config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { router: productRouter } = require('./routes/products');
const errorHandler = require('./middleware/errorHandler');
const ApiError = require('./exceptions/api-error');
const Product = require('./models/product.model');
const Comment = require('./models/comment.model');

const server = express();

server.use(express.json());
server.use(cors());
server.use(cors());
server.use('/products', productRouter);

server.all('*', async (req, res, next) => {
  const error = ApiError.notFound();
  next(error);
});

server.use(errorHandler);

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
}

const { port: serverPort } = config.server;
server.listen(serverPort, () => {
  console.log(`Server listening on [${serverPort}] port!`);
});

connect();

// async function createTestProduct() {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const product = new Product({
//       imageUrl:
//         'https://cdn.mamazin.com.ua/img/products_pictures/large_2022080294751152261.jpg',
//       name: 'Абетка',
//       count: 48,
//       size: {
//         width: 130,
//         height: 200,
//       },
//       weight: '450g',
//       comments: [],
//     });

//     await product.save();
//     console.log('Test product added successfully!');
//   } catch (error) {
//     console.error('Error adding test product:', error);
//   } finally {
//     await mongoose.disconnect();
//   }
// }

// createTestProduct();

// async function createComment() {
//   const productId = '66b0a0a86f800bb54af9ce43';
//   const commentData = {
//     description: 'Раджу прочитати!',
//     date: new Date('2024-08-05T13:20:00Z'),
//   };

//   try {
//     const comment = new Comment({
//       productId,
//       ...commentData,
//     });

//     await comment.save();

//     await Product.findByIdAndUpdate(productId, {
//       $push: { comments: comment._id },
//     });

//     console.log('Comment added successfully!');
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     throw error; // or handle the error as needed
//   }
// }

// createComment();
