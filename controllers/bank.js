const User = require('./../models/user');
const Voucher = require('./../models/voucher');
const Bank = require('./../models/bank');
const Beneficiary = require('./../models/beneficiary');
const {
    generateRandomNumber,
    generateQrString,
    sendSms
} = require('./../utils/functions');
const { shortCodes, organisationDetails } = require('./../utils/data');
const csvtoJSON = require('csvtojson');
const fs = require('fs');
const axios = require('axios');
const _ = require('lodash');

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
            issuedByLogo: currentBank[0].bankLogo,
            issuedById: req.user._id,
            beneficiaryName: req.body.beneficiaryName,
            beneficiaryPhone: req.body.beneficiaryPhone,
            govtIdType: req.body.govtIdType,
            govtIdNumber: req.body.govtIdNumber,
            category: req.body.category,
            state: req.body.state,
            description: req.body.description,
            amount: req.body.amount,
            balanceAmount:
                req.body.useType == 'multiple' ? req.body.amount : undefined,
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

        let qrString = generateQrString(voucher.uid);

        // SEND SMS TO USER W STRING
        // await sendSms(
        //     `Dear Beneficiary, you have received your ₹UPI from ${org.orgName}. It can be accessed via the eZ-RUPI app. Incase the link does not work, the e₹UPI can be accessed through the string ${qrString}. Do not share this with anyone other than the concerned authorities. For queries reach out to us at https://american-express-ez-rupi.com/help.`,
        //     req.body.beneficiaryPhone
        // );

        await axios.post(
            `https://ntfy.sh/${voucher.beneficiaryPhone}`,

            `Received Rs. ${voucher.amount} e-RUPI voucher for ${voucher.category}`,
            {
                headers: {
                    Icon: org.orgLogo,
                    Title: 'New voucher received!',
                    Tags: 'money_with_wings'
                }
            }
        );

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

const createBulkERupiVouchers = async (req, res) => {
    try {
        const currentBank = await Bank.find({ user: req.user._id }).populate();

        csvtoJSON()
            .fromFile(req.file.path)
            .then(async (jsonOutput) => {
                let newVouchersArray = [];
                let newVouchersIdsArray = [];

                jsonOutput.forEach((newVoucher) => {
                    const org = organisationDetails.find(
                        ({ orgId }) => orgId == newVoucher.orgId
                    );
                    let startsObject = new Date(newVoucher.startsAt);
                    let endsObject = new Date(newVoucher.endsAt);
                    let logo = org.orgLogo;

                    let voucher = new Voucher({
                        title: newVoucher.title,
                        startsAt: startsObject,
                        endsAt: endsObject,
                        orgId: newVoucher.orgId,
                        orgLogo: logo,
                        issuedBy: req.user.name, // bank name
                        issuedByLogo: currentBank[0].bankLogo,
                        issuedById: req.user._id,
                        beneficiaryName: newVoucher.beneficiaryName,
                        beneficiaryPhone: newVoucher.beneficiaryPhone,
                        govtIdType: newVoucher.govtIdType,
                        govtIdNumber: newVoucher.govtIdNumber,
                        category: newVoucher.category,
                        state: newVoucher.state,
                        description: newVoucher.description,
                        amount: newVoucher.amount,
                        balanceAmount:
                            newVoucher.useType == 'multiple'
                                ? newVoucher.amount
                                : undefined,
                        useType: newVoucher.useType,
                        uid:
                            shortCodes[newVoucher.category] +
                            '-' +
                            generateRandomNumber(8),
                        status:
                            Date.now() <= startsObject ? 'upcoming' : 'valid'
                    });
                    newVouchersArray.push(voucher);
                    newVouchersIdsArray.push(voucher._id);
                });

                const insertedVouchers = await Voucher.insertMany(
                    newVouchersArray
                );
                fs.unlinkSync(req.file.path);

                for (const voucherId of newVouchersIdsArray) {
                    // Voucher created by bank
                    currentBank[0].vouchersIssued.push(voucherId);
                    await currentBank[0].save();

                    // Voucher created for user
                    const currentVoucher = await Voucher.findById(voucherId);
                    const beneficiary = await Beneficiary.findOne({
                        phone: currentVoucher.beneficiaryPhone
                    });

                    if (!beneficiary) {
                        const newBeneficiary = new Beneficiary({
                            phone: currentVoucher.beneficiaryPhone,
                            vouchersReceived: []
                        });
                        newBeneficiary.vouchersReceived.push(voucherId);
                        await newBeneficiary.save();
                    } else {
                        beneficiary.vouchersReceived.push(voucherId);
                        await beneficiary.save();
                    }

                    const org = organisationDetails.find(
                        ({ orgId }) => orgId == currentVoucher.orgId
                    );
                    let qrString = generateQrString(currentVoucher.uid);

                    // SEND SMS TO USER W STRING
                    // await sendSms(
                    //     `Dear Beneficiary, you have received your e-₹UPI from ${org.orgName}. It can be accessed via the eZ-RUPI app. Incase the link does not work, the e-₹UPI can be accessed through the string "${qrString}". Do not share this with anyone other than the concerned authorities. For queries reach out to us at https://american-express-ez-rupi.com/help.`,
                    //     currentVoucher.beneficiaryPhone
                    // );
                    await axios.post(
                        `https://ntfy.sh/${currentVoucher.beneficiaryPhone}`,

                        `Received Rs. ${currentVoucher.amount} e-RUPI voucher for ${currentVoucher.category}`,
                        {
                            headers: {
                                Icon: org.orgLogo,
                                Title: 'New voucher received!',
                                Tags: 'money_with_wings'
                            }
                        }
                    );
                }
                res.status(201).json({
                    message: 'Vouchers created!',
                    data: {
                        insertedVouchers
                    }
                });
            });
    } catch (error) {
        res.status(400).json({
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

const weeklyData = async (req, res) => {
    try {
        let barData = [];
        const barDataObj = {
            day: '',
            health: 0,
            agriculture: 0,
            education: 0,
            food: 0,
            housing: 0,
            transportation: 0,
            utility: 0,
            telecommunication: 0,
            other: 0
        };
        const weekday = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];

        const bank = await Bank.findById(req.user.bank);

        var d = new Date();
        d.setDate(d.getDate() - 6);

        let vouchers = await Voucher.find({
            issuedById: bank.user,
            createdAt: { $gte: d }
        });

        const count = (data, d) => {
            let temp = _.cloneDeep(barDataObj);
            temp.day = weekday[d.getDay()];

            for (let item of data) {
                if (item.category == 'health') {
                    temp.health += 1;
                } else if (item.category == 'agriculture') {
                    temp.agriculture += 1;
                } else if (item.category == 'education') {
                    temp.education += 1;
                } else if (item.category == 'food') {
                    temp.food += 1;
                } else if (item.category == 'housing') {
                    temp.housing += 1;
                } else if (item.category == 'transportation') {
                    temp.transportation += 1;
                } else if (item.category == 'utility') {
                    temp.utility += 1;
                } else if (item.category == 'telecommunication') {
                    temp.telecommunication += 1;
                } else if (item.category == 'other') {
                    temp.other += 1;
                }
            }
            return temp;
        };

        for (let i = 0; i < 7; i++) {
            let temp = [];
            for (let item of vouchers) {
                if (item.createdAt.toDateString() === d.toDateString()) {
                    temp.push(item);
                }
            }
            barData.push(count(temp, d));
            d.setDate(d.getDate() + 1);
        }

        res.status(200).json({
            message: 'Weekly Vouchers',
            data: {
                barData
            }
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    createERupiVoucher,
    createBulkERupiVouchers,
    viewVouchers,
    revokeVoucher,
    weeklyData
};
