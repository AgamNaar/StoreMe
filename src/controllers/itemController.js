const Group = require('../models/groupModel');
const Item = require('../models/itemModel');

const { logActionFromRequest } = require('../services/logService');


// Controller to handle all of item related actions (creating, patching etc...)
class ItemController {

    // Method to add a new item to the group 
    static async addItemToTheGroup(req, res) {
        try {
            const { name, description, amount } = req.body;

            // check if a name and description was entered
            if (!name || !description)
                return res.status(400).json({ error: 'missing item info' });

            // create new item and save it 
            const newItem = new Item({
                name,
                description,
                amount,
                createdBy: req.user.id,
            });

            await newItem.save();

            // save the item id in the group 
            await Group.updateOne(
                { _id: req.groupId },
                { $push: { items: newItem._id } }
            );

            req.item = newItem;

            await logActionFromRequest(req, `new Item: ${formatItemLog(newItem)}`);
            return res.status(201).json({ message: 'item added to the group!', newItem });
        } catch (error) {
            console.log('Failed to add new item', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to get an item  
    static async getItemFromTheGroup(req, res) {
        try {
            return res.status(200).json(req.item);
        } catch (error) {
            console.log('Failed to get item', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to update an item of the group 
    static async patchItemOfTheGroup(req, res) {
        try {
            const { name, description, amount } = req.body;
            const fields = { name, description, amount };
            let actionDetails = '';

            // save the new fields into item, and write in actionDetails what value changed
            Object.keys(fields).forEach(field => {
                if (fields[field] && req.item[field] !== fields[field]) {
                    actionDetails += `${field} changed from ${req.item[field]} to ${fields[field]}. \n`;
                    req.item[field] = fields[field];
                }
            });
            actionDetails = actionDetails.trimEnd();

            // Save the updated item
            await req.item.save();

            await logActionFromRequest(req, actionDetails);

            return res.status(200).json(req.item);
        } catch (error) {
            console.log('Failed to update item', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to delete an item from the group 
    static async deleteItemFromTheGroup(req, res) {
        try {
            // delete the item from the group 
            await Group.updateOne(
                { _id: req.groupId },
                { $pull: { items: req.item.id } }
            );

            // delete the item from the item db
            await req.item.deleteOne();

            await logActionFromRequest(req, '-');
            return res.status(200).json({ message: 'item deleted!' });
        } catch (error) {
            console.log('Failed to delete item', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

// take an item and stringify only its name, description and amount
function formatItemLog(item) {
    if (!item) return ''; // Handle cases where item is null or undefined

    const { name, description, amount } = item;
    return JSON.stringify({ name, description, amount });
}



module.exports = ItemController;
