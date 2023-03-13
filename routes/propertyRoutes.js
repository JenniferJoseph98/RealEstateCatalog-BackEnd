const propertyRoutes = require("express").Router();
const cloudinary = require("../cloudinary/cloudinary");
const Property = require("../models/propertySchema");

propertyRoutes.post("/", async (req, res) => {
  try {
    const uploadedResponse = await cloudinary.v2.uploader.upload(
      req.body.imageUrl,
      { upload_preset: "realEstate" },
      function (error, result) {
        if (error) {
          console.log("Cannot upload");
          res.sendStatus(500);
        } else console.log("success");
        return { url: result.secure_url, public_id: result.public_id };
      }
    );
    if (uploadedResponse) {
      const lastProperty = await Property.find().sort({ _id: -1 }).limit(1);

      let ppd_id = "PPD";
      if (lastProperty.length != 0) {
        ppd_id = ppd_id + (parseInt(lastProperty[0].ppdId.split("D")[1]) + 1);
        console.log(ppd_id);
      } else {
        ppd_id = ppd_id + 1200;
        console.log(ppd_id);
      }
      const views = parseInt(Math.random() * 30);
      const daysLeft = parseInt(Math.random() * 50);

      const property = await Property.create({
        ppdId: ppd_id,
        imageUrl: {
          imageUrl: uploadedResponse.url,
          public_id: uploadedResponse.public_id,
        },
        views: views,
        status: "Unsold",
        daysLeft: daysLeft,
        property: req.body.property,
        length: req.body.length,
        breadth: req.body.breadth,
        area: parseInt(req.body.length) * parseInt(req.body.breadth),
        mobile: req.body.mobile,
        negotiable: req.body.negotiable,
        price: req.body.price,
        ownership: req.body.ownership,
        propertyAge: req.body.propertyAge,
        propApproved: req.body.propApproved,
        propDescription: req.body.propDescription,
        bankLoan: req.body.bankLoan,
        areaUnit: req.body.areaUnit,
        bhk: req.body.bhk,
        floorNum: req.body.floorNum,
        attached: req.body.attached,
        westToilet: req.body.westToilet,
        furnished: req.body.furnished,
        parking: req.body.parking,
        lift: req.body.lift,
        electricity: req.body.electricity,
        facing: req.body.facing,
        name: req.body.name,
        postedBy: req.body.postedBy,
        saleType: req.body.saleType,
        package: req.body.package,
        ppdPackage: req.body.ppdPackage,
        email: req.body.email,
        city: req.body.city,
        addArea: req.body.addArea,
        pincode: req.body.pincode,
        address: req.body.address,
        landmark: req.body.landmark,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        userid: req.user.email,
      });

      res.status(200).json({
        status: "Success",
        property,
      });
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
});
propertyRoutes.get("/", async (req, res) => {
  try {
    const allProp = await Property.find({ userid: req.user.email });
    res.status(200).json({
      status: "Success",
      property: allProp,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});
propertyRoutes.put("/update/:id", async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      {
        property: req.body.property,
        length: req.body.length,
        breadth: req.body.breadth,
        area: parseInt(req.body.length) * parseInt(req.body.breadth),
        mobile: req.body.mobile,
        negotiable: req.body.negotiable,
        price: req.body.price,
        ownership: req.body.ownership,
        propertyAge: req.body.propertyAge,
        propApproved: req.body.propApproved,
        propDescription: req.body.propDescription,
        bankLoan: req.body.bankLoan,
        areaUnit: req.body.areaUnit,
        bhk: req.body.bhk,
        floorNum: req.body.floorNum,
        attached: req.body.attached,
        westToilet: req.body.westToilet,
        furnished: req.body.furnished,
        parking: req.body.parking,
        lift: req.body.lift,
        electricity: req.body.electricity,
        facing: req.body.facing,
        name: req.body.name,
        postedBy: req.body.postedBy,
        saleType: req.body.saleType,
        package: req.body.package,
        ppdPackage: req.body.ppdPackage,
        email: req.body.email,
        city: req.body.city,
        addArea: req.body.addArea,
        pincode: req.body.pincode,
        address: req.body.address,
        landmark: req.body.landmark,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },

      {
        new: true,
      }
    );
    res.send(updatedProperty);
  } catch (error) {
    res.send(error);
  }
});
propertyRoutes.patch("/sold/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const updateId = await Property.findByIdAndUpdate(
      { _id: req.params.id },
      { status: "Sold" },
      { new: true }
    );
    res.status(200).json({
      status: "Updated",
      details: updateId,
    });
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: "Id not found",
    });
  }
});

module.exports = propertyRoutes;
