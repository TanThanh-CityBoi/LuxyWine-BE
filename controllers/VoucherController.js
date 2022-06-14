const Voucher = require("../models/voucher");
class VoucherController {
  getAll = async (req, res) => {
    console.log("Vô voucher");
    Voucher.find()
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
    Voucher.findById(req.params.id)
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
    const voucher = req.body;
    const _voucher = new Voucher({
      ...voucher,
    });

    console.log("debug 2", _voucher);
    _voucher
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
    const voucher = req.body;

    Voucher.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          ...voucher,
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
    Voucher.deleteOne({ _id: req.params.id }, function (err, data) {
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
module.exports = new VoucherController();
