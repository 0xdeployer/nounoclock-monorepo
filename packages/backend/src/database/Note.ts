import mongoose from "mongoose";

const note = new mongoose.Schema(
  {
    nounId: { type: String, index: true, required: true },
    bidId: { type: String, index: true, required: true },
    note: { type: String, maxLength: 180, required: true },
    createdAt: { type: Date, default: Date.now, index: 1 },
  },
  { collation: { locale: "en_US", numericOrdering: true } }
);

note.index({ nounId: 1, bidId: 1 }, { unique: true });

const Note = mongoose.model("Note", note);

export default Note;
