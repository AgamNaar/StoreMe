const mongoose = require('mongoose');
// check later if can delete
const Item = require('../models/itemModel');

const memberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'member'], default: 'member'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
});

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    groupDescription: {
        type: String,
        default: 'new group',
        required: true,
    },
    createdBy: {
        type: String,
        required: true
    },
    members: [memberSchema],
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('group', groupSchema);
