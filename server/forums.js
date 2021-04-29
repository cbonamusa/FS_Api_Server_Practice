const db = require('./db');
const okResult = (results) => ({status: "OK", results});
const errorResult = (details) => ({status: "ERROR", details});

const { Router } = require('express');

const router = new Router();

/* obtener dato bd */
router.get('/', async (req, res, next) => {
    try {
        const forums = await db.getForums();
        res.json(okResult(forums));
    } catch (e) {
        res.status(500).json(errorResult(e.toString()));
    }
});

router.post('/', async (req, res, next) => {
    const { name } = req.body; //hay que validar lo que envia el usuario
    if (!name) {
        return res
            .status(400)
            .json({status:"ERROR", details: "Missing name field"});
    }
    try {
        const newForum = await db.newForum(name);
        res.json(okResult(newForum))

    }catch(e) {
        res.status(500).json(errorResult(e.toString()));
    }

});

router.put('/:forum_id', async (req, res, next) => {
    const { forum_id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({status:"ERROR", details: "Missing name field"});
    }
    const { ok, found, data } = await db.updateForum(forum_id, name);
    if (!ok) {
        return res.status(500).json(errorResult(data))
    } else if (!found){
        return res.status(400).json(errorResult(`Forum widh id ${forum_id} not found`))
    } else {
        return res.json(okResult(data));
    }
})

router.delete('/:forum_id', async (req, res) => {
    const { forum_id } = req.params;
    const { ok, found, data } = await db.deleteForum(forum_id);
    if (!ok) {
        return res.status(500).json(errorResult(data));

    } else if (!found){
        return res.status(400).json(errorResult(`Forum widh id ${forum_id} not found`));

    } else {
        return res.json(okResult(data));
    }
});

module.exports = router;