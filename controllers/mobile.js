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
exports.mobile_detail = function (req, res) {
  Mobile.find({ mobilecompany: req.params.name })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500);

      res.send(`{"error": ${err}}`);
    });
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
  try {
    await Mobile.deleteMany({ name: req.params.name });
    res.send("data is deleted with company name " + req.params.name);
  } catch (err) {
    res.status(500);

    res.send(`{"error": ${err}}`);
  }
};
// Handle mobile update form on PUT.
exports.mobile_update_put = async function (req, res) {
  try {
    await Mobile.updateMany(
      { name: "apple" },
      { $set: { model: req.params.model } }
    );
    res.send("mobile update PUT" + req.params.id);
  } catch (err) {
    res.status(500);

    res.send(`{"error": ${err}}`);
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
