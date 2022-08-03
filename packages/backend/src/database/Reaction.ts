import mongoose from "mongoose";

const reaction = new mongoose.Schema(
  {
    nounId: { type: String, index: true },
    bidId: { type: String, index: true },
    reactionId: { type: String },
    number: { type: Number },
    createdAt: { type: Date, default: Date.now, index: 1 },
  },
  { collation: { locale: "en_US", numericOrdering: true } }
);

reaction.index({ bidId: 1, reactionId: 1 }, { unique: true });

const Reaction = mongoose.model("Reaction", reaction);

export default Reaction;
