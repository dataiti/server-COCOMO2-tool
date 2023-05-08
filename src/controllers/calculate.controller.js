const asyncHandler = require("express-async-handler");
const Result = require("../models/result.model");
const { getFactorValue, getLanguageFactorValue } = require("../utils/fn");

const calculateFunctionPoints = asyncHandler(async (req, res) => {
  const {
    sizeType,
    language,
    functionPoints = 0,
    PREC,
    FLEX,
    RESL,
    TEAM,
    PMAT,
    RELY,
    DATA,
    CPLX,
    RUSE,
    DOCU,
    ACAP,
    PCAP,
    PCON,
    AEXP,
    PEXP,
    LTEX,
    TIME,
    STOR,
    PVOL,
    TOOL,
    SITE,
    SCED,
    softwareLaborCostPerPM = 0,
  } = req.body;

  if (!sizeType) throw new Error("sizeType field is required !");

  let b = 0;
  let a = 2.94;
  let EAF = 1;
  let effort = 0;
  let SLOC = 0;
  let schedule = 1;
  let cost = 0;

  if (sizeType === "FP") {
    // b = 0.91 + 0.01 * (sum(SF))
    b =
      0.91 +
      0.01 *
        (getFactorValue({ PREC }) +
          getFactorValue({ FLEX }) +
          getFactorValue({ RESL }) +
          getFactorValue({ TEAM }) +
          getFactorValue({ PMAT }));

    // EAF = (f1 * f2 * ... * fn)
    EAF =
      getFactorValue({ RELY }) *
      getFactorValue({ DATA }) *
      getFactorValue({ CPLX }) *
      getFactorValue({ RUSE }) *
      getFactorValue({ DOCU }) *
      getFactorValue({ ACAP }) *
      getFactorValue({ PCAP }) *
      getFactorValue({ PCON }) *
      getFactorValue({ AEXP }) *
      getFactorValue({ PEXP }) *
      getFactorValue({ LTEX }) *
      getFactorValue({ TIME }) *
      getFactorValue({ STOR }) *
      getFactorValue({ PVOL }) *
      getFactorValue({ TOOL }) *
      getFactorValue({ SITE }) *
      getFactorValue({ SCED });

    // SLOC = (Function points * language factor)
    SLOC = Number(functionPoints) * getLanguageFactorValue(language);

    // Effort = a * (SLOC)^b * EAF, a = 2.94
    effort = a * Math.pow(SLOC / 1000, b) * EAF;

    // Schedule = 3.67 * Effort^0.3179
    schedule = 3.67 * Math.pow(effort, 0.3179);

    // cost = (softwareLaborCostPerPM * Effort)
    cost = Number(softwareLaborCostPerPM) * effort;
  }

  let newResult;

  if (b && a && effort && schedule && cost && SLOC && EAF) {
    newResult = new Result({
      sizeType,
      language,
      functionPoints: Number(functionPoints),
      PREC,
      FLEX,
      RESL,
      TEAM,
      PMAT,
      RELY,
      DATA,
      CPLX,
      RUSE,
      DOCU,
      ACAP,
      PCAP,
      PCON,
      AEXP,
      PEXP,
      LTEX,
      TIME,
      STOR,
      PVOL,
      TOOL,
      SITE,
      SCED,
      softwareLaborCostPerPM: Number(softwareLaborCostPerPM),
      softwareEAF: Number(EAF),
      sizeExponent: Number(b),
      //   scheduleExponent: Number(),
      softwareEffort: Number(effort),
      softwareSchedule: Number(schedule),
      totalEquivalentSize: Number(SLOC),
      cost: Number(cost),
    });

    await newResult.save();
  }

  return res.status(200).json({
    success: true,
    message: "Calculate Cocomo ii type size Function Points successfully",
    data: newResult,
  });
});

const calculateSLOC = asyncHandler(async (req, res) => {
  const {
    sizeType,
    newSize = 0,
    reusedSize = 0,
    reusedIM = 0,
    reusedAA = 0,
    PREC,
    FLEX,
    RESL,
    TEAM,
    PMAT,
    RELY,
    DATA,
    CPLX,
    RUSE,
    DOCU,
    ACAP,
    PCAP,
    PCON,
    AEXP,
    PEXP,
    LTEX,
    TIME,
    STOR,
    PVOL,
    TOOL,
    SITE,
    SCED,
    softwareLaborCostPerPM,
  } = req.body;

  if (!sizeType) throw new Error("sizeType field is required !");

  let b = 0;
  let a = 2.94;
  let EAF = 1;
  let effort = 0;
  let SLOC = 0;
  let schedule = 1;
  let cost = 0;

  if (sizeType === "SLOC") {
    // b = 0.91 + 0.01 * (sum(SF))
    b =
      0.91 +
      0.01 *
        (getFactorValue({ PREC }) +
          getFactorValue({ FLEX }) +
          getFactorValue({ RESL }) +
          getFactorValue({ TEAM }) +
          getFactorValue({ PMAT }));

    // EAF = (f1 * f2 * ... * fn)
    EAF =
      getFactorValue({ RELY }) *
      getFactorValue({ DATA }) *
      getFactorValue({ CPLX }) *
      getFactorValue({ RUSE }) *
      getFactorValue({ DOCU }) *
      getFactorValue({ ACAP }) *
      getFactorValue({ PCAP }) *
      getFactorValue({ PCON }) *
      getFactorValue({ AEXP }) *
      getFactorValue({ PEXP }) *
      getFactorValue({ LTEX }) *
      getFactorValue({ TIME }) *
      getFactorValue({ STOR }) *
      getFactorValue({ PVOL }) *
      getFactorValue({ TOOL }) *
      getFactorValue({ SITE }) *
      getFactorValue({ SCED });

    // SLOC = (Function points * language factor)
    SLOC =
      Number(newSize) +
      Number(reusedSize) * (0.3 * Number(reusedIM) + Number(reusedAA));

    // Effort = a * (SLOC)^b * EAF, a = 2.94
    effort = a * Math.pow(SLOC / 1000, b) * EAF;

    // Schedule = 3.67 * Effort^0.3179
    schedule = 3.67 * Math.pow(effort, 0.3179);

    // cost = (softwareLaborCostPerPM * Effort)
    cost = Number(softwareLaborCostPerPM) * effort;
  }

  let newResult;

  if (b && a && effort && schedule && cost && SLOC && EAF) {
    newResult = new Result({
      sizeType,
      newSize: Number(newSize),
      reusedSize: Number(reusedSize),
      reusedIM: Number(reusedIM),
      reusedAA: Number(reusedAA),
      PREC,
      FLEX,
      RESL,
      TEAM,
      PMAT,
      RELY,
      DATA,
      CPLX,
      RUSE,
      DOCU,
      ACAP,
      PCAP,
      PCON,
      AEXP,
      PEXP,
      LTEX,
      TIME,
      STOR,
      PVOL,
      TOOL,
      SITE,
      SCED,
      softwareLaborCostPerPM: Number(softwareLaborCostPerPM),
      softwareEAF: Number(EAF),
      sizeExponent: Number(b),
      //   scheduleExponent: Number(),
      softwareEffort: Number(effort),
      softwareSchedule: Number(schedule),
      totalEquivalentSize: Number(SLOC),
      cost: Number(cost),
    });

    await newResult.save();
  }

  return res.status(200).json({
    success: true,
    message: "Calculate Cocomo ii type size Function Points successfully",
    data: newResult,
  });
});

module.exports = { calculateFunctionPoints, calculateSLOC };