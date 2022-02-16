const bcrypt = require("bcryptjs"); // decode

const Manager = require("../models/manager"); // db model
const Store = require("../models/store"); //
const ShiftType = require("../models/shiftType");
const ShiftAssign = require("../models/shiftAssign");
const Revenue = require("../models/revenue");
const ProductType = require("../models/productType");
const ProductJoinType = require("../models/productJoinType");
const ReturnProduct = require("../models/returnProduct");
const Receipt = require("../models/receipt");
const Product = require("../models/product");
const Employee = require("../models/employee");
const Coupon = require("../models/coupon");
const Regulation = require("../models/regulation");
const TimeKeeping = require("../models/timeKeeping");
const NextWeekTimeKeeping = require("../models/nextWeekTimeKeeping");
const { JWTAuthToken } = require("../helper/JWT");

const MESSAGES = {
    SIGN_IN_SUCCESS: "Sign-in successfully.",
    REGISTER_SUCCESS: "Register successfully.",
    RESET_PASSWORD_SUCCESS: "Reset password successfully.",
    PASSWORD_OR_ACCOUNT_ERROR:
        "The email IS NOT registered or you entered the WRONG password.",
    EMAIL_ERROR: "The email IS NOT registered.",
    EMAIL_HAS_BEEN_USED:
        "The email address has been used for regular or Google account.",
    EMAIL_USED_GG: "The email has to sign in WITH GOOGLE.",
    MONGODB_ERROR: "Some errors with database.",
};
const STATUS = {
    SUCCESS: 1,
    FAILURE: -1,
};

class Authentication {
    authSignInWithGG = async (req, res) => {
        var newManager = new Manager({
            _id: req.body.email + "_Google",
            email: req.body.email,
            firstName: req.body.givenName,
            lastName: req.body.familyName,
            storeID: req.body.email,
        });

        // check whether gmail is registered by regular method
        Manager.findOne({ _id: req.body.email })
            .then((result1) => {
                if (result1) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.FAILURE,
                            message: MESSAGES.EMAIL_HAS_BEEN_USED,
                        })
                    );
                } else {
                    Manager.findOne({ _id: newManager._id }).then((result) => {
                        if (result) {
                            getAllData(result.email).then((data) => {
                                res.send(
                                    JSON.stringify({
                                        status: STATUS.SUCCESS,
                                        message: MESSAGES.SIGN_IN_SUCCESS,
                                        token: JWTAuthToken({
                                            email: result.email,
                                        }),
                                        email: result.email,
                                        _id: result._id,
                                        data,
                                    })
                                );
                            });
                        } else {
                            newManager.save().then((result) => {
                                const newStore = new Store({
                                    _id: result.storeID,
                                });
                                newStore.save();

                                getAllData(result.email).then((data) => {
                                    res.send(
                                        JSON.stringify({
                                            status: STATUS.SUCCESS,
                                            message: MESSAGES.SIGN_IN_SUCCESS,
                                            token: JWTAuthToken({
                                                email: result.email,
                                            }),
                                            email: req.body.email,
                                            _id: req.body.email,
                                            data,
                                        })
                                    );
                                });
                            });
                        }
                    });
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.MONGODB_ERROR,
                    })
                );
            });
    };

    authSignInRegular = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        Manager.findOne({ _id: email })
            .exec()
            .then((data) => {
                //check password, if password is correct then get all data and respond for client
                if (bcrypt.compareSync(password, data.password)) {
                    getAllData(email).then((data) => {
                        res.send(
                            JSON.stringify({
                                status: STATUS.SUCCESS,
                                message: MESSAGES.SIGN_IN_SUCCESS,
                                token: JWTAuthToken({ email: req.body.email }),
                                email: req.body.email,
                                _id: req.body.email,
                                data,
                            })
                        );
                    });
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.PASSWORD_OR_ACCOUNT_ERROR,
                    })
                );
            });
    };

    register = async (req, res) => {
        const email = req.body.email;

        Manager.findOne({ _id: email })
            .exec()
            .then((data) => {
                if (data) {
                    throw new Error();
                } else {
                    return Manager.findOne({ _id: email + "_Google" }).exec();
                }
            })
            .then((data) => {
                if (data) {
                    throw new Error();
                } else {
                    const newManager = new Manager({
                        _id: email,
                        password: req.body.password,
                        email: email,
                        phoneNumber: req.body.tel,
                        storeID: email,
                    });

                    newManager
                        .save()
                        .then((data) => {
                            const newStore = new Store({
                                _id: newManager.storeID,
                            });

                            newStore.save();
                            const newRegulation = new Regulation({
                                _id: newManager.storeID,
                            });

                            newRegulation.save();

                            getAllData(data.email).then((result) => {
                                res.send(
                                    JSON.stringify({
                                        status: STATUS.SUCCESS,
                                        message: MESSAGES.SIGN_IN_SUCCESS,
                                        token: JWTAuthToken({
                                            email: data.email,
                                        }),
                                        email: data.email,
                                        _id: data.email,
                                        data: result,
                                    })
                                );
                            });
                        })
                        .catch((err) => {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.FAILURE,
                                    message: err.message,
                                })
                            );
                        });
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.EMAIL_HAS_BEEN_USED,
                    })
                );
            });
    };

    forgetPassword = async (req, res) => {
        const email = req.body.email;
        const newPassword = req.body.password;

        Manager.findByIdAndUpdate(
            {
                _id: email,
            },
            {
                password: newPassword,
            },
            {
                returnOriginal: false,
            }
        )
            .then((data) => {
                if (data) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.SUCCESS,
                            message: MESSAGES.RESET_PASSWORD_SUCCESS,
                        })
                    );
                } else {
                    Manager.findOne({ email: email }).then((data) => {
                        if (data) {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.FAILURE,
                                    message: MESSAGES.EMAIL_USED_GG,
                                })
                            );
                        } else {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.FAILURE,
                                    message: MESSAGES.EMAIL_ERROR,
                                })
                            );
                        }
                    });
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: err.message,
                    })
                );
            });
    };

    refreshUI = async (req, res) => {
        var decoded = res.locals.decoded;

        getAllData(decoded.email).then((data) => {
            res.status(200).send(
                JSON.stringify({
                    status: STATUS.SUCCESS,
                    message: MESSAGES.SIGN_IN_SUCCESS,
                    token: res.locals.newToken,
                    email: decoded.email,
                    data,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(
                JSON.stringify({
                    err,
                    status: STATUS.FAILURE,
                    message: MESSAGES.PASSWORD_OR_ACCOUNT_ERROR,
                })
            );
        });
    };

    authSignInRegularEmployee = async (req, res) => {
        const username = req.body.email;
        const password = req.body.password;

        Employee.findOne({ "_id.employeeID": username })
            .exec()
            .then((data) => {
                //check password, if password is correct then get all data and respond for client
                if (password === data.password) {
                    getAllDataEmployee(username).then((data) => {
                        res.status(200).send(
                            JSON.stringify({
                                token: JWTAuthToken({ _id: req.body.email }),
                                _id: req.body.email,
                                data,
                            })
                        );
                    });
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                res.status(404).send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.PASSWORD_OR_ACCOUNT_ERROR,
                    })
                );
            });
    };
}

async function getAllData(email) {
    var newManager = await Manager.findOne({ email: email }).exec();
    if (newManager) {
        var manager = newManager;
        var store = await Store.findOne({ _id: manager.storeID });
        if (store == null) {
            return manager;
        }

        var [
            coupons,
            employees,
            products,
            productTypes,
            productJoinTypes,
            revenues,
            receipts,
            returnProducts,
            shiftAssigns,
            shiftTypes,
            regulation,
            timeKeeping,
            nextWeekTimeKeeping,
        ] = await Promise.all([
            Coupon.find({ "_id.storeID": store._id }).exec(),
            Employee.find({ managerID: store._id }).exec(),
            Product.find({ "_id.storeID": store._id }).exec(),
            ProductType.find({ "_id.storeID": store._id }).exec(),
            ProductJoinType.find({ "_id.storeID": store._id }).exec(),
            Revenue.find({ "_id.storeID": store._id }).exec(),
            Receipt.findWithDeleted({ "_id.storeID": store._id }).exec(),
            ReturnProduct.find({ "_id.storeID": store._id }).exec(),
            ShiftAssign.find({ "_id.storeID": store._id }).exec(),
            ShiftType.find({ "_id.storeID": store._id }).exec(),
            Regulation.find({ "_id": store._id }).exec(),
            TimeKeeping.find({ "_id.storeID": store._id }).exec(),
            NextWeekTimeKeeping.find({ "_id.storeID": store._id }).exec(),
        ]);
        return {
            manager,
            store,
            employees,
            coupons,
            products,
            productTypes,
            productJoinTypes,
            receipts,
            returnProducts,
            shiftAssigns,
            shiftTypes,
            revenues,
            regulation,
            timeKeeping,
            nextWeekTimeKeeping,
            isEmployee: false,
        };
    } else {
        const username = email;
        const employees = await Employee.findOne({
            "_id.employeeID": username,
        });
        const [employee, receipts, products, store, manager] =
            await Promise.all([
                Employee.find({ "_id.employeeID": username }).exec(),
                Receipt.findWithDeleted({
                    "EmployeeID._id.employeeID": username,
                }).exec(),
                Product.find({ "_id.storeID": employees._id.storeID }).exec(),
                Store.find({ _id: employees._id.storeID }).exec(),
                Manager.find({ _id: employees.managerID }).exec(),
            ]);
        return { employee, receipts, products, store, manager ,isEmployee: true};
    }
}

async function getAllDataEmployee(username) {
    const employees = await Employee.findOne({ "_id.employeeID": username });
    const [employee, receipts, products, store, manager] = await Promise.all([
        Employee.find({ "_id.employeeID": username }).exec(),
        Receipt.findWithDeleted({
            "EmployeeID._id.employeeID": username,
        }).exec(),
        Product.find({ "_id.storeID": employees._id.storeID }).exec(),
        Store.find({ _id: employees._id.storeID }).exec(),
        Manager.find({ _id: employees.managerID }).exec(),
    ]);
    return { employee, receipts, products, store, manager };
}

module.exports = new Authentication();
