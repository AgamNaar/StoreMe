// Route for all group related actions (create, delete ...)
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const validateGroupAccess = require('../middlewares/validateGroupAccess');

const groupController = require('../controllers/groupController');

// Only logged user can do group action ns 
router.use(authenticateUser);

// Route to create a group
router.post('/create', groupController.createGroup);

// Route to join a group
router.post('/join', groupController.joinGroup);

// only group with access to that group can do actions in it
router.use(validateGroupAccess);

// Route to leave a group
router.post('/leave', groupController.leaveGroup);

// Route to leave a delete
router.delete('/:groupName', groupController.deleteGroup);



module.exports = router;
