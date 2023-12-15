const { User, pSchema } = require("../models/User");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

module.exports.problems_add = async (req, res) => {
  const favList = req.body.favList;

  try {
    for (var i = 0; i < favList.length; i++) {
      var pName = favList[i].pName;
      var pURL = favList[i].pURL;

      try {
        await pSchema.create({
          problemName: pName,
          url: pURL,
          userEmail: res.locals.user.email,
        });
      } catch (error) {}
    }
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
  }
};
module.exports.problem_delete = async (req, res) => {
  const problemURL = req.body.problemURL;
  try {
    await pSchema.deleteOne({ url: problemURL });
    res.sendStatus(201);
  } catch (err) {
    res.status(400);
  }
};

module.exports.problems_retrieve = async (req, res) => {
  const userEmail = res.locals.user.email;

  try {
    const problems = await pSchema.find({ userEmail });
    res.locals.problems = problems;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
