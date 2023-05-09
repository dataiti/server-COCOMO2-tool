const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Result = require("../models/result.model");

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

const getListConstructionProject = asyncHandler(async (req, res) => {
  const search = req.query.q || "";
  const regex = search
    .split(" ")
    .filter((q) => q)
    .join("|");
  const sortBy = req.query.sortBy || "-_id";
  const orderBy = req.query.orderBy || "asc";
  const limit = Number(req.query.limit) || 6;
  const page = Number(req.query.limit) || 1;
  let skip = (page - 1) * limit;

  const filterArgs = {
    $or: [{ projectName: { $regex: regex, $options: "i" } }],
  };

  const countResult = await Result.countDocuments(filterArgs);

  if (!countResult) throw new Error("List users are not found");

  const totalPage = Math.ceil(countResult / limit);

  if (page > totalPage) skip = (totalPage - 1) * limit;

  const results = await Result.find(filterArgs)
    .sort({ [sortBy]: orderBy, _id: -1 })
    .skip(skip)
    .limit(limit);

  return res.status(200).json({
    success: true,
    message: "Get list users are successfully",
    totalPage,
    currentPage: page,
    count: countResult,
    data: results,
  });
});

module.exports = { userById, getListConstructionProject };
