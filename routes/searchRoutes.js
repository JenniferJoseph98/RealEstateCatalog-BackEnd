const searchRoutes = require("express").Router();
const Property = require("../models/propertySchema");
searchRoutes.get("/:id/:userid", async (req, res) => {
  try {
    console.log("Hi");
    const ppd_id = req.params.id.toUpperCase();
    const searchProperty = await Property.findOne({ ppdId: ppd_id });
    console.log(searchProperty);
    if (searchProperty === null || searchProperty.userid != req.params.userid) {
      res.status(400).json({
        status: "Failed",
        message: "ID not found",
      });
    } else {
      res.status(200).json({
        status: "Sucess",
        details: searchProperty,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "ID not found",
      error: error,
    });
  }
});
module.exports = searchRoutes;
