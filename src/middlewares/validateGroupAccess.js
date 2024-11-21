const Group = require('../models/groupModel');

const validateGroupAccess = async (req, res, next) => {
    try {
        const { groupName } = req.body;

        // Find the group by name
        const group = await Group.findOne({ groupName });

        if (!group)
            return res.status(401).json({ error: 'Group does not exist' });

        // Check if the user is inside the group
        const member = group.members.find(member => member.userId.toString() === req.user.id);

        if (!member)
            return res.status(401).json({ error: 'member not part of the group' });

        // Add the user role to the request, and the group
        req.role = member.role;
        req.group = group;

        next();
    } catch (error) {
        console.error('Authentication failed:', error);
        res.status(401).json({ error: 'Authentication failed' });
    }
}


module.exports = validateGroupAccess;
