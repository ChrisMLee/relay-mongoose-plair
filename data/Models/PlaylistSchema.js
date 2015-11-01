import mongoose from 'mongoose';

import Song from './SongSchema.js';
import {SongSchema as SongSchema } from './SongSchema.js';


import request from 'axios';

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

exports.getPlaylistById = (id) => {
  console.log('GET PLAYLIST BY ID CALLED', id);
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
      //console.log('the populated', populated);
      populated.then((finalRes)=>{ resolve(finalRes) });
    })
  });
};

exports.addSong = ({id, youtubeLink}) => {
  return new Promise((resolve, reject) => {
    console.log('addSong called!', id);
    request.get(`http://www.youtube.com/oembed?url=${youtubeLink}&format=json`)
    .then(function (response) {
      console.log('The Response',response.data);
      let newSong = new SongSchema({
        title: response.data.title,
        youtubeLink: youtubeLink,
        type: "song"
      });
      newSong.save();
      Playlist.update({id: id}, { 
        $push: { "songs": newSong }
      }).exec((err, res) => {
        res.id = id;
        console.log('at least something found', res);
        err ? reject(err) : resolve(res);
      })
    }).catch(function (response) {
      console.log(response);
    });
  });
};

exports.deleteSong = ({songId, playlistId}) => {
  return new Promise((resolve, reject) => {
    Playlist.findOne({id:playlistId}).populate('songs').exec((err, res) => {
      res.songs.pull({ _id: songId })
      res.save();
      err ? reject(err) : resolve(res);
    })
  });
};



