import mongoose from 'mongoose';

import Song from './SongSchema.js';

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
  _creatorId: String,
  songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
});

let Playlist = mongoose.model('Playlist', PlaylistSchema);

exports.PlaylistSchema = Playlist;

exports.getPlaylistById = (root, {id}) => {
  return new Promise((resolve, reject) => {
    Playlist.findOne({id:id}).populate('songs').exec((err, res) => {
      err ? reject(err) : resolve(res);
    })
  });
};

exports.getPlaylistsForUser = (id) => {
  return new Promise((resolve, reject) => {
    Playlist.find({_creatorId: id}).populate('songs').exec((err, res) => {
      if(err){
        console.log(err);
        reject(err);
      }
      let populated = Playlist.populate(res, { path: 'songs', model: 'Song' });
      console.log('the populated', populated);
      populated.then((finalRes)=>{ resolve(finalRes) });
    })
  });
};