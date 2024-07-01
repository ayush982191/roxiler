const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./utils/connectToMongoDb');
const productRoute = require('./routes/productRoutes.js');
const { initializeProduct } = require('./controllers/productController.js');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
initializeProduct()
app.use('/api', productRoute);
// /api/statistics?month=${selectedMonth}


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
