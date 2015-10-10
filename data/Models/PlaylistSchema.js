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
  type: String,
  _creatorId: String
});

let Playlist = mongoose.model('Playlist', PlaylistSchema);

exports.PlaylistSchema = Playlist;

exports.getPlaylistById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Playlist.findOne({id:id}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};