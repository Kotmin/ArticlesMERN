const express = require('express');
const { registerUser,
        loginUser } = require('../controllers/authController');
const { changeRank, updateUser,
        getUsers, deleteUser,
        softDeleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const worker = require('../middleware/workerMiddleware.js');



const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);


router.get('/', getUsers);

router.get('/profile', auth, (req, res) => {
  res.json({ message: `Hello ${req.user.id}, this is your profile.\nYou're: ${req.user.rank}` });
});


// router.put('/rank',auth, worker, changeRank);

router.put('/rank',auth, changeRank);

router.put('/update', updateUser); // just pass and description


router.route('/deactivate/:id')
  .put(softDeleteUser); // changes rank to "Deleted"

router.route('/:id')
  .delete(deleteUser)




module.exports = router;
