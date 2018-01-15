var mongoose      = require('mongoose'),
    URLSlugs      = require('mongoose-url-slugs');
    
mongoose.Promise = global.Promise;

var workSchema = new mongoose.Schema({
  name: {type: String, default: ''},
  category: {type: String, default: ''},
  status: {type: String, default: 'finished'},
  description: {type: String, default: ''},
  image: {type: String, default: ''},
  gallery: [{
  	name: String,
  	url: String
  }],
  screenshots: [{
    name: String,
    url: String
  }],
  tags: [String],
  url: {type: String, default: ''},
  background: {type: String, default: ''}
},
{
  timestamps: true
});

workSchema.plugin(URLSlugs('name'));

module.exports = mongoose.model('Work', workSchema);