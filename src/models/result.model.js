const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    ownerProject: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    projectName: {
      type: String,
      trim: true,
    },
    typeMode: {
      type: String,
      enum: ["Basic", "Intermediate", "Detailed"],
    },
    sizeType: {
      type: String,
    },
    language: {
      type: String,
    },
    functionPoints: {
      type: Number,
      min: 0,
    },
    newSize: {
      type: Number,
      min: 0,
    },
    reusedSize: {
      type: Number,
      min: 0,
    },
    reusedIM: {
      type: Number,
      min: 0,
      max: 100,
    },
    reusedAA: {
      type: Number,
      min: 0,
      max: 8,
    },
    PREC: {
      type: String,
      required: true,
      default: "nominal",
    },
    FLEX: {
      type: String,
      required: true,
      default: "nominal",
    },
    RESL: {
      type: String,
      required: true,
      default: "nominal",
    },
    TEAM: {
      type: String,
      required: true,
      default: "nominal",
    },
    PMAT: {
      type: String,
      required: true,
      default: "nominal",
    },
    RELY: {
      type: String,
      required: true,
      default: "nominal",
    },
    DATA: {
      type: String,
      required: true,
      default: "nominal",
    },
    CPLX: {
      type: String,
      required: true,
      default: "nominal",
    },
    RUSE: {
      type: String,
      required: true,
      default: "nominal",
    },
    DOCU: {
      type: String,
      required: true,
      default: "nominal",
    },
    ACAP: {
      type: String,
      required: true,
      default: "nominal",
    },
    PCAP: {
      type: String,
      required: true,
      default: "nominal",
    },
    PCON: {
      type: String,
      required: true,
      default: "nominal",
    },
    AEXP: {
      type: String,
      required: true,
      default: "nominal",
    },
    PEXP: {
      type: String,
      required: true,
      default: "nominal",
    },
    LTEX: {
      type: String,
      required: true,
      default: "nominal",
    },
    TIME: {
      type: String,
      required: true,
      default: "nominal",
    },
    STOR: {
      type: String,
      required: true,
      default: "nominal",
    },
    PVOL: {
      type: String,
      required: true,
      default: "nominal",
    },
    TOOL: {
      type: String,
      required: true,
      default: "nominal",
    },
    SITE: {
      type: String,
      required: true,
      default: "nominal",
    },
    SCED: {
      type: String,
      required: true,
      default: "nominal",
    },
    softwareMaintenance: {
      type: String,
      required: true,
      default: "Off",
    },
    softwareLaborCostPerPM: {
      type: Number,
      min: 0,
    },
    softwareEAF: {
      type: Number,
      min: 0,
    },
    sizeExponent: {
      type: Number,
      min: 0,
    },
    scheduleExponent: {
      type: Number,
      min: 0,
    },
    softwareEffort: {
      type: Number,
      min: 0,
    },
    softwareSchedule: {
      type: Number,
      min: 0,
    },
    totalEquivalentSize: {
      type: Number,
      min: 0,
    },
    cost: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
