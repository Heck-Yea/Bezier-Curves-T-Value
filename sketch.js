let sketch1_p0, sketch1_p1, sketch1_p2, sketch1_p3;
let sketch1_draggingP0 = false,
    sketch1_draggingP1 = false,
    sketch1_draggingP2 = false,
    sketch1_draggingP3 = false;
let sketch1_offsetX, sketch1_offsetY;
let sketch1_slider;

function setup() {
  createCanvas(1000, 1000);
  strokeWeight(20);

  sketch1_p0 = createVector(100, 500);
  sketch1_p1 = createVector(300, 200);
  sketch1_p2 = createVector(600, 250);
  sketch1_p3 = createVector(800, 700);

  // Slider that controls T
  sketch1_slider = createSlider(0, 1, 0, 0.01);
  sketch1_slider.position(20, height - 30);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(20);

  let t = sketch1_slider.value();
  let sketch1_v01 = p5.Vector.lerp(sketch1_p0, sketch1_p1, t);
  let sketch1_v02 = p5.Vector.lerp(sketch1_p1, sketch1_p2, t);
  let sketch1_v03 = p5.Vector.lerp(sketch1_p2, sketch1_p3, t);
  let sketch1_v11 = p5.Vector.lerp(sketch1_v01, sketch1_v02, t);
  let sketch1_v12 = p5.Vector.lerp(sketch1_v02, sketch1_v03, t);
  let sketch1_v21 = p5.Vector.lerp(sketch1_v11, sketch1_v12, t);

  strokeWeight(1);
  line(sketch1_p0.x, sketch1_p0.y, sketch1_p1.x, sketch1_p1.y);
  line(sketch1_p1.x, sketch1_p1.y, sketch1_p2.x, sketch1_p2.y);
  line(sketch1_p2.x, sketch1_p2.y, sketch1_p3.x, sketch1_p3.y);
  line(sketch1_v01.x, sketch1_v01.y, sketch1_v02.x, sketch1_v02.y);
  line(sketch1_v02.x, sketch1_v02.y, sketch1_v03.x, sketch1_v03.y);
  line(sketch1_v11.x, sketch1_v11.y, sketch1_v12.x, sketch1_v12.y);

  strokeWeight(4);
  stroke(255);
  beginShape();
  noFill();
  for (let t = 0; t <= 1; t += 0.01) {
    let v = sketch1_cubicBezier(sketch1_p0, sketch1_p1, sketch1_p2, sketch1_p3, t);
    vertex(v.x, v.y);
  }
  endShape();

  sketch1_drawLerpedPoints(sketch1_v01, sketch1_v02, sketch1_v03, sketch1_v11, sketch1_v12, sketch1_v21);
  sketch1_drawPoint(sketch1_p0);
  sketch1_drawPoint(sketch1_p1);
  sketch1_drawPoint(sketch1_p2);
  sketch1_drawPoint(sketch1_p3);

  strokeWeight(0.7);
  fill(255);
  textSize(25);
  textAlign(LEFT, TOP);
  text(`p0: < ${sketch1_p0.x.toFixed(2)}, ${sketch1_p0.y.toFixed(2)} >`, width - 300, 20);
  text(`p1: < ${sketch1_p1.x.toFixed(2)}, ${sketch1_p1.y.toFixed(2)} >`, width - 300, 50);
  text(`p2: < ${sketch1_p2.x.toFixed(2)}, ${sketch1_p2.y.toFixed(2)} >`, width - 300, 80);
  text(`p3: < ${sketch1_p3.x.toFixed(2)}, ${sketch1_p3.y.toFixed(2)} >`, width - 300, 110);
  text(`t-value: ${t}`, width - 300, 140);
}

function sketch1_drawPoint(p) {
  strokeWeight(20);
  stroke(255);
  point(p.x, p.y);
}

function sketch1_drawLerpedPoints(v01, v02, v03, v11, v12, v21) {
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

function sketch1_cubicBezier(p0, p1, p2, p3, t) {
  let v01 = p5.Vector.lerp(p0, p1, t);
  let v02 = p5.Vector.lerp(p1, p2, t);
  let v03 = p5.Vector.lerp(p2, p3, t);
  let v11 = p5.Vector.lerp(v01, v02, t);
  let v12 = p5.Vector.lerp(v02, v03, t);
  let v21 = p5.Vector.lerp(v11, v12, t);
  return v21;
}

function mousePressed() {
  if (dist(mouseX, mouseY, sketch1_p0.x, sketch1_p0.y) < 20) {
    sketch1_draggingP0 = true;
    sketch1_offsetX = mouseX - sketch1_p0.x;
    sketch1_offsetY = mouseY - sketch1_p0.y;
  }
  if (dist(mouseX, mouseY, sketch1_p1.x, sketch1_p1.y) < 20) {
    sketch1_draggingP1 = true;
    sketch1_offsetX = mouseX - sketch1_p1.x;
    sketch1_offsetY = mouseY - sketch1_p1.y;
  }
  if (dist(mouseX, mouseY, sketch1_p2.x, sketch1_p2.y) < 20) {
    sketch1_draggingP2 = true;
    sketch1_offsetX = mouseX - sketch1_p2.x;
    sketch1_offsetY = mouseY - sketch1_p2.y;
  }
  if (dist(mouseX, mouseY, sketch1_p3.x, sketch1_p3.y) < 20) {
    sketch1_draggingP3 = true;
    sketch1_offsetX = mouseX - sketch1_p3.x;
    sketch1_offsetY = mouseY - sketch1_p3.y;
  }
}

function mouseDragged() {
  if (sketch1_draggingP0) {
    sketch1_p0.x = mouseX - sketch1_offsetX;
    sketch1_p0.y = mouseY - sketch1_offsetY;
  }
  if (sketch1_draggingP1) {
    sketch1_p1.x = mouseX - sketch1_offsetX;
    sketch1_p1.y = mouseY - sketch1_offsetY;
  }
  if (sketch1_draggingP2) {
    sketch1_p2.x = mouseX - sketch1_offsetX;
    sketch1_p2.y = mouseY - sketch1_offsetY;
  }
  if (sketch1_draggingP3) {
    sketch1_p3.x = mouseX - sketch1_offsetX;
    sketch1_p3.y = mouseY - sketch1_offsetY;
  }
}

function mouseReleased() {
  sketch1_draggingP0 = false;
  sketch1_draggingP1 = false;
  sketch1_draggingP2 = false;
  sketch1_draggingP3 = false;
}

function clearCanvas() {
  clear();
}