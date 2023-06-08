const Chat = require('../model/Chat');

const getAllChat = async (req, res) => {
    const chats = await Chat.find();
    if (!chats) return res.sendStatus(204).json({ 'message': 'No chat at all!' });

    res.json(chats);
}

const isNChats = async () => {
    const chats = await Chat.estimatedDocumentCount();

    if(chats && chats >= 20) {
        const res = await Chat.findOneAndRemove({}, { sort: {_id: 1}});
    }
    console.log(chats);
    return chats;
}

const addChat = async (req, res) => {
    if (!req?.body?.user || !req?.body?.time || !req?.body?.msg) {
        return res.sendStatus(400).json({ 'message': 'User, time, msg are required!' });
    }

    const chatsN = await isNChats();

    try {
        var result = await Chat.create({
            user: req.body.user,
            time: req.body.time,
            msg: req.body.msg
        });
        if (chatsN == 20) result = {isEnough: true};
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllChat,
    addChat
}
