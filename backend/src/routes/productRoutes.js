const express = require('express');
const router = express.Router();
const axios = require('axios');
// const Product = require('../models/Product');
const Product = require("../models/ProductSchema");
const { initializeProduct, transactionsProduct, statisticsOfProduct, barchartOfProduct, pieChartOfProduct, combinedProduct } = require('../controllers/productController');



// router.get("/hello",((req,res)=>res.send("Hello world Ayush this side")))

// Initialize database
router.get('/initialize', initializeProduct);

// List all transactions with search and pagination
router.get('/transactions',transactionsProduct);
 
// Statistics API
router.get('/statistics', statisticsOfProduct);

// Bar chart API
router.get('/barchart',barchartOfProduct);

// Pie chart API
router.get('/piechart',pieChartOfProduct);

// Combined API
router.get('/combined',combinedProduct );

module.exports = router;
