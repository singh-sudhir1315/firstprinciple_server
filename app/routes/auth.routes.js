const { verifySignUp } = require("../middleware");
const upload = require('../config/upload.config.js');
const controller = require("../controllers/auth.controller");
const profileController = require("../controllers/profile.controller");




module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  app.post(
    "/api/add",
    [
    ],
    upload.single("uploadfile"),
    controller.testimonails
  );

  app.get(
    "/api/testimonails-list",
    controller.testimonailsList
  );

  app.post(
    "/api/delete-testiomonals",
    controller.deleteTestiomonals
  );

  app.post(
    "/api/edit-testiomonals",
    controller.editTestiomonals
  );

  app.post(
    "/api/update-testiomonals",
    controller.updateTestiomonals
  );
};