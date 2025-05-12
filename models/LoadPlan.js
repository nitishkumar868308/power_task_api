const mongoose = require('mongoose');

const loadPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  containerType: { type: String, required: true },
  items: [
    {
      length: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      weight: { type: Number, required: true },
      unit: { type: String, required: true },
      quantity: { type: Number, required: true },
      description: { type: String, required: true }
    }
  ],
  layout: { type: Array, required: true },
}, { timestamps: true });

module.exports = mongoose.model('LoadPlan', loadPlanSchema);
