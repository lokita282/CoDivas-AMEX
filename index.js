// Importing modules
const express = require('express');
const cors = require('cors');
const db = require('./connection');
const cron = require('node-cron');
const morgan = require('morgan');

// Initializing an express app
const app = express();

// Server Port
const PORT = process.env.PORT || 5001;

// Formatting incoming data and allowing cross origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging incoming requests
app.use(morgan('dev'));

const { setAllVoucherStatus } = require('./utils/cron-jobs');
const { redeemVouchers } = require('./utils/functions');
// Importing Routes
const authRoute = require('./routes/auth');
const bankRoute = require('./routes/bank');
const beneficiaryRoute = require('./routes/beneficiary');
const merchantRoute = require('./routes/merchant');
const adminRoute = require('./routes/admin');
// Routes
app.use('/api/auth', authRoute);
app.use('/api/bank', bankRoute);
app.use('/api/beneficiary', beneficiaryRoute);
app.use('/api/merchant', merchantRoute);
app.use('/api/admin', adminRoute);

app.get('/api', (req, res) => {
    redeemVouchers();
    res.json({ message: 'Hello from server!' });
});

// Error Handling for Multer
// app.use((error, req, res, next) => {
//   console.log('This is the rejected field ->', error.field);
// });

cron.schedule('0 0 0 * * *', () => {
    setAllVoucherStatus();
});
// Listening on the port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
