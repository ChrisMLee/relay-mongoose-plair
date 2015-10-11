import mongoose from 'mongoose';

var SongSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId
  },
  name: String,
  artist: String,
  type: String
});

let Song = mongoose.model('Song', SongSchema);

exports.SongSchema = Song;

exports.getSongById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Song.findOne({id:id}).exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};