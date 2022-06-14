const ObjectId = require("mongodb").ObjectID;
const { JWTVerify } = require("../helper/JWT");
const Receipt = require("../models/receipt");
class ReceiptController {
  getUserReceipt = async (req, res) => {
    const id = new ObjectId(res.local.data.userId);
    Receipt.find({ creater: id })
      .sort({ createdAt: -1 })
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

  getList = async (req, res) => {
    const params = req.query;
    console.log({ params });
    Receipt.find(params)
      .sort({ createdAt: -1 })
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
    Receipt.findById(req.params.id)
      .populate("creater")
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
    const receipt = req.body;
    const authorizationHeader = req.headers["authorization"];
    console.log({ authorizationHeader });
    if (authorizationHeader) {
      const token = authorizationHeader?.split(" ")[1];
      const reqData = JWTVerify(token);
      console.log({
        token,
        reqData,
      });
      receipt.creater = reqData.decoded.id;
    }

    console.log({ receipt });
    const _receipt = new Receipt({
      ...receipt,
    });

    console.log("debug 2", _receipt);
    _receipt
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
    const receipt = req.body;
    console.log({ id, receipt });

    Receipt.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...receipt,
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
    Receipt.deleteOne({ _id: req.params.id }, function (err, data) {
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

module.exports = new ReceiptController();
