const mongoose = require("mongoose");

const notebookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
      deleted: {
        type: Boolean,
        default: false,
      },
      deletedAt: {
        type: Date,
        default: null,
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notebook", notebookSchema);
