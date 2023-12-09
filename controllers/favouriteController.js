const { User, pSchema } = require('../models/User')
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

module.exports.problems_add = async (req, res) => {
    const favList = req.body.favList;

    try {
        for (var i = 0; i < favList.length; i++) {
            var pName = favList[i].pName;
            var pURL = favList[i].pURL;
            console.log(pName, pURL);
            
            try {
                await pSchema.create({ problemName: pName, url: pURL, userEmail: res.locals.user.email });
            } catch (error) {
                console.log("8888888888",error);
            }
        }
        res.sendStatus(201);
        console.log("SAVED");
    }
    catch (err) {
        console.log(err);
        res.status(400);
    }

}

module.exports.problems_retrieve = async (req, res) => {
    const userEmail = res.locals.user.email;

    try {
        const problems = await pSchema.find({ userEmail });
        res.locals.problems = problems;
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};