const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, lowercase: true, trim: true },
    phone:   { type: String, trim: true, default: "" },
    source:  {
      type: String,
      enum: ["website", "referral", "social_media", "email", "cold_call", "other"],
      default: "website",
    },
    status:  {
      type: String,
      enum: ["new", "contacted", "qualified", "converted", "lost"],
      default: "new",
    },
    service:     { type: String, trim: true, default: "" },
    message:     { type: String, trim: true, default: "" },
    value:       { type: Number, default: 0 },        // potential deal value
    followUpDate:{ type: Date,   default: null },
    assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
