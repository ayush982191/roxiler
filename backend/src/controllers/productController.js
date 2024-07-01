// export pro
const Product = require("../models/ProductSchema");
const axios = require("axios")
const initializeProduct =async (req, res) => {
    try {
        // console.log("initializing product")
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Product.insertMany(response.data);
        // console.log("database initailized")
        // res.send('Database initialized'); 
    } catch (error) {
        console.error(error);
        // res.status(500).send('Error initializing database');
    }
}

const transactionsProduct = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;
    console.log("page " + page + " month " + month);

    try {
        let query = {};

        // Parse the provided month string to construct start and end dates
        if (month) {
            const monthMap = {
                'January': '01',
                'February': '02',
                'March': '03',
                'April': '04',
                'May': '05',
                'June': '06',
                'July': '07',
                'August': '08',
                'September': '09',
                'October': '10',
                'November': '11',
                'December': '12'
            };

            const year = '2020'; // Assuming the year is always 2020 based on previous discussions
            const selectedMonth = monthMap[month];

            if (!selectedMonth) {
                throw new Error('Invalid month');
            }

           
        } 
        if (search) {
            // query.$or = [
            //     { title: { $regex: new RegExp(search, 'i') } },
            //     { description: { $regex: new RegExp(search, 'i') } },
            //     { price: { $regex: new RegExp(search, 'i') } }
            // ];
        }

        // Convert page and perPage to integers for pagination
        const pageNumber = parseInt(page);
        const limit = parseInt(perPage);

        // Fetch products matching the query with pagination
        const products = await Product.find()
            .skip((pageNumber - 1) * limit)
            .limit(limit);

        // Count total number of documents matching the query (for pagination purposes)
        const total = await Product.countDocuments(query);

        // Return JSON response with total count and products
        res.json({ total, products });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).send('Error fetching transactions');
    }
};



const statisticsOfProduct = async (req, res) => {
    const { month } = req.query;
    // console.log("coming in stats ",req.query)
    if (!month) {
        return res.status(400).send('Month is required');
    }

    const start = new Date(`${month} 1, 2020`);
    const end = new Date();
    end.setMonth(end.getMonth() + 1);

    try {
        const totalSaleAmount = await Product.aggregate([
            { $match: { dateOfSale: { $gte: start, $lt: end }, sold: true } },
            { $group: { _id: null, total: { $sum: "$price" } } }
        ]);

        const totalSoldItems = await Product.countDocuments({
            dateOfSale: { $gte: start, $lt: end },
            sold: true
        });

        const totalNotSoldItems = await Product.countDocuments({
            dateOfSale: { $gte: start, $lt: end },
            sold: false
        });
        // console.log("total saleAmount=",totalSoldItems)
        res.json({
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching statistics');
    }
}

const barchartOfProduct =  async (req, res) => {
    const { month } = req.query;
    // console.log("bar chart month is ",req.query)
    if (!month) {
        return res.status(400).send('Month is required');
    }

    const start = new Date(`${month} 1, 2020`);
    const end = new Date(`${month} 1, 2020`);
    end.setMonth(end.getMonth() + 1);

    try {
        const priceRanges = await Product.aggregate([
            { $match: { dateOfSale: { $gte: start, $lt: end } } },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
                    default: "901-above",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ]);
        res.json(priceRanges);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching bar chart data');
    }
}

const pieChartOfProduct =  async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).send('Month is required');
    }

    const start = new Date(`${month} 1, 2020`);
    const end = new Date(`${month} 1, 2020`);
    end.setMonth(end.getMonth() + 1);

    try {
        const categories = await Product.aggregate([
            { $match: { dateOfSale: { $gte: start, $lt: end } } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching pie chart data');
    }
}

const combinedProduct = async (req, res) => {
    const { month } = req.query;
    if (!month) {
        return res.status(400).send('Month is required');
    }

    try {
        const transactionsResponse = await axios.get(`http://localhost:${process.env.PORT}/api/transactions`, { params: { month } });
        const statisticsResponse = await axios.get(`http://localhost:${process.env.PORT}/api/statistics`, { params: { month } });
        const barChartResponse = await axios.get(`http://localhost:${process.env.PORT}/api/barchart`, { params: { month } });
        const pieChartResponse = await axios.get(`http://localhost:${process.env.PORT}/api/piechart`, { params: { month } });

        res.json({
            transactions: transactionsResponse.data,
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data,
            pieChart: pieChartResponse.data
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching combined data');
    }
}


module.exports = {initializeProduct,transactionsProduct,statisticsOfProduct,barchartOfProduct,pieChartOfProduct,combinedProduct}