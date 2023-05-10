const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Construction = require("../models/construction.model");
const User = require("../models/user.model");

const userById = asyncHandler(async (req, res, next, id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid)
    return res.status(400).json({
      success: true,
      message: "Id is invalid",
    });

  const user = await User.findById(id);

  if (!user)
    return res.status(400).json({
      success: true,
      message: "This user is not found",
    });

  req.user = user;
  next();
});

const constructionById = asyncHandler(async (req, res, next, id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);

  if (!isValid)
    return res.status(400).json({
      success: true,
      message: "Id is invalid",
    });

  const construction = await Construction.findById(id);

  if (!construction)
    return res.status(400).json({
      success: true,
      message: "This construction is not found",
    });

  req.construction = construction;
  next();
});

const getDetailConstruction = asyncHandler(async (req, res) => {
  const findConstruction = await Construction.findOne({
    _id: req.construction._id,
    ownerProject: req.user._id,
  });

  if (!findConstruction)
    throw new Error(`This construction by id:${req.user._id} is not found`);

  return res.status(200).json({
    success: true,
    message: "Get detail construction is successfully",
    data: findConstruction,
  });
});

const updateConstruction = asyncHandler(async (req, res) => {});

const deleteConstruction = asyncHandler(async (req, res) => {
  const findConstruction = await Construction.findOne({
    _id: req.construction._id,
    ownerProject: req.user._id,
  });

  if (!findConstruction)
    throw new Error(`This construction by id:${req.user._id} is not found`);

  await Construction.findByIdAndDelete(findConstruction._id);

  return res.status(200).json({
    success: true,
    message: "Delete construction is successfully",
  });
});

const getListConstructionProject = asyncHandler(async (req, res) => {
  const search = req.query.q || "";
  const regex = search
    .split(" ")
    .filter((q) => q)
    .join("|");
  const sortBy = req.query.sortBy || "-_id";
  const orderBy = req.query.orderBy || "asc";
  const limit = Number(req.query.limit) || 20;
  const page = Number(req.query.limit) || 1;
  let skip = (page - 1) * limit;

  const filterArgs = {
    $or: [{ projectName: { $regex: regex, $options: "i" } }],
    ownerProject: req.user._id,
  };

  const countConstruction = await Construction.countDocuments(filterArgs);

  if (!countConstruction) throw new Error("List users are not found");

  const totalPage = Math.ceil(countConstruction / limit);

  if (page > totalPage) skip = (totalPage - 1) * limit;

  const constructions = await Construction.find(filterArgs)
    .sort({ [sortBy]: orderBy, _id: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    message: "Get list users are successfully",
    totalPage,
    currentPage: page,
    count: countConstruction,
    data: constructions,
  });
});

module.exports = {
  userById,
  constructionById,
  getDetailConstruction,
  updateConstruction,
  deleteConstruction,
  getListConstructionProject,
};
