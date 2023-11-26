const Requests = require('../models/requests')

exports.invite = async (req,res) => {
    const {senderEmail, receiverEmail} = req.body;
    for (let index = 0; index < receiverEmail.length; index++) {
        const mailId = receiverEmail[index];
        const request1 = await Requests.findOne({ senderEmail: senderEmail,receiverEmail: mailId });
        const request2 = await Requests.findOne({ senderEmail: mailId,receiverEmail: receiverEmail });
        if (!request1 && !request2){
            const user = await Requests.create({
                senderEmail,
                emailId,
            });
        }
    }
    return res.status(200).json({"msg":"Sent the invitations"})
}

exports.display= async (req,res) =>{
    const {email} = req.body;
    try{
        const requests=await Request.find({receiverEmail:email, flag:false})
        return res.status(200).json({"msg":"Display Data Fetched","Requests":requests})
    }
    catch (error){
        return res.status(400).json({"error":error})
    }
}

exports.acceptInvite = async (req,res) =>{
    const {receiverEmail, senderEmail} = req.body;
    try{
        await Requests.updateOne({
            senderEmail: senderEmail,
            receiverEmail: receiverEmail,
        }, {
            $set: {
                flag: true,
            }
        })
        return res.status(200).json({"msg":"invite updated"})
    }
    catch (error){
        return res.status(400).json({"msg":"unable to update"})
    }
    
}

