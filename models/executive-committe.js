import mongoose from "mongoose";

const allowedRoles = [
  "president",
  "vice-president",
  "secretary",
  "joint-secretary",
  "treasurer-cum-librarian"
];

const execCommitteeSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      enum: allowedRoles,
      required: true,
      immutable: true
    },
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false,  // Optional, can be empty initially
      default: ""
    },
    link: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    strict: true
  }
);

// Pre-save: block new inserts
execCommitteeSchema.pre("save", function (next) {
  if (this.isNew) {
    return next(new Error("Cannot create new Executive Committee roles."));
  }
  next();
});

// Pre-delete: block deletions
execCommitteeSchema.pre("deleteOne", function (next) {
  return next(new Error("Executive Committee roles cannot be deleted."));
});

// Prevent model overwrite in dev
export const ExecutiveCommittee = mongoose.models.ExecutiveCommittee ||
  mongoose.model("ExecutiveCommittee", execCommitteeSchema);