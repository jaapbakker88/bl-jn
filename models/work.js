var mongoose      = require('mongoose'),
    URLSlugs      = require('mongoose-url-slugs');
    
mongoose.Promise = global.Promise;

var workSchema = new mongoose.Schema({
  name: {type: String, default: ''},
  category: {type: String, default: ''},
  description: {type: String, default: ''},
  image: {type: String, default: ''},
  url: {type: String, default: ''}
},
{
  timestamps: true
});

workSchema.plugin(URLSlugs('name'));

module.exports = mongoose.model('Work', workSchema);