const User = require("../model/User");
class userController {
  async index(req, res, next) {
    // User.find({})
    //   .then((data) => res.json(data))
    //   .catch((error) => console.log(error));
    // try {
    //   const listUser = await User.find({});
    //   if (!listUser) {
    //     res.status(400).json("Users not Found !!!");
    //   }
    //   res.status(200).json(listUser);
    // } catch (error) {
    //   console.log(error);
    // }
    // res.json(req.query);
    let page = parseInt(req.query.page);
    if (page < 1) {
      page = 1;
    }
    const limit = 3;
    const start = (page - 1) * limit;
    const end = page * limit;
    if (!page) {
      try {
        const listUser = await User.find({});
        if (!listUser) {
          res.status(400).json("Users not Found !!!");
        }
        res.status(200).json(listUser);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const userPaging = await User.find().limit(limit).skip(start).exec();
        const countCollection = await User.countDocuments();

        if (!userPaging) {
          res.status(400).json("Not Found !!!");
        }
        res.status(200).json({ userPaging, count: countCollection });
      } catch (error) {
        console.log(error);
      }
    }
  }

  findById(req, res, next) {
    User.findById({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
  }
}

module.exports = new userController();

// function index(req, res, next) {
//   res.json({ api: "user1" });
// }

// module.exports = { index, abc };
