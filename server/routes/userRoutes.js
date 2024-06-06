const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { changeRank, updateUser, getUsers, deleteUser, softDeleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);


router.get('/', getUsers);

router.get('/profile', auth, (req, res) => {
  res.json({ message: `Hello ${req.user.id}, this is your profile.` });
});


router.put('/rank', changeRank);

router.put('/update', updateUser); // just pass and description


router.route('/delete')
  .delete(auth,deleteUser)
  .put(softDeleteUser); // changes rank to "Deleted"







module.exports = router;
