let boxSize = 10;       // Boxの大きさ
let boxDistance = 10;   // 各Box間の距離
let numDim = 12;        // X, Y, Z方向へのBoxの配置数
let startTime;          // 開始時間
let elapsedTime;        // 経過時間

function setup() {
  createCanvas(400, 400, WEBGL);
  
  // スケッチが開始された際の時間を保存
  startTime = float(millis()/1000.0);
  
  strokeWeight(0.25);
  
  camera(0, -200, 200, 0, 0, 0, 0, 1, 0);
  
  directionalLight(255, 255, 255, 1, 1, 1);
}

function draw() {
  background(63, 63, 63);
  
  // 経過時間
  elapsedTime = (float(millis()/1000.0) - startTime) * 2.0;
  
  // マウスによるカメコン
  orbitControl();
  
  lights();
  drawBoxes();
}

function drawBoxes() {
  // numDim × numDim × numDim 個のBoxを配置する
  // X, Y, Z方向それぞれにnumDim回分のループを実行する
  for(let x = -numDim/2; x < numDim/2; x++) {
    for(let y = -numDim/2; y < numDim/2; y++) {
      for(let z = -numDim/2; z < numDim/2; z++) {
        
        let scaleOffset = sin((x + elapsedTime) * 1.0) * cos((y + elapsedTime) * 1.0);
        
        // 現在の座標系を保存
        push();
        
        // 平行移動
        translate((x + 0.5) * boxDistance, (y + 0.5) * boxDistance, (z + 0.5) * boxDistance);
        
        // 経過時間とscaleOffsetでBoxの色を制御
        let r = map(x, -numDim/2, numDim/2, 50, 255);
        let g = map(y, -numDim/2, numDim/2, 50, 255);
        let b = map(z, -numDim/2, numDim/2, 50, 255);
        fill(r, g, b);
        
        // Boxの自動回転
        rotateX(elapsedTime * 0.2);
        rotateY(elapsedTime * 0.2);
        
        box(boxSize * abs(scaleOffset));
        
        // push()で保存した座標系に戻す
        pop();
      }
    }
  }
}
