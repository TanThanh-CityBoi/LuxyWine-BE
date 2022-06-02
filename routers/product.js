const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");
const { AuthMiddleware } = require("../helper/JWT");
//--------
//these router handle sign in and sign up
router.get("/list", ProductController.getList);
router.get("/listSpecialProduct", ProductController.getListSpecialProduct);
router.get("/listAccessary", ProductController.getListAccessary);
router.get("/:id", ProductController.getOne);
router.post("/new", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController._delete);
router.delete("/deleteMany", ProductController.deleteMany);

//

//--------
//these router handle authentication and authorization

//
module.exports = router;
