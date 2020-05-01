const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const axios = require('axios');
const path = require('path')
const cors = require('cors')


// App initialization
const app = express();

// PORT declaration
const port = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())


// Define route
app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

// Form handler
app.post('/', async (req, res) => {
    try {
        // Get input from client
        console.log(req.body)
        let crypto = req.body.crypto;
        let currency = req.body.fiat;
        console.log(crypto)
        console.log(currency)
        let response = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${config.apiKey}&ids=${crypto}&interval=1d,30d&convert=${currency}`)
        let currentDate = response.data[0].price_date.split('T')[0]
        let price = response.data[0].price
        res.write(`<h3>Date: ${currentDate}</h3>`)
        res.write(`<h3>Price of ${crypto} in ${currency}: ${price}</h3>`)
        res.send();
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({
            success: false,
            message: 'Server Error'
        })
    }
})


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});