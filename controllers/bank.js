const User = require('./../models/user');
const Voucher = require('./../models/voucher');
const { generateRandomNumber } = require('./../utils/functions');

const shortCodes = {
    health: 'HEA',
    agriculture: 'AGR',
    education: 'EDU',
    food: 'FOD',
    housing: 'HOU',
    transportation: 'TRA',
    utility: 'UTI',
    telecommunication: 'TEL',
    other: 'OTH'
};

const createERupiVoucher = async (req, res) => {
    try {
        const bankLogos = {};
        const categoryLogos = {};

        const voucher = new Voucher({
            title: req.body.title,
            startsAt: req.body.startsAt,
            endsAt: req.body.endsAt,
            issuedBy: req.body.issuedBy,
            issuedByLogo: req.body.issuedByLogo, // index from object
            beneficiaryName: req.body.beneficiaryName,
            beneficiaryPhone: req.body.beneficiaryPhone,
            govtIdType: req.body.govtIdType,
            govtIdNumber: req.body.govtIdNumber,
            category: req.body.category,
            categoryLogo: req.body.categoryLogo, // index from object
            state: req.body.state,
            description: req.body.description,
            amount: req.body.amount,
            useType: req.body.useType,
            uid: shortCodes[req.body.category] + '-' + generateRandomNumber(8),
            status: Date.now() <= req.body.startsAt ? 'upcoming' : 'valid'
        });

        await voucher.save();

        // Voucher created by bank
        User.findOneAndUpdate(
            { _id: req.user._id },
            { $push: { vouchers: voucher._id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        // Voucher created for user
        User.findOneAndUpdate(
            {
                name: req.body.beneficiaryName,
                phone: req.body.beneficiaryPhone
            },
            { $push: { vouchers: voucher._id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );

        // SEND SMS TO USER W STRING AND QR CODE (TBD)

        res.status(201).json({
            message: 'Voucher successfully created!',
            data: {
                voucher
            }
        });
    } catch {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const viewVouchers = async (req, res) => {
    try {
        currentBank = User.findById(req.user._id);

        let vouchers = [];
        for await (const item of currentBank.vouchers) {
            const voucher = await Voucher.findById(item);
            vouchers.push(voucher);
        }

        res.status(200).json({
            message: 'Vouchers list',
            data: {
                vouchers
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const revokeVoucher = async (req, res) => {
    try {
        const voucher = await Voucher.findById(req.params.id);

        if (!voucher) {
            res.status(404).json({
                message: 'Voucher not found'
            });
        } else {
            voucher.status = 'revoked';
            await voucher.save();

            res.status(200).json({
                message: 'Voucher revoked',
                data: {
                    voucher
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createERupiVoucher,
    viewVouchers,
    revokeVoucher
};
