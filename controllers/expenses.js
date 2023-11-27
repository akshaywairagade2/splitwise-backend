const Requests = require('../models/requests')

exports.addExpense = async (req, res) => {
    const { id, cost, issender } = req.body;
    try {
        const request = await Requests.findOne({ _id: id });
        if (request) {
            await Requests.updateOne({
                _id: id
            }, {
                $set: {
                    value: issender ? request.value + cost : request.value - cost
                }
            })
            return res.status(200).json({ "message": "Added Expense Successfuly" })
        }
        else {
            return res.status(400).json({ "message": "Unable to add" })
        }
    }
    catch (error) {
        return res.status(400).json({ "error": error })
    }
}

exports.getExpenses = async (req, res) => {
    const { Email } = req.body;

    try {
        const expenses = await Requests.find({
            $or: [{ senderEmail: Email, flag: true }, { receiverEmail: Email, flag: true }],
        });

        res.status(200).json({ "message": "Successfully", "expenses": expenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.settleUp = async (req, res) => {
    const { id } = req.body;

    try {
        const request = await Requests.findOne({ _id: id });
        if (request) {
            await Requests.updateOne({
                _id: id
            }, {
                $set: {
                    value: 0
                }
            })
            return res.status(200).json({ "message": "SettleUp Successfully" })
        }
        else {
            return res.status(400).json({ "message": "Unable to SettleUp" })
        }
    }
    catch (error) {
        return res.status(400).json({ "error": error })
    }
}