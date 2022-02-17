import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const ServiceHistorySchema = new mongoose.Schema(
  {
    service_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    user_id: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    user_service_id: {
      type: ObjectId,
      ref: 'UserService',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ServiceHistory', ServiceHistorySchema);
