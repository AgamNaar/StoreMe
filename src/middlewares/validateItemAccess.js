const Group = require('../models/groupModel');
const Item = require('../models/itemModel');


// Middleware to validate items are being changed only by members of the group of the item
// adds itemId to the req
const validateItemAccess = async (req, res, next) => {
    try {
        const { itemId } = req.params;

        // Check if the item with the itemId is inside the item array of that group
        const group = await Group.findOne({
            _id: req.groupId,
            items: { _id: itemId }
        });

        // check if the item was found inside the group
        if (!group)
            return res.status(403).json({ error: 'Item not found' });

        // find item from the item db
        const item = await Item.findById(itemId);

        // item exist in the group, but not in the item db, bug
        if (!item) {
            console.log('error: item: ${itemId} exist in group array of group: ${req.groupId} but not in item array')
            return res.status(500).json({ error: 'Internal server error' });
        }

        // add item to the req
        req.item = item

        next();
    } catch (error) {
        console.error('Error in validateItemAccess middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = validateItemAccess;
