let p0, p1, p2, p3;
let draggingP0 = false,
    draggingP1 = false,
    draggingP2 = false,
    draggingP3 = false;
let offsetX, offsetY;
let slider;

function setup() {
  createCanvas(1000, 1000);
  strokeWeight(20);

  p0 = createVector(100, 500);
  p1 = createVector(300, 200);
  p2 = createVector(600, 250);
  p3 = createVector(800, 700);

  // Slider that controls T
  slider = createSlider(0, 1, 0, 0.01);
  slider.position(20, height - 30);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(20);300

  // Calculate lerped points for current t-value
  let t = slider.value();
  let v01 = p5.Vector.lerp(p0, p1, t);
  let v02 = p5.Vector.lerp(p1, p2, t);
  let v03 = p5.Vector.lerp(p2, p3, t);
  let v11 = p5.Vector.lerp(v01, v02, t);
  let v12 = p5.Vector.lerp(v02, v03, t);
  let v21 = p5.Vector.lerp(v11, v12, t);

  // Draw structure lines
  strokeWeight(1);
  line(p0.x, p0.y, p1.x, p1.y);
  line(p1.x, p1.y, p2.x, p2.y);
  line(p2.x, p2.y, p3.x, p3.y);
  line(v01.x, v01.y, v02.x, v02.y);
  line(v02.x, v02.y, v03.x, v03.y);
  line(v11.x, v11.y, v12.x, v12.y);

  // Draw bezier curve
  strokeWeight(4);
  stroke(255);
  beginShape();
  noFill();
  for (let t = 0; t <= 1; t += 0.01) {
    let v = cubicBezier(p0, p1, p2, p3, t);
    vertex(v.x, v.y);
  }
  endShape();

  // Draw lerped points
  drawLerpedPoints(v01, v02, v03, v11, v12, v21);

  // Draw control points
  drawPoint(p0);
  drawPoint(p1);
  drawPoint(p2);
  drawPoint(p3);

  // Print coordinates and derivatives
  strokeWeight(0.7);
  fill(255);
  textSize(25);
  textAlign(LEFT, TOP);
  text(`p0: < ${p0.x.toFixed(2)}, ${p0.y.toFixed(2)} >`, width - 300, 20);
  text(`p1: < ${p1.x.toFixed(2)}, ${p1.y.toFixed(2)} >`, width - 300, 50);
  text(`p2: < ${p2.x.toFixed(2)}, ${p2.y.toFixed(2)} >`, width - 300, 80);
  text(`p3: < ${p3.x.toFixed(2)}, ${p3.y.toFixed(2)} >`, width - 300, 110);
  text(`t-value: ${t}`, width - 300, 140);
}

function drawPoint(p) {
  strokeWeight(20);
  stroke(255);
  point(p.x, p.y);
}

// Draw lerped points on the lines for a given T value
function drawLerpedPoints(v01, v02, v03, v11, v12, v21) {
  noStroke();
  fill(0, 255, 0); // green
  ellipse(v01.x, v01.y, 15, 15); // p0 -> p1
  ellipse(v02.x, v02.y, 15, 15); // p1 -> p2
  ellipse(v03.x, v03.y, 15, 15); // p2 -> p3
  fill(255, 0, 0); // red
  ellipse(v11.x, v11.y, 15, 15); // p0 -> p1 -> p2
  ellipse(v12.x, v12.y, 15, 15); // p1 -> p2 -> p3
  fill(50, 50, 255); // blue
  ellipse(v21.x, v21.y, 15, 15); // final
}

// cubic function call
function cubicBezier(p0, p1, p2, p3, t) {
  let v01 = p5.Vector.lerp(p0, p1, t);
  let v02 = p5.Vector.lerp(p1, p2, t);
  let v03 = p5.Vector.lerp(p2, p3, t);
  let v11 = p5.Vector.lerp(v01, v02, t);
  let v12 = p5.Vector.lerp(v02, v03, t);
  let v21 = p5.Vector.lerp(v11, v12, t);
  return v21;
}

// Mouse is pressed
function mousePressed() {
  if (dist(mouseX, mouseY, p0.x, p0.y) < 20) {
    draggingP0 = true;
    offsetX = mouseX - p0.x;
    offsetY = mouseY - p0.y;
  }
  if (dist(mouseX, mouseY, p1.x, p1.y) < 20) {
    draggingP1 = true;
    offsetX = mouseX - p1.x;
    offsetY = mouseY - p1.y;
  }
  if (dist(mouseX, mouseY, p2.x, p2.y) < 20) {
    draggingP2 = true;
    offsetX = mouseX - p2.x;
    offsetY = mouseY - p2.y;
  }
  if (dist(mouseX, mouseY, p3.x, p3.y) < 20) {
    draggingP3 = true;
    offsetX = mouseX - p3.x;
    offsetY = mouseY - p3.y;
  }
}

// Mouse is dragged
function mouseDragged() {
  if (draggingP0) {
    p0.x = mouseX - offsetX;
    p0.y = mouseY - offsetY;
  }
  if (draggingP1) {
    p1.x = mouseX - offsetX;
    p1.y = mouseY - offsetY;
  }
  if (draggingP2) {
    p2.x = mouseX - offsetX;
    p2.y = mouseY - offsetY;
  }
  if (draggingP3) {
    p3.x = mouseX - offsetX;
    p3.y = mouseY - offsetY;
  }
}

// Mouse is released
function mouseReleased() {
  draggingP0 = false;
  draggingP1 = false;
  draggingP2 = false;
  draggingP3 = false;
}
