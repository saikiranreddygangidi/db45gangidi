var express = require("express");
var router = express.Router();
const mobile_controlers = require("../controllers/mobile");
/* GET home page. */
router.get("/", mobile_controlers.mobile_view_all_Page);
router.get("/detail", mobile_controlers.mobile_view_one_Page);
router.get("/create", mobile_controlers.mobile_create_Page);
router.get("/update", mobile_controlers.mobile_update_Page);
router.get("/delete", mobile_controlers.mobile_delete_Page);
module.exports = router;
