// Router for all group related actions, like creating/joining/deleting a group 
// As well as creating/deleting/patching/getting item of a group
// Must have a valid token, and to access group must be a member.
// To do item action, you must be a member of t he group 
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const validateGroupAccess = require('../middlewares/validateGroupAccess');
const validateItemAccess = require('../middlewares/validateItemAccess');

const groupController = require('../controllers/groupController');
const itemController = require('../controllers/itemController');

// Only logged user can do group action ns 
router.use(authenticateUser);

// Route to create a group
// body: groupName, groupDescription
router.post('/create', groupController.createGroup);

// Route to join a group
router.post('/join/:groupName', groupController.joinGroup);

// Route to delete a group
router.delete('/:groupName', validateGroupAccess, groupController.deleteGroup);

// route to add a new item to the group
// body: name, description and not most amount
router.post('/:groupName/item', validateGroupAccess, itemController.addItemToTheGroup);

// route to get/patch/delete an item from a group
// body for patch: name, description and not most amount
router.route("/:groupName/item/:itemId", validateGroupAccess, validateItemAccess)
    .get(validateGroupAccess, validateItemAccess, itemController.getItemFromTheGroup)
    .patch(validateGroupAccess, validateItemAccess, itemController.patchItemOfTheGroup)
    .delete(validateGroupAccess, validateItemAccess, itemController.deleteItemFromTheGroup);



module.exports = router;
