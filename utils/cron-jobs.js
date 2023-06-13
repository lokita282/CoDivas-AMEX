const Voucher = require('../models/voucher');

const setAllVoucherStatus = async () => {
    try {
        let vouchers = await Voucher.find({});
        for (let voucher of vouchers) {
            if (voucher.status === 'revoked') {
                continue;
            }
            if (voucher.status === 'redeemed') {
                if (voucher.useType === 'single') {
                    continue;
                } else {
                    if (voucher.balanceAmount && voucher.balanceAmount > 0) {
                        voucher.status = 'valid';
                        await voucher.save();
                    }
                }
            }

            if (voucher.status === 'upcoming') {
                if (voucher.startsAt < Date.now()) {
                    voucher.status = 'valid';
                    await voucher.save();
                }
            }
            if (voucher.status === 'valid') {
                if (voucher.startsAt > Date.now()) {
                    voucher.status = 'upcoming';
                    await voucher.save();
                } else if (voucher.endsAt < Date.now()) {
                    voucher.status = 'expired';
                    await voucher.save();
                }
            }
        }
        return;
    } catch (error) {
        console.log(error);
        return;
    }
};

const setVoucherStatuses = async (vouchers) => {
    try {
        for (let voucher of vouchers) {
            if (voucher.status === 'revoked') {
                continue;
            }
            if (voucher.status === 'redeemed') {
                if (voucher.useType === 'single') {
                    continue;
                } else {
                    if (
                        parseInt(voucher._doc.balanceAmount) &&
                        parseInt(voucher._doc.balanceAmount) > 0
                    ) {
                        voucher.status = 'valid';
                        await voucher.save();
                    }
                }
            }

            if (voucher.status === 'upcoming') {
                if (voucher.startsAt < Date.now()) {
                    voucher.status = 'valid';
                    await voucher.save();
                }
            }
            if (voucher.status === 'valid') {
                if (voucher.startsAt > Date.now()) {
                    voucher.status = 'upcoming';
                    await voucher.save();
                } else if (voucher.endsAt < Date.now()) {
                    voucher.status = 'expired';
                    await voucher.save();
                }
            }
        }
        return vouchers;
    } catch (error) {
        console.log(error);
        return vouchers;
    }
};
module.exports = {
    setAllVoucherStatus,
    setVoucherStatuses
};
