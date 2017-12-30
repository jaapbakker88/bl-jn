import MorphSVG from '../modules/src/minified/plugins/MorphSVGPlugin.min';


function headerMorph() {
    var tl = new TimelineLite(),
        rect = document.getElementById("rect");

    tl
        .to(rect, 0.6, { morphSVG: "#logo_s" }, "+=1")
        .to(rect, 0.2, { morphSVG: "#logo" }, "+=0")

    tl.play();
}

export default headerMorph;