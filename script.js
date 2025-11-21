// const accessKey = 'HzR3ntPhE_9p4dI6OYjkZ9S3h8WErXOYsvziBVkFF9M';
// const query = '3d render';

// fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`)
//   .then(response => response.json())
//   .then(data => {
//     const imageUrl = data.results[0].urls.regular;
//     document.getElementById('monImage').src = imageUrl;
// });




/////////////////////////////////////////////////////////////////////////////////




// var cursor = document.getElementById("block");
// document.body.addEventListener("mousemove", function(e) {
//   let minusX = window.innerWidth * 0.20;
//   let minusY = window.innerWidth * 0.10;
//   cursor.style.left = e.clientX - minusX + "px" ,
//     cursor.style.top = e.clientY - minusY + "px";
//     console.log(e.clientX);
// });
// trop couteuse en ressources...



///////////////////////////////////////ANIMATION DU BOUTON MENU & DU CURSEUR &  DEFFINITION DES VARIABLES//////////////////////////////////////////


const photo = document.getElementById("Photo");
const block = document.getElementById("block");
const container = document.getElementById("Balls-container");

const header = document.getElementById("Header");
const blockMenu = document.getElementById("blockMenu");
const color4 = document.getElementById("color4");

const case01 = document.getElementById("case01");
const case02 = document.getElementById("case02");
const case03 = document.getElementById("case03");

let blockX = 0;
let blockY = 0;
let balls = [];

const rows = (window.innerHeight * 0.015);
const cols = (window.innerWidth * 0.015);
const spacing = 25;
const puissance = 10;
const radius = 100;

const rect = container.getBoundingClientRect();
const offsetX = rect.width / 2 - ((cols - 1) * spacing) / 2;
const offsetY = rect.height / 2 - ((rows - 1) * spacing) / 2;



photo.addEventListener("mousemove", (e) => {
  const rect = photo.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  block.style.left = `${x}px`;
  block.style.top = `${y}px`;
});
photo.addEventListener("mouseleave", () => {
  block.style.opacity = "0";
});
photo.addEventListener("mouseenter", () => {
  block.style.opacity = "1";
});
header.addEventListener("mouseleave", () => {
  blockMenu.style.opacity = "0";
  color4.style.opacity = "1";
});
header.addEventListener("mouseenter", () => {
  blockMenu.style.opacity = "1";
  color4.style.opacity = "0";
});


function animateTo(x, element, duration = 300) {
    const start = performance.now();
    const from = parseFloat(element.style.left) || 0;

    function step(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const current = from + (x - from) * progress;
        element.style.left = `${current}px`;
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function moveBlockMenuToCase(caseElement) {
    const rect = caseElement.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - headerRect.left;
    blockMenu.style.left = `${x}px`;
}
case01.addEventListener("mouseenter", () => {
    const rect = case01.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - header.getBoundingClientRect().left;
    animateTo(x, blockMenu);
});
case02.addEventListener("mouseenter", () => {
    const rect = case02.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - header.getBoundingClientRect().left;
    animateTo(x, blockMenu);
});
  case03.addEventListener("mouseenter", () => {
    const rect = case03.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - header.getBoundingClientRect().left;
    animateTo(x, blockMenu);
});
header.addEventListener("mouseleave", () => {
    const rect = color4.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - header.getBoundingClientRect().left;
    animateTo(x, blockMenu);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (let i = 0; i < rows; i++) {
  balls[i] = [];
  for (let j = 0; j < cols; j++) {
    const x = offsetX + j * spacing;
    const y = offsetY + i * spacing;

    const div = document.createElement("div");
    div.className = "Ball";
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    container.appendChild(div);

    balls[i][j] = {
      baseX: x,
      baseY: y,
      x: x,    
      y: y,
      vx: 0,   
      vy: 0,
      element: div
    };

    
    }
}

photo.addEventListener("mousemove", (e) => {
  const rect = photo.getBoundingClientRect();
  blockX = e.clientX - rect.left;
  blockY = e.clientY - rect.top;

  block.style.left = `${blockX}px`;
  block.style.top = `${blockY}px`;
});

photo.addEventListener("mouseleave", () => (block.style.opacity = "0"));
photo.addEventListener("mouseenter", () => (block.style.opacity = "1"));






function collision(){requestAnimationFrame(collision);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const Ball = balls[i][j];

      const dx = Ball.x - blockX;
      const dy = Ball.y - blockY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const distFromBase = Math.sqrt((Ball.x - Ball.baseX) ** 2 + (Ball.y - Ball.baseY) ** 2);

      if (dist < radius) {
        const force = (radius - dist) / radius;
        Ball.vx += (dx / dist) * force * puissance;
        Ball.vy += (dy / dist) * force * puissance;
        // Ball.element.style.border = '2px solid red';
      } else {
        Ball.vx += (Ball.baseX - Ball.x) * .01;
        Ball.vy += (Ball.baseY - Ball.y) * .01;
      }
      Ball.x += Ball.vx;
      Ball.y += Ball.vy;
      Ball.vx *= 0.9;
      Ball.vy *= 0.9;
      

      Ball.element.style.left = `${Ball.x}px`;
      Ball.element.style.top = `${Ball.y}px`;

      if (distFromBase < 10) {
  Ball.element.style.border = '2px solid antiquewhite';
} else if (distFromBase < 20) {
  Ball.element.style.border = '2px solid cyan';
} else if (distFromBase < 30) {
  Ball.element.style.border = '2px solid rgba(92, 248, 1, 0.836)';
} else if (distFromBase < 40) {
  Ball.element.style.border = '2px solid rgb(255, 230, 0)';
} else {
  Ball.element.style.border = '2px solid red';
}
    }
};
}
collision();
 

document.getElementById("case01").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'block';
  document.getElementById('Board2').style.display = 'none';
  document.getElementById('Board3').style.display = 'none';
})
document.getElementById("case02").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'none';
  document.getElementById('Board2').style.display = 'none';
  document.getElementById('Board3').style.display = 'none';
})
document.getElementById("case03").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'none';
  document.getElementById('Board2').style.display = 'Block';
  document.getElementById('Board3').style.display = 'none';
})
document.getElementById("next").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'none';
  document.getElementById('Board2').style.display = 'none';
  document.getElementById('Board3').style.display = 'Block';

})
document.getElementById("previous").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'none';
  document.getElementById('Board2').style.display = 'Block';
  document.getElementById('Board3').style.display = 'none';

})



///////////////////////////////////////////////////////////////////////////

const Sphere = document.getElementById("Sphere");
const Path = document.getElementById("Path");
const Container = document.getElementById("Container");

let lastAngle = 0;

// --- TRAIT DU CURSEUR  ---
Container.addEventListener("mousemove", (e) => {
  const rect2 = Container.getBoundingClientRect();
  const mouseX = e.clientX - rect2.left;
  const mouseY = e.clientY - rect2.top;

  const sphereRect2 = Sphere.getBoundingClientRect();
  const sphereX = sphereRect2.left - rect2.left + sphereRect2.width / 2;
  const sphereY = sphereRect2.top - rect2.top + sphereRect2.height / 2;

  const dx = mouseX - sphereX;
  const dy = mouseY - sphereY;

  let angle = Math.atan2(dy, dx) * (180 / Math.PI);

  let delta = angle - lastAngle;
  if (delta > 180) angle -= 360;
  if (delta < -180) angle += 360;
  lastAngle = angle;

  const length = Math.sqrt(dx * dx + dy * dy);

  Path.style.width = `${length}px`;
  Path.style.left = `${sphereX}px`;
  Path.style.top = `${sphereY}px`;
  Path.style.transform = `rotate(${angle}deg)`;
});

// --- ANNEAU DE BALLS ---
const balls2 = [];
const numBalls = 100;
const baseRadius = 500;
const rect2 = Container.getBoundingClientRect();
const sphereRect2 = Sphere.getBoundingClientRect();
const sphereX = sphereRect2.left - rect2.left + sphereRect2.width / 2;
const sphereY = sphereRect2.top - rect2.top + sphereRect2.height / 2;

for (let i = 0; i < numBalls; i++) {
  const angle = (i / numBalls) * 2 * Math.PI;
  const x = sphereX + baseRadius * Math.cos(angle);
  const y = sphereY + baseRadius * Math.sin(angle);

  const div = document.createElement("div");
  div.className = "Ball2";
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  Container.appendChild(div);

  balls2.push({
    angle,
    speed: 0.01 + Math.random() * 0.02,
    radiusOffset: Math.random() * 20,
    phase: Math.random() * Math.PI * 2, 
    element: div
  });
}

function animateBalls(time) {
  const t = time * 0.001;
  const rect2 = Container.getBoundingClientRect();
  const sphereRect2 = Sphere.getBoundingClientRect();
  const sphereX = sphereRect2.left - rect2.left + sphereRect2.width / 2;
  const sphereY = sphereRect2.top - rect2.top + sphereRect2.height / 2;

  const length = parseFloat(Path.style.width) || 0;
  const angle = lastAngle * Math.PI / 180;
  const endX = sphereX + Math.cos(angle) * length;
  const endY = sphereY + Math.sin(angle) * length;


  const dx = endX - sphereX;
  const dy = endY - sphereY;
  const len2 = dx * dx + dy * dy;

  for (let i = 0; i < balls2.length; i++) {
  const b = balls2[i];
  b.angle += b.speed / 10;

  ///Rayon dynamique (pulsation légère)
  const baseR = baseRadius + Math.sin(t * 0.5 + b.phase) * b.radiusOffset;

  /// Position initiale sur l’anneau
  let x = sphereX + baseR * Math.cos(b.angle);
  let y = sphereY + baseR * Math.sin(b.angle);

  // Projection sur le Path
  const tProj = ((x - sphereX) * dx + (y - sphereY) * dy) / len2 ;
  const tClamped = Math.max(0, Math.min(1, tProj));

  // Coordonnées projetées
  const projX = sphereX + dx * tClamped;
  const projY = sphereY + dy * tClamped;

  ///  ajustement du rayon selon la distance ---
  const radiusFactor = 1 - 0.9 * Math.pow(tClamped, 2); // diminue jusqu’à 50%
  const adjustedR = baseR * radiusFactor;

  // Position "étirée" le long du Path
  const stretch = Math.pow(tClamped, 8); // forme de la courbe
  const targetX = sphereX + (endX - sphereX) * stretch + (Math.cos(b.angle)  * (1 - stretch));
  const targetY = sphereY + (endY - sphereY) * stretch + (Math.sin(b.angle)  * (1 - stretch));

  // Petite interpolation douce vers la position cible
  x += (targetX - x) * 0.9;
  y += (targetY - y) * 0.9;

  // Vibration subtile
  x += Math.sin(t * 3 + b.phase) * .3;
  y += Math.cos(t * 3 + b.phase) * .3;

  b.element.style.left = `${x}px`;
  b.element.style.top = `${y}px`;

  }

  requestAnimationFrame(animateBalls);
}
requestAnimationFrame(animateBalls);



///////////////////////////////////////////////////// Memories

let tab = random(); 
let lock = false;

function random() {
    let tableau = [];
    while (tableau.length < 16) {
        let randomNumber = Math.floor(Math.random() * 8) + 1;
        let count = tableau.filter(x => x === randomNumber).length;
        if (count < 2) {
            tableau.push(randomNumber);
        }
    }
    return tableau;
}

function afficher() {

  let reset = 0;
  document.getElementById("reset").addEventListener('click', ()=>{
    tab = random();
    for (let i = 1; i <= 16; i++) {
        let c = document.getElementById("case" + i);
        c.style.backgroundColor = "antiquewhite";
        c.textContent = "";
    }
    array = [];
    lock = false;

    // console.log("RESET");
})

    let array = [];

    for (let i = 0; i < 16; i++) {
        let caseId = "case" + (i + 1);
        let element = document.getElementById(caseId);
        
        element.addEventListener("click", (event) => {
            if (lock) return;

            let id = event.target.id;
            let indice = parseInt(id.replace("case", "")) - 1;

            if(document.getElementById(caseId).style.backgroundColor != 'green'){
            event.target.textContent = tab[indice];
            array.push(tab[indice]);
            array.push(event.target.id);
            // console.log(array);

            if (array.length === 4){
                lock = true;
                        if(array[0] != array [2]){
                            // console.log(array[0], array[2] , "loose")
                            // console.log(array[1], array[3])
                            let carte1 = array[1];
                            let carte2 = array[3];
                            setTimeout(()=>{
                            document.getElementById(carte1).style.backgroundColor = 'red';
                            document.getElementById(carte2).style.backgroundColor = 'red';
                            }, 200);
                            setTimeout(()=>{
                            document.getElementById(carte1).textContent = "";
                            document.getElementById(carte2).textContent = ""; 
                        
                            document.getElementById(carte1).style.backgroundColor = "antiquewhite";
                            document.getElementById(carte2).style.backgroundColor = "antiquewhite";
                            lock = false;}, 
                            1000);
                            
                        } 
                        else if(array[1] === array[3]){
                            let carte1 = array[1];
                            setTimeout(()=>{
                            array = [];
                            document.getElementById(carte1).textContent = "";
                            lock = false;
                            }, 
                            1000);

                        }else {
                            let carte1 = array[1];
                            let carte2 = array[3];
                            // console.log("win");
                            setTimeout(()=>{
                            document.getElementById(carte1).style.backgroundColor = 'rgba(92, 248, 1, 0.836)';
                            document.getElementById(carte2).style.backgroundColor = 'rgba(92, 248, 1, 0.836)';
                        lock = false;}, 200);


                        };      
                    array = [];
                        
                    }  
        }});
        
    }
}
afficher();


//////////////////////////////////////// LABI

function moove() {

    const elements = document.querySelectorAll('.labiCartes');

    elements.forEach(element => {
        element.addEventListener('click', function () {

            const empty = getEmptyTile();

            if (isAdjacent(element, empty)) {
                moveTile(element, empty);
                // console.log("Tuile déplacée !");
            } else {
                // console.log("Impossible de déplacer cette tuile");
            }

        });
    });

}
moove();


function getEmptyTile() {
    return document.querySelector('.empty');
}

function isAdjacent(tile, empty) {
    const tileRow = parseInt(tile.dataset.row); 
    const tileCol = parseInt(tile.dataset.col); 

    const emptyRow = parseInt(empty.dataset.row);
    const emptyCol = parseInt(empty.dataset.col);

    const rowDiff = Math.abs(tileRow - emptyRow);
    const colDiff = Math.abs(tileCol - emptyCol);
    // console.log(rowDiff,colDiff);
    return (rowDiff + colDiff === 1);
}
function moveTile(tile, empty) {
    const tileRow = tile.dataset.row;
    const tileCol = tile.dataset.col;
    const emptyRow = empty.dataset.row;
    const emptyCol = empty.dataset.col;

    tile.dataset.row = emptyRow;
    tile.dataset.col = emptyCol;

    empty.dataset.row = tileRow;
    empty.dataset.col = tileCol;

    tile.style.gridRow = parseInt(tile.dataset.row) + 1;
    tile.style.gridColumn = parseInt(tile.dataset.col) + 1;

    empty.style.gridRow = parseInt(empty.dataset.row) + 1;
    empty.style.gridColumn = parseInt(empty.dataset.col) + 1;

}

document.querySelectorAll('.labiCartes').forEach(tile => {
    tile.style.gridRow = parseInt(tile.dataset.row) + 1;
    tile.style.gridColumn = parseInt(tile.dataset.col) + 1;
});


function shuffleSolvable() {
    let numbers;

    do {
        numbers = [...Array(15).keys()].map(n => n + 1)
            .sort(() => Math.random() - 0.5);
    } while (!isSolvable(numbers));

    return numbers;
}

function isSolvable(arr) {
    let inversions = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) inversions++;
        }
    }


    const emptyRowFromBottom = 1; 

    return (inversions + emptyRowFromBottom) % 2 === 0;
}

function randomizeTiles() {
    const tiles = Array.from(document.querySelectorAll('.labiCartes:not(.empty)'));

    const numbers = shuffleSolvable();

    tiles.forEach((tile, i) => {
        tile.innerText = String(numbers[i]).padStart(2, "0");
        tile.id = numbers[i];
    });
}
randomizeTiles();
