const Requests = require('../models/requests')

exports.invite = async (req, res) => {
    const { senderEmail, receiverEmail } = req.body;

    try {
        for (let index = 0; index < receiverEmail.length; index++) {
            const mailId = receiverEmail[index];
            const request1 = await Requests.findOne({ senderEmail: senderEmail, receiverEmail: mailId });
            const request2 = await Requests.findOne({ senderEmail: mailId, receiverEmail: receiverEmail });

            if (request1 == null && request2 == null) {
                const request = await Requests.create({
                    senderEmail: senderEmail,
                    receiverEmail: mailId,
                });
            }
        }
        return res.status(200).json({ "msg": "Sent the invitations" })
    } catch (error) {
        return res.status(400).json({ "msg": "unable to Sent the invitations" })
    }

}

exports.display = async (req, res) => {
    const { receiverEmail, flag } = req.body;
    try {
        const requests = await Requests.find({ receiverEmail, flag })
        return res.status(200).json({ "msg": "Display Data Fetched", "Requests": requests })
    }
    catch (error) {
        return res.status(400).json({ "error": error })
    }
}

exports.acceptInvite = async (req, res) => {
    const { id } = req.body;

    try {
        await Requests.updateOne({
            _id: id
        }, {
            $set: {
                flag: true,
            }
        })
        return res.status(200).json({ "msg": "invite updated" })
    }
    catch (error) {
        return res.status(400).json({ "msg": "unable to update" })
    }

}


exports.RejectInvite = async (req, res) => {
    const { id } = req.body;

    try {
        await Requests.deleteOne({ _id: id })
        return res.status(200).json({ "msg": "invite updated" })
    }
    catch (error) {
        return res.status(400).json({ "msg": "unable to update" })
    }

}