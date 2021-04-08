var express = require("express");
var router = express.Router();
const mobile_controlers = require("../controllers/mobile");
/* GET home page. */
router.get("/", mobile_controlers.mobile_view_all_Page);

module.exports = router;
