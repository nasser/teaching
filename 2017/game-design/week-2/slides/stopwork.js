const fs = require("fs"),
      marked = require('marked');

// render images without <p> wrapper
var renderer = new marked.Renderer();
renderer.paragraph = function(text) {
  if(!!text.match(/^<img/)) return text;
  else return "<p>" + text + "</p>"
}
marked.setOptions({ renderer: renderer });

let templateContent = fs.readFileSync("template.html", "utf8");
let talkFiles = process.argv.slice(2);

// TODO maybe split after markdown parse to enable cross-slide comments?
function writeSlides() {
  process.stdout.write("writing slides...");
  let slidesHTML =
    talkFiles.map(file => {
      let fileContent = fs.readFileSync(file, "utf8")
      return fileContent.split(/---[\-]*\n/).
      filter(content => content.length > 0).
      map(content => `<slide>\n${marked(content)}</slide>` );
    }).reduce((a,c) => a.concat(c));

  fs.writeFileSync("index.html", templateContent.replace("<slides/>", slidesHTML.join("\n")));
  process.stdout.write("OK\n");
}

// rewrite slides if any input changes
talkFiles.forEach((f) => {
  fs.watch(f, function(event) {
    process.stdout.write(f + " changed \n");
    if(event == "change")
      writeSlides();
  });
});

// write slides once to begin
writeSlides();
