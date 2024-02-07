const express = require("express");
const router = express.Router();
const ApiResponse = require("../utils/ApiResponse");
const { upload } = require("../middlewares/multer.middleware");

router.patch(
  "/",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 2,
    },
  ]),
  (req, res) => {
    return res.json(new ApiResponse(null, "Files uploaded successfully", 200));
  }
);
router.patch("/multiple", upload.array("images"), (req, res) => {
  return res.json(new ApiResponse(null, "Images uploaded successfully", 200));
});
router.patch("/avatar", upload.single("avatar"), (req, res) => {
  return res.json(new ApiResponse(null, "Avatar uploaded successfully", 200));
});
router.patch("/cover-image", upload.single("coverImage"), (req, res) => {
  return res.json(
    new ApiResponse(null, "Cover Image uploaded successfully", 200)
  );
});

module.exports = router;
