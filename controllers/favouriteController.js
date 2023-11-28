const { User, pSchema } = require('../models/User')
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

module.exports.problems_add = async (req, res) => {
    const favList = req.body.favList;
    console.log(typeof(favList));
    console.log(res.locals.user);

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