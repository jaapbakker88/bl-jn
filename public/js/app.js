import '../scss/style.scss';

import { $, $$ } from './modules/bling';

import TweenMax from './modules/src/minified/TweenMax.min';
import headerMorph from './modules/svgAnimations';


function cog() {
  var tl = new TimelineLite;

  tl
    .to('#cog_1', 15, { rotation: "360", ease: Linear.easeNone, repeat: -1, transformOrigin: "50% 50%" }, { timeScale: 0 })
    .to('#cog_2', 15, { rotation: "-360", ease: Linear.easeNone, repeat: -1, transformOrigin: "50% 50%" }, { timeScale: 0 })
  tl.play();
}
window.cog = cog;

headerMorph();
// cog;


var ticker = document.querySelector('.ticker')
  , list = document.querySelector('.work__grid')
  , clone = list.cloneNode(true)

ticker.append(clone)
