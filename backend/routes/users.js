const router = require('express').Router();
let User = require('../modals/users.modals');

router.get('/', (_req, res) => {
    User.find().then((users) => {
        res.json(users)
    }).catch((err) => {
        res.status(400).json('Error : ' + err)
    });
});

router.post('/add', (req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });

    newUser.save().then(() => {
        res.json(username + ' user added!!!');
    }).catch(err => {
        res.json('Error: ' + err);
    });
});

router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id).then((users) => {
        res.json(` ${users} deleted!!!`);
    }).catch((err) => {
        res.status(400).json('Error : ' + err)
    });
});


module.exports = router;