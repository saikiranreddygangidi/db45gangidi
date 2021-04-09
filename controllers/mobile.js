const { ObjectId } = require("bson");
var Mobile = require("../models/mobile");
// List of all mobiles
exports.mobile_list = async function (req, res) {
  try {
    var data = await Mobile.find({});

    res.send("The data is \n" + data);
  } catch (err) {
    res.status(500);

    res.send(`{"error": ${err}}`);
  }
};
// for a specific mobile.
exports.mobile_detail = async function (req, res) {
  console.log("detail" + req.params.id);

  try {
    result = await Mobile.findById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(`{"error": document for id ${error} not found`);
  }
};
// Handle mobile create on POST.
exports.mobile_create_post = async function (req, res) {
  console.log(req.body);
  let document = new Mobile();
  // We are looking for a body, since POST does not have query parameters.
  // Even though bodies can be in many different formats, we will be picky
  // and require that it be a json object
  // {"costumetype":"goat", "cost":12, "size":"large"}
  document.mobilecompany = req.body.mobilecompany;
  document.model = req.body.model;
  document.prize = req.body.prize;
  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.error(500, `{"error": ${err}}`);
  }
};
// Handle mobile delete form on DELETE.
exports.mobile_delete = async function (req, res) {
  console.log("delete " + req.params.id);
  try {
    result = await Mobile.findByIdAndDelete(req.params.id);
    console.log("Removed " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": Error deleting ${err}}`);
  }
};
// Handle mobile update form on PUT.
exports.mobile_update_put = async function (req, res) {
  console.log(
    `update on id ${req.params.id} with body ${JSON.stringify(req.body)}`
  );
  try {
    let toUpdate = await Mobile.findById(req.params.id);
    // Do updates of properties
    if (req.body.companyname) toUpdate.companyname = req.body.companyname;
    if (req.body.model) toUpdate.model = req.body.model;
    if (req.body.prize) toUpdate.prize = req.body.prize;
    let result = await toUpdate.save();
    console.log("Sucess " + result);
    res.send(result);
  } catch (err) {
    res.status(500);
    res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
  }
};
exports.mobile_view_all_Page = async function (req, res) {
  try {
    theMobile = await Mobile.find();
    res.render("mobile", {
      title: "mobile Search Results",
      results: theMobile,
    });
  } catch (err) {
    res.error(500, `{"error": ${err}}`);
  }
};
