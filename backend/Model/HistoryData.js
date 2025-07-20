import mongoose from 'mongoose';
const HistoryDataSchema = new mongoose.Schema({
  coin_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  price_usd: {
    type: Number,
    required: true
  },
  market_cap: {
    type: Number,
    required: true
  },
  change_24h_pct: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('HistoryData', HistoryDataSchema);
