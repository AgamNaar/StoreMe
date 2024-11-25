const Group = require('../models/groupModel');

// Middleware to validate that users are members of the group they are trying to access
// adds the user role in the group as well as the group id to req
const validateGroupAccess = async (req, res, next) => {
    try {
        const { user } = req;
        const groupName = req.params.groupName;

        // Find the group by the name, and bring only the member with the user id
        const group = await Group.findOne(
            { groupName: groupName, "members.userId": user.id },
            { "members.$": 1 }
        );

        // Check if the group exist and if the user is a member 
        if (!group || !group.members[0])
            return res.status(403).json({ error: 'Group does not exist or user not a part of the group' });


        // Add the user role to the request, and the group id
        req.role = group.members[0].role;
        req.groupId = group.id;

        next();
    } catch (error) {
        console.error('Error in validateGroupAccess middleware:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = validateGroupAccess;
