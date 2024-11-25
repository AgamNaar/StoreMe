const mongoose = require('mongoose');

const actionLogSchema = new mongoose.Schema({
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    actionType: {
        type: String,
        required: true
    },
    actionDetails: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('actionLog', actionLogSchema);
