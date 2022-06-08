const User = require("../models/user");

class UserController {
  getList = async (req, res) => {
    // console.log("Vô nhầm route")
    User.find()
      .exec()
      .then((data) => {
        res.status(200).send(
          JSON.stringify({
            data: data,
          })
        );
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  };

  getOne = async (req, res) => {
    User.findById(req.params.id)
      .then((product) => {
        res.status(200).send(
          JSON.stringify({
            data: product,
          })
        );
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  };

  getCurrentUser = async (req, res) => {
    const { email } = res.locals.data;
    console.log({ email }, res.locals.data);
    User.find({ email: email })
      .then((product) => {
        res.status(200).send(
          JSON.stringify({
            data: product,
          })
        );
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  };

  create = async (req, res) => {
    const user = req.body;
    const _user = new User({
      ...user,
    });

    console.log("debug 2", _user);
    _user
      .save()
      .then((data) => {
        res.status(200).send(JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      });
  };

  update = async (req, res) => {
    const id = req.params.id;
    const user = req.body;

    User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...user,
        },
      },
      {
        returnOriginal: false,
      },
      function (err, data) {
        console.log({ err, data });
        if (err) {
          res.status(404).send(err);
        } else {
          res.status(200).send(JSON.stringify({ data }));
        }
      }
    );
  };

  _delete = async (req, res) => {
    User.deleteOne({ _id: req.params.id }, function (err, data) {
      console.log({ err, data });
      if (err) {
        res.status(404).send(err);
      } else {
        res
          .status(200)
          .send(JSON.stringify({ message: "Delete Successfully", data }));
      }
    });
  };
}
module.exports = new UserController();
