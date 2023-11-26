const Requests = require('../models/requests')

exports.addExpense =  async (req, res) =>{
    const {senderMail,receiverMail}=req.body;
    try{
        for (let index = 0; index < receiverMail.length; index++) {
            const mailId = receiverMail[index][0];
            const cost = receiverMail[index][1];
            const request = await Requests.findOne({ senderEmail: senderMail,receiverEmail: mailId });
            if (request){
                await Requests.updateOne({
                    senderEmail: senderMail,
                    receiverEmail: mailId,
                }, {
                    $set: {
                        value: request.value+cost
                    }
                })
            }
            else{
                const newRequest = await Requests.findOne({ senderEmail: mailId,receiverEmail: senderMail });
                await Requests.updateOne({
                    senderEmail: mailId,
                    receiverEmail: senderMail,
                }, {
                    $set: {
                        value: newRequest.value-cost
                    }
                })
            }
            
        }
        return res.status(200).json({"message":"Added Expense"})
    }
    catch(error){
        return res.status(400).json({"error":error})
    }
}

exports.getExpenses = async(req,res)=>{
    const {Email} = req.body;

    try {
        const expenses = await Requests.find({
            $or: [{ senderEmail: Email }, { receiverEmail: Email }],
        });

        res.status(200).json({ "message":"Successfully", "expenses": expenses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}