const User = require('./../models/user');
const Voucher = require('./../models/voucher');
const Bank = require('./../models/bank');
const Beneficiary = require('./../models/beneficiary');
const { generateRandomNumber } = require('./../utils/functions');
const { shortCodes, organisationDetails } = require('./../utils/data');

const createERupiVoucher = async (req, res) => {
    try {
        const currentBank = await Bank.find({ user: req.user._id }).populate();

        const org = organisationDetails.find(
            ({ orgId }) => orgId == req.body.orgId
        );

        const voucher = new Voucher({
            title: req.body.title,
            startsAt: req.body.startsAt,
            endsAt: req.body.endsAt,
            orgId: req.body.orgId,
            orgLogo: org.orgLogo,
            issuedBy: req.user.name, // bank name
            issuedByLogo: currentBank[0].bankLogo, // bank schema se lo
            issuedById: req.user._id,
            beneficiaryName: req.body.beneficiaryName,
            beneficiaryPhone: req.body.beneficiaryPhone,
            govtIdType: req.body.govtIdType,
            govtIdNumber: req.body.govtIdNumber,
            category: req.body.category,
            state: req.body.state,
            description: req.body.description,
            amount: req.body.amount,
            useType: req.body.useType,
            uid: shortCodes[req.body.category] + '-' + generateRandomNumber(8),
            status: Date.now() <= req.body.startsAt ? 'upcoming' : 'valid'
        });

        await voucher.save();

        // Voucher created by bank
        currentBank[0].vouchersIssued.push(voucher._id);
        await currentBank[0].save();

        // Voucher created for user
        const beneficiary = await Beneficiary.findOne({
            phone: req.body.beneficiaryPhone
        });

        if (!beneficiary) {
            const newBeneficiary = new Beneficiary({
                phone: req.body.beneficiaryPhone,
                vouchersReceived: []
            });
            newBeneficiary.vouchersReceived.push(voucher._id);
            await newBeneficiary.save();
        } else {
            beneficiary.vouchersReceived.push(voucher._id);
            await beneficiary.save();
        }

        // SEND SMS TO USER W STRING AND QR CODE (TBD)

        res.status(201).json({
            message: 'Voucher successfully created!',
            data: {
                voucher
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message
        });
    }
};

const viewVouchers = async (req, res) => {
    try {
        // currentBank = User.findById(req.user._id);

        const vouchers = await Voucher.find({ issuedById: req.user._id });

        if (vouchers.length == 0) {
            res.status(404).json({
                message: 'Vouchers not found'
            });
        } else {
            res.status(200).json({
                message: 'Vouchers list',
                data: {
                    vouchers
                }
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const revokeVoucher = async (req, res) => {
    try {
        var voucher = await Voucher.findById(req.params.id);

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
