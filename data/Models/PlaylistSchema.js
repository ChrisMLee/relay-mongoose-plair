import mongoose from 'mongoose';

var PlaylistSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  title: String,
  type: String
});

let Playlist = mongoose.model('Playlist', PlaylistSchema);

exports.PlaylistSchema = Playlist;