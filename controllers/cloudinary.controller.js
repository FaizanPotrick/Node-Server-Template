const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { uploadOnCloudinary } = require("../config/cloudinary.js");

const UploadAvatar = async (req, res, next) => {
  try {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
      throw new ApiError("Avatar file is missing", 400, "FilePathError");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar.url) {
      throw new ApiError("Error while uploading on avatar", 400, "UploadError");
    }
    console.log(avatar.url);

    return res.json(new ApiResponse(null, "Avatar uploaded successfully", 200));
  } catch (err) {
    next(err);
  }
};

const UploadMultipleImages = async (req, res, next) => {
  try {
    const imagesLocalPath = req.files?.images;

    const images = await Promise.all(
      imagesLocalPath.map(async (image) => {
        return await uploadOnCloudinary(image.path);
      })
    );
    if (!images) {
      throw new ApiError("Error while uploading on images", 400, "UploadError");
    }

    return res.json(new ApiResponse(null, "Images uploaded successfully", 200));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  UploadAvatar,
  UploadMultipleImages,
};
