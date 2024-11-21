// Controller to handle all of group related actions (login,singUp)

const Group = require('../models/groupModel');



// group controller class
class GroupController {

    // Method to create a new group 
    static async createGroup(req, res) {
        try {
            const { groupName, groupDescription } = req.body;

            // Check if the group already exist 
            if (await Group.findOne({ groupName: groupName }))
                return res.status(400).json({ error: 'Group already exists' });

            // create new group
            const newGroup = new Group({
                groupName,
                groupDescription,
                createdBy: req.user.id,
                members: [{ userId: req.user.id, userName: req.user.userName, role: 'admin' }]
            });

            // save the new group in DB
            await newGroup.save()

            return res.status(201).json({ message: 'group was created!' });
        } catch (error) {
            console.log('Failed to create group', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to join a new group 
    static async joinGroup(req, res) {
        try {

            const { groupName } = req.body;

            // Find the group by name
            const group = await Group.findOne({ groupName });

            const userId = req.user.id;
            const userName = req.user.userName;

            // Check if the user is already a member of the group
            const userExists = group.members.some(member => member.userId.toString() === userId);

            if (userExists)
                return res.status(400).json({ error: 'User already a member of the group' });

            // Add the user to the group
            group.members.push({ userId, userName, role: 'member' });

            // Save the updated group
            await group.save();

            return res.status(201).json({ message: 'joined group!' });
        } catch (error) {
            console.log('Failed to join group', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    // Method to delete a new group 
    static async deleteGroup(req, res) {
        try {

            // check if the user is an admin, only admins can delete groups
            if (req.role !== 'admin')
                return res.status(400).json({ error: 'user is not an admin, cant delete group' });

            // remove the group from the db
            await req.group.deleteOne();

            return res.status(201).json({ message: 'group was deleted!' });
        } catch (error) {
            console.log('Failed to delete group', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}



module.exports = GroupController;
