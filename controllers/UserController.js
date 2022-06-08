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

  userAddToCart = async (req, res) => {
    console.log("vao r ne");
    const { email } = res.locals.data;
    const newCartItem = req.body;
    // newCartItem =
    //   {
    //     product: _id của product
    //     ,
    //     quantity: 4 // số lượng á Thành à :3
    //   }
    //
    console.log({ email, newCartItem });
    User.findOne({ email: email })
      .then((user) => {
        console.log({ user });
        let isExist = false;
        const editedCart = user.cart.map((item) => {
          if (item.product == newCartItem.product) {
            item.quantity = item.quantity + newCartItem.quantity;
            isExist = true;
          }
          return item;
        });
        if (!isExist) {
          editedCart.push(newCartItem);
        }
        console.log({ editedCart });
        user.cart = editedCart;
        user
          .save()
          .then((data) => {
            res.status(200).send(
              JSON.stringify({
                data,
              })
            );
          })
          .catch((error) => {
            throw new Error("System failure!");
          });
      })
      .catch((error) => {
        res.status(404).send(JSON.stringify(error));
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
