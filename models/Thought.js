const { Schema, model } = require("mongoose");
const moment = require("moment");

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 300,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
  },
});

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },
  {
    //tell schema that it can use virtuals & getters
    toJSON: {
      virtuals: true,
      //getters: true
    },
    id: false,
  }
);

// Virtual: retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual("reactionCount ").get(function () {
  return this.reactions.reduce(
    (total, reaction) => total + reaction.length + 1,
    0
  );
});

// create the User model using the UserSchema
const Thought = model("Thought", ThoughtSchema);

// export the User model
module.exports = Thought;
