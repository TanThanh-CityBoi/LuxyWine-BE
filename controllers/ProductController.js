const Product = require("../models/product");

class ProductController {
  getList = async (req, res) => {
    // console.log("Vô nhầm route")
    Product.find()
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
    Product.findById(req.params.id)
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
    const product = req.body;
    const _product = new Product({
      ...product,
    });

    console.log("debug 2", _product);
    _product
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
    const product = req.body;

    Product.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...product,
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

  deleteMany = async (req, res)=>{
    res.status(200).send("Hihi delete many")
  }

  _delete = async (req, res) => {
    Product.deleteOne({_id : req.params.id}, function (err, data) {
      console.log({ err, data });
      if (err) {
        res.status(404).send(err);
      } else {
        res
          .status(200)
          .send(JSON.stringify({ message: "Delete Successfully" , data}));
      }
    });
  };
}

module.exports = new ProductController();
