// Service call to handle logs in db of user actions (i.e removing/adding/changing items )
const ActionLog = require('../models/actionLogModel');

// Function to log an action using request details 
// req params: groupId, user, itemId, method
async function logActionFromRequest(req, actionDetails) {
    try {
        // Call logAction with necessary parameters from the request
        const { groupId, user, item, method } = req;
        return await logAction(groupId, user.id, item.id, method, actionDetails);
    } catch (error) {
        throw new Error('Failed to log action: ' + error.message);
    }
}

// Function to log an action
async function logAction(groupId, userId, itemId, actionType, actionDetails) {
    try {
        // Check if all parameters are provided
        if (!groupId || !userId || !actionType || !actionDetails)
            throw new Error('Missing required information');

        // Create a new action log
        const newActionLog = new ActionLog({
            groupId,
            userId,
            itemId,
            actionType,
            actionDetails,
        });

        // Save the action log to the database
        await newActionLog.save();

        return { message: 'Action logged successfully' };
    } catch (error) {
        throw new Error('Failed to log action: ' + error.message);
    }
}



module.exports = { logAction, logActionFromRequest };
