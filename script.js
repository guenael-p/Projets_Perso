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

const case1 = document.getElementById("case1");
const case2 = document.getElementById("case2");
const case3 = document.getElementById("case3");

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
case1.addEventListener("mouseenter", () => {
    const rect = case1.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - header.getBoundingClientRect().left;
    animateTo(x, blockMenu);
});
case2.addEventListener("mouseenter", () => {
    const rect = case2.getBoundingClientRect();
    const x = rect.left + rect.width / 2 - header.getBoundingClientRect().left;
    animateTo(x, blockMenu);
});
  case3.addEventListener("mouseenter", () => {
    const rect = case3.getBoundingClientRect();
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
 

document.getElementById("case1").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'block';
})
document.getElementById("case2").addEventListener('click', ()=>{
  document.getElementById('Board').style.display = 'none';
})
