(function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // canvas size
  const canvasSize = 680;
  const w = (canvas.width = canvasSize);
  const h = (canvas.height = canvasSize);
  const canvasFillColor = "#131313";
  const canvasStrokeColor = "rgba(211, 211, 211, 0.19)";

  const scoreEl = document.getElementById("score");
  const resetEl = document.getElementById("reset");
  const showGridEl = document.getElementById("show-grid");
  const highScoreEl = document.getElementById("high-score");
  const pauseEl = document.getElementById("pause");
  const playEl = document.getElementById("play");

  let score = 0;

  const setScore = () => {
    scoreEl.innerHTML = `Score 👉 ${score}`;
    if (score >= localStorage.getItem("highScore"))
      localStorage.setItem("highScore", score);
    highScoreEl.innerHTML = `DEIN HIGH-SCORE 🚀 ${localStorage.getItem("highScore")}`;
  };

  // frame rate
  const frameRate = 9.5;

  // grid padding
  const pGrid = 4;
  // grid width
  const grid_line_len = canvasSize - 2 * pGrid;
  //  cell count
  const cellCount = 44;
  // cell size
  const cellSize = grid_line_len / cellCount;

  // Bereits gespielt?
  if (localStorage.getItem('hasRun') === null) {
    // Set the initial value to false as a string
    localStorage.setItem('hasRun', JSON.stringify(false));
  }

  let hasRun = JSON.parse(localStorage.getItem('hasRun')) || false;



  let gameActive;

  // this will generate random color for head
  const randomColor = () => {
    let color;
    let colorArr = ["#426ff5", "#42f5e3"];
    color = colorArr[Math.floor(Math.random() * 2)];
    return color;
  };

  const head = {
    x: 2,
    y: 1,
    color: randomColor(),
    vX: 0,
    vY: 0,
    draw: () => {
      ctx.fillStyle = head.color;
      ctx.shadowColor = head.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        head.x * cellSize + pGrid,
        head.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  let tailLength = 4;
  let snakeParts = [];
  class Tail {
    color = "#42f57e";
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        this.x * cellSize + pGrid,
        this.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    }
  }

  const food = {
    x: 10,
    y: 1,
    color: "#FF3131",
    draw: () => {
      ctx.fillStyle = food.color;
      ctx.shadowColor = food.color;
      ctx.shadowBlur = 5;
      ctx.fillRect(
        food.x * cellSize + pGrid,
        food.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle = {
    x: Math.floor(cellCount / 2) +11,
    y: Math.floor(cellCount / 2) +11,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle.color;
      ctx.shadowColor = obstacle.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle.x * cellSize + pGrid,
        obstacle.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle2 = {
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle2.color;
      ctx.shadowColor = obstacle2.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle2.x * cellSize + pGrid,
        obstacle2.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle3 = {
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle3.color;
      ctx.shadowColor = obstacle3.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle3.x * cellSize + pGrid,
        obstacle3.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle4 = {
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle4.color;
      ctx.shadowColor = obstacle4.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle4.x * cellSize + pGrid,
        obstacle4.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle5 = {
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle5.color;
      ctx.shadowColor = obstacle5.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle5.x * cellSize + pGrid,
        obstacle5.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle6 = {
    x: Math.floor(cellCount / 2) - 3,
    y: Math.floor(cellCount / 2) - 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle6.color;
      ctx.shadowColor = obstacle6.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle6.x * cellSize + pGrid,
        obstacle6.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle7 = {
    x: Math.floor(cellCount / 2) - 3,
    y: Math.floor(cellCount / 2) - 11,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle7.color;
      ctx.shadowColor = obstacle7.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle7.x * cellSize + pGrid,
        obstacle7.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle8 = {
    x: Math.floor(cellCount / 2) - 2,
    y: Math.floor(cellCount / 2) - 11,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle8.color;
      ctx.shadowColor = obstacle8.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle8.x * cellSize + pGrid,
        obstacle8.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle9 = {
    x: Math.floor(cellCount / 2) - 1,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle9.color;
      ctx.shadowColor = obstacle9.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle9.x * cellSize + pGrid,
        obstacle9.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle10 = {
    x: Math.floor(cellCount / 2) - 1,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle10.color;
      ctx.shadowColor = obstacle10.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle10.x * cellSize + pGrid,
        obstacle10.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle11 = {
    x: Math.floor(cellCount / 2) - 7,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle11.color;
      ctx.shadowColor = obstacle11.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle11.x * cellSize + pGrid,
        obstacle11.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle12 = {
    x: Math.floor(cellCount / 2) + 10,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle12.color;
      ctx.shadowColor = obstacle12.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle12.x * cellSize + pGrid,
        obstacle12.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle13 = {
    x: Math.floor(cellCount / 2) -19,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle13.color;
      ctx.shadowColor = obstacle13.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle13.x * cellSize + pGrid,
        obstacle13.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle14 = {
    x: Math.floor(cellCount / 2) -19,
    y: Math.floor(cellCount / 2) - 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle14.color;
      ctx.shadowColor = obstacle14.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle14.x * cellSize + pGrid,
        obstacle14.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle15 = {
    x: Math.floor(cellCount / 2) -19,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle15.color;
      ctx.shadowColor = obstacle15.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle15.x * cellSize + pGrid,
        obstacle15.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle16 = {
    x: Math.floor(cellCount / 2) -19,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle16.color;
      ctx.shadowColor = obstacle16.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle16.x * cellSize + pGrid,
        obstacle16.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle17 = {
    x: Math.floor(cellCount / 2) -19,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle17.color;
      ctx.shadowColor = obstacle17.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle17.x * cellSize + pGrid,
        obstacle17.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle18 = {
    x: Math.floor(cellCount / 2) -19,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle18.color;
      ctx.shadowColor = obstacle18.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle18.x * cellSize + pGrid,
        obstacle18.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle19 = { 
    x: Math.floor(cellCount / 2) -18,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle19.color;
      ctx.shadowColor = obstacle19.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle19.x * cellSize + pGrid,
        obstacle19.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle20 = {
    x: Math.floor(cellCount / 2) -17,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle20.color;
      ctx.shadowColor = obstacle20.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle20.x * cellSize + pGrid,
        obstacle20.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle21 = {
    x: Math.floor(cellCount / 2) -16,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle21.color;
      ctx.shadowColor = obstacle21.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle21.x * cellSize + pGrid,
        obstacle21.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle22 = {
    x: Math.floor(cellCount / 2) -15,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle22.color;
      ctx.shadowColor = obstacle22.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle22.x * cellSize + pGrid,
        obstacle22.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle23 = {
    x: Math.floor(cellCount / 2) -14,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle23.color;
      ctx.shadowColor = obstacle23.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle23.x * cellSize + pGrid,
        obstacle23.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle24 = {
    x: Math.floor(cellCount / 2) -14,
    y: Math.floor(cellCount / 2) - 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle24.color;
      ctx.shadowColor = obstacle24.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle24.x * cellSize + pGrid,
        obstacle24.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle25 = {
    x: Math.floor(cellCount / 2) -14,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle25.color;
      ctx.shadowColor = obstacle25.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle25.x * cellSize + pGrid,
        obstacle25.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle26 = {
    x: Math.floor(cellCount / 2) -14,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle26.color;
      ctx.shadowColor = obstacle26.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle26.x * cellSize + pGrid,
        obstacle26.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle27 = {
    x: Math.floor(cellCount / 2) -14,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle27.color;
      ctx.shadowColor = obstacle27.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle27.x * cellSize + pGrid,
        obstacle27.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle28 = {
    x: Math.floor(cellCount / 2) -14,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle28.color;
      ctx.shadowColor = obstacle28.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle28.x * cellSize + pGrid,
        obstacle28.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle29 = {
    x: Math.floor(cellCount / 2) -15,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle29.color;
      ctx.shadowColor = obstacle29.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle29.x * cellSize + pGrid,
        obstacle29.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle30 = {
    x: Math.floor(cellCount / 2) -16,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle30.color;
      ctx.shadowColor = obstacle30.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle30.x * cellSize + pGrid,
        obstacle30.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle31 = {
    x: Math.floor(cellCount / 2) -17,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle30.color;
      ctx.shadowColor = obstacle30.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle31.x * cellSize + pGrid,
        obstacle31.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle32 = {
    x: Math.floor(cellCount / 2) -18,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle32.color;
      ctx.shadowColor = obstacle32.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle32.x * cellSize + pGrid,
        obstacle32.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle33 = {
    x: Math.floor(cellCount / 2) -17,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle33.x * cellSize + pGrid,
        obstacle33.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle34 = {
    x: Math.floor(cellCount / 2) -16,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle34.x * cellSize + pGrid,
        obstacle34.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle35 = {
    x: Math.floor(cellCount / 2) -16,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle35.x * cellSize + pGrid,
        obstacle35.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle36 = {
    x: Math.floor(cellCount / 2) -17,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle36.x * cellSize + pGrid,
        obstacle36.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle37 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle37.x * cellSize + pGrid,
        obstacle37.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle38 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle38.x * cellSize + pGrid,
        obstacle38.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle39 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle39.x * cellSize + pGrid,
        obstacle39.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle40 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle40.x * cellSize + pGrid,
        obstacle40.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle41 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle41.x * cellSize + pGrid,
        obstacle41.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle42 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle33.color;
      ctx.shadowColor = obstacle33.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle42.x * cellSize + pGrid,
        obstacle42.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle43 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle43.color;
      ctx.shadowColor = obstacle43.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle43.x * cellSize + pGrid,
        obstacle43.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle44 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle44.color;
      ctx.shadowColor = obstacle44.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle44.x * cellSize + pGrid,
        obstacle44.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle45 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle45.color;
      ctx.shadowColor = obstacle45.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle45.x * cellSize + pGrid,
        obstacle45.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle46 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle46.color;
      ctx.shadowColor = obstacle46.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle46.x * cellSize + pGrid,
        obstacle46.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle47 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle47.color;
      ctx.shadowColor = obstacle47.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle47.x * cellSize + pGrid,
        obstacle47.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle48 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle48.color;
      ctx.shadowColor = obstacle48.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle48.x * cellSize + pGrid,
        obstacle48.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle49 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle49.color;
      ctx.shadowColor = obstacle49.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle49.x * cellSize + pGrid,
        obstacle49.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle50 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle50.color;
      ctx.shadowColor = obstacle50.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle50.x * cellSize + pGrid,
        obstacle50.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle51 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle51.color;
      ctx.shadowColor = obstacle51.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle51.x * cellSize + pGrid,
        obstacle51.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle52 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle52.color;
      ctx.shadowColor = obstacle52.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle52.x * cellSize + pGrid,
        obstacle52.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle53 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle53.color;
      ctx.shadowColor = obstacle53.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle53.x * cellSize + pGrid,
        obstacle53.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle54 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle54.color;
      ctx.shadowColor = obstacle54.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle54.x * cellSize + pGrid,
        obstacle54.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle55 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle55.color;
      ctx.shadowColor = obstacle55.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle55.x * cellSize + pGrid,
        obstacle55.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle56 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle56.color;
      ctx.shadowColor = obstacle56.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle56.x * cellSize + pGrid,
        obstacle56.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle57 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle57.color;
      ctx.shadowColor = obstacle57.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle57.x * cellSize + pGrid,
        obstacle57.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle58 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle58.color;
      ctx.shadowColor = obstacle58.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle58.x * cellSize + pGrid,
        obstacle58.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle59 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle59.color;
      ctx.shadowColor = obstacle59.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle59.x * cellSize + pGrid,
        obstacle59.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle60 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle60.color;
      ctx.shadowColor = obstacle60.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle60.x * cellSize + pGrid,
        obstacle60.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle61 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle61.color;
      ctx.shadowColor = obstacle61.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle61.x * cellSize + pGrid,
        obstacle61.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle62 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle62.color;
      ctx.shadowColor = obstacle62.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle62.x * cellSize + pGrid,
        obstacle62.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle63 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle63.color;
      ctx.shadowColor = obstacle63.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle63.x * cellSize + pGrid,
        obstacle63.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle64 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle64.color;
      ctx.shadowColor = obstacle64.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle64.x * cellSize + pGrid,
        obstacle64.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle65 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle65.color;
      ctx.shadowColor = obstacle65.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle65.x * cellSize + pGrid,
        obstacle65.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle66 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle66.color;
      ctx.shadowColor = obstacle66.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle66.x * cellSize + pGrid,
        obstacle66.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle67 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle67.color;
      ctx.shadowColor = obstacle67.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle67.x * cellSize + pGrid,
        obstacle67.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle68 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) + 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle68.color;
      ctx.shadowColor = obstacle68.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle68.x * cellSize + pGrid,
        obstacle68.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    }
  };

  const obstacle69 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle69.color;
      ctx.shadowColor = obstacle69.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle69.x * cellSize + pGrid,
        obstacle69.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle70 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) + 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle70.color;
      ctx.shadowColor = obstacle70.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle70.x * cellSize + pGrid,
        obstacle70.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle71 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle71.color;
      ctx.shadowColor = obstacle71.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle71.x * cellSize + pGrid,
        obstacle71.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle72 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle72.color;
      ctx.shadowColor = obstacle72.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle72.x * cellSize + pGrid,
        obstacle72.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle73 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle73.color;
      ctx.shadowColor = obstacle73.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle73.x * cellSize + pGrid,
        obstacle73.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle74 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle74.color;
      ctx.shadowColor = obstacle74.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle74.x * cellSize + pGrid,
        obstacle74.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle75 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle75.color;
      ctx.shadowColor = obstacle75.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle75.x * cellSize + pGrid,
        obstacle75.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle76 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle76.color;
      ctx.shadowColor = obstacle76.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle76.x * cellSize + pGrid,
        obstacle76.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle77 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle77.color;
      ctx.shadowColor = obstacle77.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle77.x * cellSize + pGrid,
        obstacle77.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle78 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle78.color;
      ctx.shadowColor = obstacle78.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle78.x * cellSize + pGrid,
        obstacle78.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle79 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle79.color;
      ctx.shadowColor = obstacle79.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle79.x * cellSize + pGrid,
        obstacle79.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    }
  };

  const obstacle80 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle81.color;
      ctx.shadowColor = obstacle81.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle80.x * cellSize + pGrid,
        obstacle80.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle81 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle81.color;
      ctx.shadowColor = obstacle81.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle81.x * cellSize + pGrid,
        obstacle81.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle82 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle82.color;
      ctx.shadowColor = obstacle82.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle82.x * cellSize + pGrid,
        obstacle82.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle83 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle83.color;
      ctx.shadowColor = obstacle83.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle83.x * cellSize + pGrid,
        obstacle83.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle84 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) + 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle84.color;
      ctx.shadowColor = obstacle84.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle84.x * cellSize + pGrid,
        obstacle84.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle85 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) - 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle85.color;
      ctx.shadowColor = obstacle85.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle85.x * cellSize + pGrid,
        obstacle85.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle86 = {
    x: Math.floor(cellCount / 2) - 13,
    y: Math.floor(cellCount / 2) + 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle86.color;
      ctx.shadowColor = obstacle86.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle86.x * cellSize + pGrid,
        obstacle86.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle87 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) + 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle87.color;
      ctx.shadowColor = obstacle87.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle87.x * cellSize + pGrid,
        obstacle87.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle88 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle88.color;
      ctx.shadowColor = obstacle88.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle88.x * cellSize + pGrid,
        obstacle88.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle89 = {
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle89.color;
      ctx.shadowColor = obstacle89.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle89.x * cellSize + pGrid,
        obstacle89.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle90 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle90.color;
      ctx.shadowColor = obstacle90.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle90.x * cellSize + pGrid,
        obstacle90.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle91 = {
    x: Math.floor(cellCount / 2) + 4,
    y: Math.floor(cellCount / 2) - 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle91.color;
      ctx.shadowColor = obstacle91.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle91.x * cellSize + pGrid,
        obstacle91.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle92 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle92.color;
      ctx.shadowColor = obstacle92.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle92.x * cellSize + pGrid,
        obstacle92.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle93 = {
    x: Math.floor(cellCount / 2) - 12,
    y: Math.floor(cellCount / 2) + 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle93.color;
      ctx.shadowColor = obstacle93.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle93.x * cellSize + pGrid,
        obstacle93.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle94 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle94.color;
      ctx.shadowColor = obstacle94.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle94.x * cellSize + pGrid,
        obstacle94.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle95 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle95.color;
      ctx.shadowColor = obstacle95.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle95.x * cellSize + pGrid,
        obstacle95.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle96 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) + 16,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle96.color;
      ctx.shadowColor = obstacle96.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle96.x * cellSize + pGrid,
        obstacle96.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle97 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle97.color;
      ctx.shadowColor = obstacle97.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle97.x * cellSize + pGrid,
        obstacle97.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle98 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) + 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle98.color;
      ctx.shadowColor = obstacle98.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle98.x * cellSize + pGrid,
        obstacle98.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle99 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle99.color;
      ctx.shadowColor = obstacle99.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle99.x * cellSize + pGrid,
        obstacle99.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle100 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle100.color;
      ctx.shadowColor = obstacle100.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle100.x * cellSize + pGrid,
        obstacle100.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle101 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle101.color;
      ctx.shadowColor = obstacle101.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle101.x * cellSize + pGrid,
        obstacle101.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle102 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle102.color;
      ctx.shadowColor = obstacle102.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle102.x * cellSize + pGrid,
        obstacle102.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle103 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 1,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle103.color;
      ctx.shadowColor = obstacle103.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle103.x * cellSize + pGrid,
        obstacle103.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle104 = {
    x: Math.floor(cellCount / 2) - 3,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle104.color;
      ctx.shadowColor = obstacle104.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle104.x * cellSize + pGrid,
        obstacle104.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle105 = {
    x: Math.floor(cellCount / 2) - 8,
    y: Math.floor(cellCount / 2) - 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle105.color;
      ctx.shadowColor = obstacle105.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle105.x * cellSize + pGrid,
        obstacle105.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle106 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle106.color;
      ctx.shadowColor = obstacle106.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle106.x * cellSize + pGrid,
        obstacle106.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle107 = {
    x: Math.floor(cellCount / 2) + 1,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle107.color;
      ctx.shadowColor = obstacle107.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle107.x * cellSize + pGrid,
        obstacle107.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle108 = {
    x: Math.floor(cellCount / 2) + 2,
    y: Math.floor(cellCount / 2) + 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle108.color;
      ctx.shadowColor = obstacle108.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle108.x * cellSize + pGrid,
        obstacle108.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle109 = {
    x: Math.floor(cellCount / 2) + 2,
    y: Math.floor(cellCount / 2) + 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle109.color;
      ctx.shadowColor = obstacle109.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle109.x * cellSize + pGrid,
        obstacle109.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle110 = {
    x: Math.floor(cellCount / 2) + 2,
    y: Math.floor(cellCount / 2) + 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle110.color;
      ctx.shadowColor = obstacle110.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle110.x * cellSize + pGrid,
        obstacle110.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle111 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) - 11,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle111.color;
      ctx.shadowColor = obstacle111.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle111.x * cellSize + pGrid,
        obstacle111.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle112 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle112.color;
      ctx.shadowColor = obstacle112.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle112.x * cellSize + pGrid,
        obstacle112.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle113 = {
    x: Math.floor(cellCount / 2) + 1,
    y: Math.floor(cellCount / 2) + 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle113.color;
      ctx.shadowColor = obstacle113.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle113.x * cellSize + pGrid,
        obstacle113.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle114 = {
    x: Math.floor(cellCount / 2) - 12,
    y: Math.floor(cellCount / 2) -10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle114.color;
      ctx.shadowColor = obstacle114.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle114.x * cellSize + pGrid,
        obstacle114.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle115 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) - 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle115.color;
      ctx.shadowColor = obstacle115.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle115.x * cellSize + pGrid,
        obstacle115.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle116 = {
    x: Math.floor(cellCount / 2) - 6,
    y: Math.floor(cellCount / 2) + 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle116.color;
      ctx.shadowColor = obstacle116.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle116.x * cellSize + pGrid,
        obstacle116.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  const obstacle117 = {
    x: Math.floor(cellCount / 2) - 11,
    y: Math.floor(cellCount / 2) - 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle117.color;
      ctx.shadowColor = obstacle117.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle117.x * cellSize + pGrid,
        obstacle117.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle118 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) - 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle118.color;
      ctx.shadowColor = obstacle118.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle118.x * cellSize + pGrid,
        obstacle118.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle119 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) + 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle119.color;
      ctx.shadowColor = obstacle119.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle119.x * cellSize + pGrid,
        obstacle119.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle120 = {
    x: Math.floor(cellCount / 2) + 4,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle120.color;
      ctx.shadowColor = obstacle120.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle120.x * cellSize + pGrid,
        obstacle120.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle121 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) + 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle121.color;
      ctx.shadowColor = obstacle121.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle121.x * cellSize + pGrid,
        obstacle121.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle122 = {
    x: Math.floor(cellCount / 2) + 7,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle122.color;
      ctx.shadowColor = obstacle122.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle122.x * cellSize + pGrid,
        obstacle122.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle123 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) + 7,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle123.color;
      ctx.shadowColor = obstacle123.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle123.x * cellSize + pGrid,
        obstacle123.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle124 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle124.color;
      ctx.shadowColor = obstacle124.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle124.x * cellSize + pGrid,
        obstacle124.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle125 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle125.color;
      ctx.shadowColor = obstacle125.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle125.x * cellSize + pGrid,
        obstacle125.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle126 = {
    x: Math.floor(cellCount / 2) + 6,
    y: Math.floor(cellCount / 2) - 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle126.color;
      ctx.shadowColor = obstacle126.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle126.x * cellSize + pGrid,
        obstacle126.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle127 = {
    x: Math.floor(cellCount / 2) - 19,
    y: Math.floor(cellCount / 2) + 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle127.color;
      ctx.shadowColor = obstacle127.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle127.x * cellSize + pGrid,
        obstacle127.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle128 = {
    x: Math.floor(cellCount / 2) + 2,
    y: Math.floor(cellCount / 2) + 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle128.color;
      ctx.shadowColor = obstacle128.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle128.x * cellSize + pGrid,
        obstacle128.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle129 = {
    x: Math.floor(cellCount / 2) - 7,
    y: Math.floor(cellCount / 2) + 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle129.color;
      ctx.shadowColor = obstacle129.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle129.x * cellSize + pGrid,
        obstacle129.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle130 = {
    x: Math.floor(cellCount / 2) + 10,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle130.color;
      ctx.shadowColor = obstacle130.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle130.x * cellSize + pGrid,
        obstacle130.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle131 = {
    x: Math.floor(cellCount / 2) - 4,
    y: Math.floor(cellCount / 2) + 7,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle131.color;
      ctx.shadowColor = obstacle131.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle131.x * cellSize + pGrid,
        obstacle131.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle132 = {
    x: Math.floor(cellCount / 2) + 6,
    y: Math.floor(cellCount / 2) + 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle132.color;
      ctx.shadowColor = obstacle132.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle132.x * cellSize + pGrid,
        obstacle132.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle133 = {
    x: Math.floor(cellCount / 2) - 8,
    y: Math.floor(cellCount / 2) - 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle133.color;
      ctx.shadowColor = obstacle133.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle133.x * cellSize + pGrid,
        obstacle133.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle134 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) - 13,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle134.color;
      ctx.shadowColor = obstacle134.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle134.x * cellSize + pGrid,
        obstacle134.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle135 = {
    x: Math.floor(cellCount / 2) - 4,
    y: Math.floor(cellCount / 2) + 0,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle135.color;
      ctx.shadowColor = obstacle135.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle135.x * cellSize + pGrid,
        obstacle135.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle136 = {
    x: Math.floor(cellCount / 2) - 5,
    y: Math.floor(cellCount / 2) + 0,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle136.color;
      ctx.shadowColor = obstacle136.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle136.x * cellSize + pGrid,
        obstacle136.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle137 = {
    x: Math.floor(cellCount / 2) - 6,
    y: Math.floor(cellCount / 2) - 0,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle137.color;
      ctx.shadowColor = obstacle137.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle137.x * cellSize + pGrid,
        obstacle137.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle138 = {
    x: Math.floor(cellCount / 2) - 14,
    y: Math.floor(cellCount / 2) - 1,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle138.color;
      ctx.shadowColor = obstacle138.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle138.x * cellSize + pGrid,
        obstacle138.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle139 = {
    x: Math.floor(cellCount / 2) - 13,
    y: Math.floor(cellCount / 2) - 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle139.color;
      ctx.shadowColor = obstacle139.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle139.x * cellSize + pGrid,
        obstacle139.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle140 = {
    x: Math.floor(cellCount / 2) - 13,
    y: Math.floor(cellCount / 2) - 1,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle140.color;
      ctx.shadowColor = obstacle140.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle140.x * cellSize + pGrid,
        obstacle140.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle141 = {
    x: Math.floor(cellCount / 2) + 7,
    y: Math.floor(cellCount / 2) - 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle141.color;
      ctx.shadowColor = obstacle141.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle141.x * cellSize + pGrid,
        obstacle141.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle142 = {
    x: Math.floor(cellCount / 2) - 12,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle142.color;
      ctx.shadowColor = obstacle142.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle142.x * cellSize + pGrid,
        obstacle142.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle143 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) + 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle143.color;
      ctx.shadowColor = obstacle143.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle143.x * cellSize + pGrid,
        obstacle143.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle144 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle144.color;
      ctx.shadowColor = obstacle144.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle144.x * cellSize + pGrid,
        obstacle144.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle145 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 7,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle145.color;
      ctx.shadowColor = obstacle145.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle145.x * cellSize + pGrid,
        obstacle145.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle146 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle146.color;
      ctx.shadowColor = obstacle146.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle146.x * cellSize + pGrid,
        obstacle146.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle147 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) - 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle147.color;
      ctx.shadowColor = obstacle147.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle147.x * cellSize + pGrid,
        obstacle147.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle148 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) - 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle148.color;
      ctx.shadowColor = obstacle148.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle148.x * cellSize + pGrid,
        obstacle148.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle149 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) - 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle149.color;
      ctx.shadowColor = obstacle149.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle149.x * cellSize + pGrid,
        obstacle149.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle150 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) - 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle150.color;
      ctx.shadowColor = obstacle150.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle150.x * cellSize + pGrid,
        obstacle150.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle151 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle151.color;
      ctx.shadowColor = obstacle151.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle151.x * cellSize + pGrid,
        obstacle151.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle152 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) - 7,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle152.color;
      ctx.shadowColor = obstacle152.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle152.x * cellSize + pGrid,
        obstacle152.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle153 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) - 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle153.color;
      ctx.shadowColor = obstacle153.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle153.x * cellSize + pGrid,
        obstacle153.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle154 = {
    x: Math.floor(cellCount / 2) - 2,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle154.color;
      ctx.shadowColor = obstacle154.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle154.x * cellSize + pGrid,
        obstacle154.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle155 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) + 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle155.color;
      ctx.shadowColor = obstacle155.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle155.x * cellSize + pGrid,
        obstacle155.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle156 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle156.color;
      ctx.shadowColor = obstacle156.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle156.x * cellSize + pGrid,
        obstacle156.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle157 = {
    x: Math.floor(cellCount / 2) - 9,
    y: Math.floor(cellCount / 2) - 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle157.color;
      ctx.shadowColor = obstacle157.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle157.x * cellSize + pGrid,
        obstacle157.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle158 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) + 12,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle158.color;
      ctx.shadowColor = obstacle158.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle158.x * cellSize + pGrid,
        obstacle158.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle159 = {
    x: Math.floor(cellCount / 2) - 9,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle159.color;
      ctx.shadowColor = obstacle159.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle159.x * cellSize + pGrid,
        obstacle159.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle160 = {
    x: Math.floor(cellCount / 2) + 8,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle160.color;
      ctx.shadowColor = obstacle160.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle160.x * cellSize + pGrid,
        obstacle160.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle161 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle161.color;
      ctx.shadowColor = obstacle161.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle161.x * cellSize + pGrid,
        obstacle161.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle162 = {
    x: Math.floor(cellCount / 2) + 6,
    y: Math.floor(cellCount / 2) - 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle162.color;
      ctx.shadowColor = obstacle162.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle162.x * cellSize + pGrid,
        obstacle162.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle163 = {
    x: Math.floor(cellCount / 2) - 4,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle163.color;
      ctx.shadowColor = obstacle163.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle163.x * cellSize + pGrid,
        obstacle163.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle164 = {
    x: Math.floor(cellCount / 2) - 3,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle164.color;
      ctx.shadowColor = obstacle164.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle164.x * cellSize + pGrid,
        obstacle164.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle165 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) - 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle165.color;
      ctx.shadowColor = obstacle165.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle165.x * cellSize + pGrid,
        obstacle165.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle166 = {
    x: Math.floor(cellCount / 2) +18,
    y: Math.floor(cellCount / 2) + 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle166.color;
      ctx.shadowColor = obstacle166.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle166.x * cellSize + pGrid,
        obstacle166.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle167 = {
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) + 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle167.color;
      ctx.shadowColor = obstacle167.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle167.x * cellSize + pGrid,
        obstacle167.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle168 = {
    x: Math.floor(cellCount / 2) + 6,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle168.color;
      ctx.shadowColor = obstacle168.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle168.x * cellSize + pGrid,
        obstacle168.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle169 = {
    x: Math.floor(cellCount / 2) - 11,
    y: Math.floor(cellCount / 2) + 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle169.color;
      ctx.shadowColor = obstacle169.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle169.x * cellSize + pGrid,
        obstacle169.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle170 = {
    x: Math.floor(cellCount / 2) + 7,
    y: Math.floor(cellCount / 2) - 19,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle170.color;
      ctx.shadowColor = obstacle170.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle170.x * cellSize + pGrid,
        obstacle170.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle171 = {
    x: Math.floor(cellCount / 2) + 2,
    y: Math.floor(cellCount / 2) + 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle171.color;
      ctx.shadowColor = obstacle171.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle171.x * cellSize + pGrid,
        obstacle171.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle172 = {
    x: Math.floor(cellCount / 2) + 8,
    y: Math.floor(cellCount / 2) + 17,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle172.color;
      ctx.shadowColor = obstacle172.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle172.x * cellSize + pGrid,
        obstacle172.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle173 = {
    x: Math.floor(cellCount / 2) - 1,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle173.color;
      ctx.shadowColor = obstacle173.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle173.x * cellSize + pGrid,
        obstacle173.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle174 = {
    x: Math.floor(cellCount / 2) + 8,
    y: Math.floor(cellCount / 2) - 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle174.color;
      ctx.shadowColor = obstacle174.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle174.x * cellSize + pGrid,
        obstacle174.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle175 = {
    x: Math.floor(cellCount / 2) + 4,
    y: Math.floor(cellCount / 2) - 3,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle175.color;
      ctx.shadowColor = obstacle175.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle175.x * cellSize + pGrid,
        obstacle175.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle176 = {
    x: Math.floor(cellCount / 2) - 5,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle176.color;
      ctx.shadowColor = obstacle176.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle176.x * cellSize + pGrid,
        obstacle176.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle177 = {
    x: Math.floor(cellCount / 2) + 2,
    y: Math.floor(cellCount / 2) + 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle177.color;
      ctx.shadowColor = obstacle177.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle177.x * cellSize + pGrid,
        obstacle177.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle178 = {
    x: Math.floor(cellCount / 2) - 2,
    y: Math.floor(cellCount / 2) - 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle178.color;
      ctx.shadowColor = obstacle178.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle178.x * cellSize + pGrid,
        obstacle178.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle179 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) + 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle179.color;
      ctx.shadowColor = obstacle179.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle179.x * cellSize + pGrid,
        obstacle179.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle180 = {
    x: Math.floor(cellCount / 2) - 1,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle180.color;
      ctx.shadowColor = obstacle180.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle180.x * cellSize + pGrid,
        obstacle180.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle181 = {
    x: Math.floor(cellCount / 2) - 4,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle181.color;
      ctx.shadowColor = obstacle181.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle181.x * cellSize + pGrid,
        obstacle181.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle182 = {
    x: Math.floor(cellCount / 2) + 11,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle182.color;
      ctx.shadowColor = obstacle182.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle182.x * cellSize + pGrid,
        obstacle182.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle183 = {
    x: Math.floor(cellCount / 2) - 12,
    y: Math.floor(cellCount / 2) + 9,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle183.color;
      ctx.shadowColor = obstacle183.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle183.x * cellSize + pGrid,
        obstacle183.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle184 = {
    x: Math.floor(cellCount / 2) + 6,
    y: Math.floor(cellCount / 2) + 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle184.color;
      ctx.shadowColor = obstacle184.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle184.x * cellSize + pGrid,
        obstacle184.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle185 = {
    x: Math.floor(cellCount / 2) - 9,
    y: Math.floor(cellCount / 2) - 5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle185.color;
      ctx.shadowColor = obstacle185.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle185.x * cellSize + pGrid,
        obstacle185.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle186 = {
    x: Math.floor(cellCount / 2) + 7,
    y: Math.floor(cellCount / 2) - 2,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle186.color;
      ctx.shadowColor = obstacle186.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle186.x * cellSize + pGrid,
        obstacle186.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle187 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) + 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle187.color;
      ctx.shadowColor = obstacle187.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle187.x * cellSize + pGrid,
        obstacle187.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle188 = {
    x: Math.floor(cellCount / 2) - 2,
    y: Math.floor(cellCount / 2) - 15,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle188.color;
      ctx.shadowColor = obstacle188.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle188.x * cellSize + pGrid,
        obstacle188.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle189 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) - 7,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle189.color;
      ctx.shadowColor = obstacle189.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle189.x * cellSize + pGrid,
        obstacle189.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle190 = {
    x: Math.floor(cellCount / 2) + 5,
    y: Math.floor(cellCount / 2) + 9,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle190.color;
      ctx.shadowColor = obstacle190.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle190.x * cellSize + pGrid,
        obstacle190.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle191 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 9,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle191.color;
      ctx.shadowColor = obstacle191.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle191.x * cellSize + pGrid,
        obstacle191.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle192 = {
    x: Math.floor(cellCount / 2) + 8,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle192.color;
      ctx.shadowColor = obstacle192.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle192.x * cellSize + pGrid,
        obstacle192.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle193 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) - 6,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle193.color;
      ctx.shadowColor = obstacle193.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle193.x * cellSize + pGrid,
        obstacle193.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle194 = {
    x: Math.floor(cellCount / 2) - 10,
    y: Math.floor(cellCount / 2) -5,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle194.color;
      ctx.shadowColor = obstacle194.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle194.x * cellSize + pGrid,
        obstacle194.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle195 = {
    x: Math.floor(cellCount / 2) - 2,
    y: Math.floor(cellCount / 2) + 18,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle195.color;
      ctx.shadowColor = obstacle195.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle195.x * cellSize + pGrid,
        obstacle195.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle196 = {
    x: Math.floor(cellCount / 2) + 9,
    y: Math.floor(cellCount / 2) + 4,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle196.color;
      ctx.shadowColor = obstacle196.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle196.x * cellSize + pGrid,
        obstacle196.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle197 = {
    x: Math.floor(cellCount / 2) + 3,
    y: Math.floor(cellCount / 2) - 14,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle197.color;
      ctx.shadowColor = obstacle197.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle197.x * cellSize + pGrid,
        obstacle197.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle198 = {
    x: Math.floor(cellCount / 2) - 12,
    y: Math.floor(cellCount / 2) + 10,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle198.color;
      ctx.shadowColor = obstacle198.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle198.x * cellSize + pGrid,
        obstacle198.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle199 = {
    x: Math.floor(cellCount / 2) + 6,
    y: Math.floor(cellCount / 2) + 8,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle199.color;
      ctx.shadowColor = obstacle199.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle199.x * cellSize + pGrid,
        obstacle199.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle200 = {
    x: Math.floor(cellCount / 2) - 3,
    y: Math.floor(cellCount / 2) + 7,
    color: "#FFFFFF",
    draw: () => {
      ctx.fillStyle = obstacle200.color;
      ctx.shadowColor = obstacle200.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle200.x * cellSize + pGrid,
        obstacle200.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle201 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle201.color;
      ctx.shadowColor = obstacle201.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle201.x * cellSize + pGrid,
        obstacle201.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle202 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle202.color;
      ctx.shadowColor = obstacle202.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle202.x * cellSize + pGrid,
        obstacle202.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle203 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle203.color;
      ctx.shadowColor = obstacle203.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle203.x * cellSize + pGrid,
        obstacle203.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle204 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle204.color;
      ctx.shadowColor = obstacle204.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle204.x * cellSize + pGrid,
        obstacle204.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle205 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) - 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle205.color;
      ctx.shadowColor = obstacle205.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle205.x * cellSize + pGrid,
        obstacle205.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle206 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) - 16,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle206.color;
      ctx.shadowColor = obstacle206.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle206.x * cellSize + pGrid,
        obstacle206.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle207 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle207.color;
      ctx.shadowColor = obstacle207.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle207.x * cellSize + pGrid,
        obstacle207.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle208 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle208.color;
      ctx.shadowColor = obstacle208.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle208.x * cellSize + pGrid,
        obstacle208.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle209 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle209.color;
      ctx.shadowColor = obstacle209.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle209.x * cellSize + pGrid,
        obstacle209.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle210 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle210.color;
      ctx.shadowColor = obstacle210.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle210.x * cellSize + pGrid,
        obstacle210.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle211 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) - 16,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle211.color;
      ctx.shadowColor = obstacle211.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle211.x * cellSize + pGrid,
        obstacle211.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle212 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) - 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle212.color;
      ctx.shadowColor = obstacle212.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle212.x * cellSize + pGrid,
        obstacle212.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle213 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle213.color;
      ctx.shadowColor = obstacle213.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle213.x * cellSize + pGrid,
        obstacle213.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle214 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle214.color;
      ctx.shadowColor = obstacle214.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle214.x * cellSize + pGrid,
        obstacle214.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle215 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 16,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle215.color;
      ctx.shadowColor = obstacle215.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle215.x * cellSize + pGrid,
        obstacle215.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle216 = {
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle216.color;
      ctx.shadowColor = obstacle216.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle216.x * cellSize + pGrid,
        obstacle216.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle217 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle217.color;
      ctx.shadowColor = obstacle217.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle217.x * cellSize + pGrid,
        obstacle217.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle218 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle218.color;
      ctx.shadowColor = obstacle218.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle218.x * cellSize + pGrid,
        obstacle218.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle219 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle219.color;
      ctx.shadowColor = obstacle219.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle219.x * cellSize + pGrid,
        obstacle219.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle220 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 16,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle220.color;
      ctx.shadowColor = obstacle220.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle220.x * cellSize + pGrid,
        obstacle220.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle221 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle221.color;
      ctx.shadowColor = obstacle221.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle221.x * cellSize + pGrid,
        obstacle221.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle222 = {
    x: Math.floor(cellCount / 2) + 14,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle222.color;
      ctx.shadowColor = obstacle222.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle222.x * cellSize + pGrid,
        obstacle222.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle223 = {
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle223.color;
      ctx.shadowColor = obstacle223.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle223.x * cellSize + pGrid,
        obstacle223.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle224 = {
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) - 18,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle224.color;
      ctx.shadowColor = obstacle224.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle224.x * cellSize + pGrid,
        obstacle224.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle225 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) + 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle225.color;
      ctx.shadowColor = obstacle225.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle225.x * cellSize + pGrid,
        obstacle225.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle226 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) + 16,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle226.color;
      ctx.shadowColor = obstacle226.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle226.x * cellSize + pGrid,
        obstacle226.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };

  const obstacle227 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) + 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle227.color;
      ctx.shadowColor = obstacle227.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle227.x * cellSize + pGrid,
        obstacle227.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle228 = {
    x: Math.floor(cellCount / 2) - 18,
    y: Math.floor(cellCount / 2) + 14,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle228.color;
      ctx.shadowColor = obstacle228.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle228.x * cellSize + pGrid,
        obstacle228.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle229 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 14,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle229.color;
      ctx.shadowColor = obstacle229.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle229.x * cellSize + pGrid,
        obstacle229.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle230 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) + 14,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle230.color;
      ctx.shadowColor = obstacle230.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle230.x * cellSize + pGrid,
        obstacle230.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle231 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) + 14,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle231.color;
      ctx.shadowColor = obstacle231.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle231.x * cellSize + pGrid,
        obstacle231.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle232 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) + 15,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle232.color;
      ctx.shadowColor = obstacle232.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle232.x * cellSize + pGrid,
        obstacle232.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle233 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) + 16,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle233.color;
      ctx.shadowColor = obstacle233.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle233.x * cellSize + pGrid,
        obstacle233.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle234 = {
    x: Math.floor(cellCount / 2) - 15,
    y: Math.floor(cellCount / 2) + 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle234.color;
      ctx.shadowColor = obstacle234.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle234.x * cellSize + pGrid,
        obstacle234.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle235 = {
    x: Math.floor(cellCount / 2) - 16,
    y: Math.floor(cellCount / 2) + 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle235.color;
      ctx.shadowColor = obstacle235.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle235.x * cellSize + pGrid,
        obstacle235.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  const obstacle236 = {
    x: Math.floor(cellCount / 2) - 17,
    y: Math.floor(cellCount / 2) + 17,
    color: "#131313",
    draw: () => {
      ctx.fillStyle = obstacle236.color;
      ctx.shadowColor = obstacle236.color;
      ctx.shadowBlur = 2.5;
      ctx.fillRect(
        obstacle236.x * cellSize + pGrid,
        obstacle236.y * cellSize + pGrid,
        cellSize,
        cellSize
      );
    },
  };
  
  
   
  

  
  

  


  // this will set canvas style
  const setCanvas = () => {
    // canvas fill
    ctx.fillStyle = canvasFillColor;
    ctx.fillRect(0, 0, w, h);

    // canvas stroke
    ctx.strokeStyle = canvasStrokeColor;
    ctx.strokeRect(0, 0, w, h);
  };

  //   this will draw the grid
  const drawGrid = () => {
    ctx.beginPath();
    for (let i = 0; i <= grid_line_len; i += cellSize) {
      ctx.moveTo(i + pGrid, pGrid);
      ctx.lineTo(i + pGrid, grid_line_len + pGrid);
    }
    for (let i = 0; i <= grid_line_len; i += cellSize) {
      ctx.moveTo(pGrid, i + pGrid);
      ctx.lineTo(grid_line_len + pGrid, i + pGrid);
    }
    ctx.closePath();
    ctx.strokeStyle = canvasStrokeColor;
    ctx.stroke();
  };

  const drawSnake = () => {
    //loop through our snakeparts array
    snakeParts.forEach((part) => {
      part.draw();
    });

    snakeParts.push(new Tail(head.x, head.y));

    if (snakeParts.length > tailLength) {
      snakeParts.shift(); //remove furthest item from  snake part if we have more than our tail size
    }
    head.color = randomColor();
    head.draw();
  };

  const updateSnakePosition = () => {
    head.x += head.vX;
    head.y += head.vY;
  };

  const changeDir = (e) => {
    let key = e.keyCode;

    if (key == 68 || key == 39) {
      if (head.vX === -1) return;
      head.vX = 1;
      head.vY = 0;
      gameActive = true;
      return;
    }
    if (key == 65 || key == 37) {
      if (head.vX === 1) return;
      head.vX = -1;
      head.vY = 0;
      gameActive = true;
      return;
    }
    if (key == 87 || key == 38) {
      if (head.vY === 1) return;
      head.vX = 0;
      head.vY = -1;
      gameActive = true;
      return;
    }
    if (key == 83 || key == 40) {
      if (head.vY === -1) return;
      head.vX = 0;
      head.vY = 1;
      gameActive = true;
      return;
    }
  };

  const foodCollision = () => {
    let foodCollision = false;
    snakeParts.forEach((part) => {
      if (part.x == food.x && part.y == food.y) {
        foodCollision = true;
      }
    });
  
    if (foodCollision) {
      foodCoords = generateFoodCoordinates();
      food.x = foodCoords.x;
      food.y = foodCoords.y;
      score++;
      tailLength++;
    }
  };

  const generateRandomCoordinates = () => {
    return {
      x: Math.floor(Math.random() * cellCount),
      y: Math.floor(Math.random() * cellCount),
    };
  };
  
  const isFoodOnObstacle = (foodCoords) => {
const obstacles = [obstacle, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9, obstacle10, obstacle11, obstacle12, obstacle13, obstacle14, obstacle15, obstacle16, obstacle17, obstacle18, obstacle19, obstacle20, obstacle21, obstacle22, obstacle23, obstacle24, obstacle25, obstacle26, obstacle27, obstacle28, obstacle29, obstacle30, obstacle31, obstacle32, obstacle33, obstacle34, obstacle35, obstacle36, obstacle37, obstacle38, obstacle39, obstacle40, obstacle41, obstacle42, obstacle43, obstacle44, obstacle45, obstacle46, obstacle47, obstacle48, obstacle49, obstacle50, obstacle51, obstacle52, obstacle53, obstacle54, obstacle55, obstacle56, obstacle57, obstacle58, obstacle59, obstacle60, obstacle61, obstacle62, obstacle63, obstacle64, obstacle65, obstacle66, obstacle67, obstacle68, obstacle69, obstacle70, obstacle71, obstacle72, obstacle73, obstacle74, obstacle75, obstacle76, obstacle77, obstacle78, obstacle79, obstacle80, obstacle81, obstacle82, obstacle83, obstacle84, obstacle85, obstacle86, obstacle87, obstacle88, obstacle89, obstacle90, obstacle91, obstacle92, obstacle93, obstacle94, obstacle95, obstacle96, obstacle97, obstacle98, obstacle99, obstacle100, obstacle101, obstacle102, obstacle103, obstacle104, obstacle105, obstacle106, obstacle107, obstacle108, obstacle109, obstacle110, obstacle111, obstacle112, obstacle113, obstacle114, obstacle115, obstacle116, obstacle117, obstacle118, obstacle119, obstacle120, obstacle121, obstacle122, obstacle123, obstacle124, obstacle125, obstacle126, obstacle127, obstacle128, obstacle129, obstacle130, obstacle131, obstacle132, obstacle133, obstacle134, obstacle135, obstacle136, obstacle137, obstacle138, obstacle139, obstacle140, obstacle141, obstacle142, obstacle143, obstacle144, obstacle145, obstacle146, obstacle147, obstacle148, obstacle149, obstacle150, obstacle151, obstacle152, obstacle153, obstacle154, obstacle155, obstacle156, obstacle157, obstacle158, obstacle159, obstacle160, obstacle161, obstacle162, obstacle163, obstacle164, obstacle165, obstacle166, obstacle167, obstacle168, obstacle169, obstacle170, obstacle171, obstacle172, obstacle173, obstacle174, obstacle175, obstacle176, obstacle177, obstacle178, obstacle179, obstacle180, obstacle181, obstacle182, obstacle183, obstacle184, obstacle185, obstacle186, obstacle187, obstacle188, obstacle189, obstacle190, obstacle191, obstacle192, obstacle193, obstacle194, obstacle195, obstacle196, obstacle197, obstacle198, obstacle199, obstacle200, obstacle201, obstacle202, obstacle203, obstacle204, obstacle205, obstacle206, obstacle207, obstacle208, obstacle209, obstacle210, obstacle211, obstacle212, obstacle213, obstacle214, obstacle215, obstacle216, obstacle217, obstacle218, obstacle219, obstacle220, obstacle221, obstacle222, obstacle223, obstacle224, obstacle225, obstacle226, obstacle227, obstacle228, obstacle229, obstacle230, obstacle231, obstacle232, obstacle233, obstacle234, obstacle235, obstacle236];
  
    for (const obs of obstacles) {
      if (foodCoords.x === obs.x && foodCoords.y === obs.y) {
        return true;
      }
    }
  
    return false;
  };

  const generateFoodCoordinates = () => {
    let foodCoords = generateRandomCoordinates();
  
    // Check if the food is on an obstacle, regenerate until it's not
    while (isFoodOnObstacle(foodCoords)) {
      foodCoords = generateRandomCoordinates();
    }
  
    return foodCoords;
  };

  const isGameOver = () => {
    let gameOver = false;


    snakeParts.forEach((part) => {
      if (part.x == head.x && part.y == head.y) {
        gameOver = true;
      }
    });

    if (
      head.x < 0 ||
      head.y < 0 ||
      head.x > cellCount - 1 ||
      head.y > cellCount - 1
    ) {
      gameOver = true;
    }

    return gameOver;
  };

  const showGameOver = () => {
    const text = document.createElement("div");
    text.setAttribute("id", "game_over");
    if (username = localStorage.getItem("userName")) {
      text.innerHTML = "Game over, </br>" + username + "!";

  } else {
      text.innerHTML = "Game over!";
  }
    const body = document.querySelector("body");
    body.appendChild(text);
  // this will check if the game has run
    console.log(hasRun);
    console.log(score);

    if (score > 4 && !hasRun) {
      setTimeout(() => {
        var name = prompt('Herzlichen Glückwunsch, du hast es ins Leaderboard geschafft! Bitte gib hier deinen Namen ein:');
        
         // Speichern des Namens im LocalStorage
         localStorage.setItem('userName', name);

        // Do something with the entered name, e.g., display it
        alert('Klicke auf Bestenliste anzeigen, um zu sehen, wie sich ' + name + ' im Vergleich zu anderen Spielern positioniert!');
        
        // Set hasRun to true to ensure the code doesn't run again
        hasRun = true;

        // Save the updated value to local storage
        localStorage.setItem('hasRun', JSON.stringify(hasRun));
        ScoreEintrag();
        updateScore();
        location.reload();
      }, 1000); // 1000 milliseconds = 1 second
    }
    

    if (score >= localStorage.getItem("highScore") && localStorage.getItem("userName")) {
      setTimeout(() => {
        alert('Gratuliere ' + localStorage.getItem("userName") + ', du hast deinen Highscore geknackt! Die Bestenliste wurde angepasst.');
        updateScore();
        location.reload();
      }, 1000); // 1000 milliseconds = 1 second
    }

    if (score <= 4 && !hasRun) {
      setTimeout(() => {
        alert('Versuche es erneut! Um auf das Leaderboard zu gelangen, musst du mindestens 5 Punkte erzielen.');
        location.reload();
      }, 1000); // 1000 milliseconds = 1 second
    }

    if (score <= localStorage.getItem("highScore") && localStorage.getItem("userName")) {
      setTimeout(() => {
        alert('Versuche es erneut, um dein Highscore zu knacken!');
        location.reload();
      }, 1000); // 1000 milliseconds = 1 second
    }

  };



  addEventListener("keydown", changeDir);

  const PlayButton = (show) => {
    if (!show) {
      playEl.style.display = "none";
    } else {
      playEl.style.display = "block";
    }
  };

  const pauseGame = () => {
    gameActive = false;
    if(!gameActive) {
      pauseEl.removeAttribute('class');
      pauseEl.setAttribute('class', 'pause-not-active')
    }
    if (!isGameOver()) PlayButton(true);
  };

  pauseEl.addEventListener("click", pauseGame);

  let showGrid = false;

  // this will initiate all
  const animate = () => {
    setCanvas();
    if (showGrid) drawGrid();
    drawSnake();
    food.draw();
    obstacle.draw();
    obstacle2.draw();
    obstacle3.draw();
    obstacle4.draw();
    obstacle5.draw();
    obstacle6.draw();
    obstacle7.draw();
    obstacle8.draw();
    obstacle9.draw();
    obstacle10.draw();
    obstacle11.draw();
    obstacle12.draw();
    obstacle13.draw();
    obstacle14.draw();
    obstacle15.draw();
    obstacle16.draw();
    obstacle17.draw();
    obstacle18.draw();
    obstacle19.draw();
    obstacle20.draw();
    obstacle21.draw();
    obstacle22.draw();
    obstacle23.draw();
    obstacle24.draw();
    obstacle25.draw();
    obstacle26.draw();
    obstacle27.draw();
    obstacle28.draw();
    obstacle29.draw();
    obstacle30.draw();
    obstacle31.draw();
    obstacle32.draw();
    obstacle33.draw();
    obstacle34.draw();
    obstacle35.draw();
    obstacle36.draw();
    obstacle37.draw();
    obstacle38.draw();
    obstacle39.draw();
    obstacle40.draw();
    obstacle41.draw();
    obstacle42.draw();
    obstacle43.draw();
    obstacle44.draw();
    obstacle45.draw();
    obstacle46.draw();
    obstacle47.draw();
    obstacle48.draw();
    obstacle49.draw();
    obstacle50.draw();
    obstacle51.draw();
    obstacle52.draw();
    obstacle53.draw();
    obstacle54.draw();
    obstacle55.draw();
    obstacle56.draw();
    obstacle57.draw();
    obstacle58.draw();
    obstacle59.draw();
    obstacle60.draw();
    obstacle61.draw();
    obstacle62.draw();
    obstacle63.draw();
    obstacle64.draw();
    obstacle65.draw();
    obstacle66.draw();
    obstacle67.draw();
    obstacle68.draw();
    obstacle69.draw();
    obstacle70.draw();
    obstacle71.draw();
    obstacle72.draw();
    obstacle73.draw();
    obstacle74.draw();
    obstacle75.draw();
    obstacle76.draw();
    obstacle77.draw();
    obstacle78.draw();
    obstacle79.draw();
    obstacle80.draw();
    obstacle81.draw();
    obstacle82.draw();
    obstacle83.draw();
    obstacle84.draw();
    obstacle85.draw();
    obstacle86.draw();
    obstacle87.draw();
    obstacle88.draw();
    obstacle89.draw();
    obstacle90.draw();
    obstacle91.draw();
    obstacle92.draw();
    obstacle93.draw();
    obstacle94.draw();
    obstacle95.draw();
    obstacle96.draw();
    obstacle97.draw();
    obstacle98.draw();
    obstacle99.draw();
    obstacle100.draw();
    obstacle101.draw();
    obstacle102.draw();
    obstacle103.draw();
    obstacle104.draw();
    obstacle105.draw();
    obstacle106.draw();
    obstacle107.draw();
    obstacle108.draw();
    obstacle109.draw();
    obstacle110.draw();
    obstacle111.draw();
    obstacle112.draw();
    obstacle113.draw();
    obstacle114.draw();
    obstacle115.draw();
    obstacle116.draw();
    obstacle117.draw();
    obstacle118.draw();
    obstacle119.draw();
    obstacle120.draw();
    obstacle121.draw();
    obstacle122.draw();
    obstacle123.draw();
    obstacle124.draw();
    obstacle125.draw();
    obstacle126.draw();
    obstacle127.draw();
    obstacle128.draw();
    obstacle129.draw();
    obstacle130.draw();
    obstacle131.draw();
    obstacle132.draw();
    obstacle133.draw();
    obstacle134.draw();
    obstacle135.draw();
    obstacle136.draw();
    obstacle137.draw();
    obstacle138.draw();
    obstacle139.draw();
    obstacle140.draw();
    obstacle141.draw();
    obstacle142.draw();
    obstacle143.draw();
    obstacle144.draw();
    obstacle145.draw();
    obstacle146.draw();
    obstacle147.draw();
    obstacle148.draw();
    obstacle149.draw();
    obstacle150.draw();
    obstacle151.draw();
    obstacle152.draw();
    obstacle153.draw();
    obstacle154.draw();
    obstacle155.draw();
    obstacle156.draw();
    obstacle157.draw();
    obstacle158.draw();
    obstacle159.draw();
    obstacle160.draw();
    obstacle161.draw();
    obstacle162.draw();
    obstacle163.draw();
    obstacle164.draw();
    obstacle165.draw();
    obstacle166.draw();
    obstacle167.draw();
    obstacle168.draw();
    obstacle169.draw();
    obstacle170.draw();
    obstacle171.draw();
    obstacle172.draw();
    obstacle173.draw();
    obstacle174.draw();
    obstacle175.draw();
    obstacle176.draw();
    obstacle177.draw();
    obstacle178.draw();
    obstacle179.draw();
    obstacle180.draw();
    obstacle181.draw();
    obstacle182.draw();
    obstacle183.draw();
    obstacle184.draw();
    obstacle185.draw();
    obstacle186.draw();
    obstacle187.draw();
    obstacle188.draw();
    obstacle189.draw();
    obstacle190.draw();
    obstacle191.draw();
    obstacle192.draw();
    obstacle193.draw();
    obstacle194.draw();
    obstacle195.draw();
    obstacle196.draw();
    obstacle197.draw();
    obstacle198.draw();
    obstacle199.draw();
    obstacle200.draw();
    obstacle201.draw();
    obstacle202.draw();
    obstacle203.draw();
    obstacle204.draw();
    obstacle205.draw();
    obstacle206.draw();
    obstacle207.draw();
    obstacle208.draw();
    obstacle209.draw();
    obstacle210.draw();
    obstacle211.draw();
    obstacle212.draw();
    obstacle213.draw();
    obstacle214.draw();
    obstacle215.draw();
    obstacle216.draw();
    obstacle217.draw();
    obstacle218.draw();
    obstacle219.draw();
    obstacle220.draw();
    obstacle221.draw();
    obstacle222.draw();
    obstacle223.draw();
    obstacle224.draw();
    obstacle225.draw();
    obstacle226.draw();
    obstacle227.draw();
    obstacle228.draw();
    obstacle229.draw();
    obstacle230.draw();
    obstacle231.draw();
    obstacle232.draw();
    obstacle233.draw();
    obstacle234.draw();
    obstacle235.draw();
    obstacle236.draw();

    if (gameActive) {
      PlayButton(false);
      pauseEl.removeAttribute('class');
      pauseEl.setAttribute('class','pause-active');
      updateSnakePosition();

      if (isCollisionWithObstacle()) {
        showGameOver();
        PlayButton(false);
        return;
      }
  
      if (isGameOver()) {
        showGameOver();
        PlayButton(false);
        return;
      }
    }
    setScore();
    foodCollision();
    setTimeout(animate, 1500 / frameRate);
  };
  
  const isCollisionWithObstacle = () => {
    return (
      head.x === obstacle.x && head.y === obstacle.y ||
      head.x === obstacle2.x && head.y === obstacle2.y ||
      head.x === obstacle3.x && head.y === obstacle3.y ||
      head.x === obstacle4.x && head.y === obstacle4.y ||
      head.x === obstacle5.x && head.y === obstacle5.y ||
      head.x === obstacle6.x && head.y === obstacle6.y ||
      head.x === obstacle7.x && head.y === obstacle7.y ||
      head.x === obstacle8.x && head.y === obstacle8.y ||
      head.x === obstacle9.x && head.y === obstacle9.y ||
      head.x === obstacle10.x && head.y === obstacle10.y ||
      head.x === obstacle11.x && head.y === obstacle11.y ||
      head.x === obstacle12.x && head.y === obstacle12.y ||
      head.x === obstacle13.x && head.y === obstacle13.y ||
      head.x === obstacle14.x && head.y === obstacle14.y ||
      head.x === obstacle15.x && head.y === obstacle15.y ||
      head.x === obstacle16.x && head.y === obstacle16.y ||
      head.x === obstacle17.x && head.y === obstacle17.y ||
      head.x === obstacle18.x && head.y === obstacle18.y ||
      head.x === obstacle19.x && head.y === obstacle19.y ||
      head.x === obstacle20.x && head.y === obstacle20.y ||
      head.x === obstacle21.x && head.y === obstacle21.y ||
      head.x === obstacle22.x && head.y === obstacle22.y ||
      head.x === obstacle23.x && head.y === obstacle23.y ||
      head.x === obstacle24.x && head.y === obstacle24.y ||
      head.x === obstacle25.x && head.y === obstacle25.y ||
      head.x === obstacle26.x && head.y === obstacle26.y ||
      head.x === obstacle27.x && head.y === obstacle27.y ||
      head.x === obstacle28.x && head.y === obstacle28.y ||
      head.x === obstacle29.x && head.y === obstacle29.y ||
      head.x === obstacle30.x && head.y === obstacle30.y ||
      head.x === obstacle31.x && head.y === obstacle31.y ||
      head.x === obstacle32.x && head.y === obstacle32.y ||
      head.x === obstacle33.x && head.y === obstacle33.y ||
      head.x === obstacle34.x && head.y === obstacle34.y ||
      head.x === obstacle35.x && head.y === obstacle35.y ||
      head.x === obstacle36.x && head.y === obstacle36.y ||
      head.x === obstacle37.x && head.y === obstacle37.y ||
      head.x === obstacle38.x && head.y === obstacle38.y ||
      head.x === obstacle39.x && head.y === obstacle39.y ||
      head.x === obstacle40.x && head.y === obstacle40.y ||
      head.x === obstacle41.x && head.y === obstacle41.y ||
      head.x === obstacle42.x && head.y === obstacle42.y ||
      head.x === obstacle43.x && head.y === obstacle43.y ||
      head.x === obstacle44.x && head.y === obstacle44.y ||
      head.x === obstacle45.x && head.y === obstacle45.y ||
      head.x === obstacle46.x && head.y === obstacle46.y ||
      head.x === obstacle47.x && head.y === obstacle47.y ||
      head.x === obstacle48.x && head.y === obstacle48.y ||
      head.x === obstacle49.x && head.y === obstacle49.y ||
      head.x === obstacle50.x && head.y === obstacle50.y ||
      head.x === obstacle51.x && head.y === obstacle51.y ||
      head.x === obstacle52.x && head.y === obstacle52.y ||
      head.x === obstacle53.x && head.y === obstacle53.y ||
      head.x === obstacle54.x && head.y === obstacle54.y ||
      head.x === obstacle55.x && head.y === obstacle55.y ||
      head.x === obstacle56.x && head.y === obstacle56.y ||
      head.x === obstacle57.x && head.y === obstacle57.y ||
      head.x === obstacle58.x && head.y === obstacle58.y ||
      head.x === obstacle59.x && head.y === obstacle59.y ||
      head.x === obstacle60.x && head.y === obstacle60.y ||
      head.x === obstacle61.x && head.y === obstacle61.y ||
      head.x === obstacle62.x && head.y === obstacle62.y ||
      head.x === obstacle63.x && head.y === obstacle63.y ||
      head.x === obstacle64.x && head.y === obstacle64.y ||
      head.x === obstacle65.x && head.y === obstacle65.y ||
      head.x === obstacle66.x && head.y === obstacle66.y ||
      head.x === obstacle67.x && head.y === obstacle67.y ||
      head.x === obstacle68.x && head.y === obstacle68.y ||
      head.x === obstacle69.x && head.y === obstacle69.y ||
      head.x === obstacle70.x && head.y === obstacle70.y ||
      head.x === obstacle71.x && head.y === obstacle71.y ||
      head.x === obstacle72.x && head.y === obstacle72.y ||
      head.x === obstacle73.x && head.y === obstacle73.y ||
      head.x === obstacle74.x && head.y === obstacle74.y ||
      head.x === obstacle75.x && head.y === obstacle75.y ||
      head.x === obstacle76.x && head.y === obstacle76.y ||
      head.x === obstacle77.x && head.y === obstacle77.y ||
      head.x === obstacle78.x && head.y === obstacle78.y ||
      head.x === obstacle79.x && head.y === obstacle79.y ||
      head.x === obstacle80.x && head.y === obstacle80.y ||
      head.x === obstacle81.x && head.y === obstacle81.y ||
      head.x === obstacle82.x && head.y === obstacle82.y ||
      head.x === obstacle83.x && head.y === obstacle83.y ||
      head.x === obstacle84.x && head.y === obstacle84.y ||
      head.x === obstacle85.x && head.y === obstacle85.y ||
      head.x === obstacle86.x && head.y === obstacle86.y ||
      head.x === obstacle87.x && head.y === obstacle87.y ||
      head.x === obstacle88.x && head.y === obstacle88.y ||
      head.x === obstacle89.x && head.y === obstacle89.y ||
      head.x === obstacle90.x && head.y === obstacle90.y ||
      head.x === obstacle91.x && head.y === obstacle91.y ||
      head.x === obstacle92.x && head.y === obstacle92.y ||
      head.x === obstacle93.x && head.y === obstacle93.y ||
      head.x === obstacle94.x && head.y === obstacle94.y ||
      head.x === obstacle95.x && head.y === obstacle95.y ||
      head.x === obstacle96.x && head.y === obstacle96.y ||
      head.x === obstacle97.x && head.y === obstacle97.y ||
      head.x === obstacle98.x && head.y === obstacle98.y ||
      head.x === obstacle99.x && head.y === obstacle99.y ||
      head.x === obstacle100.x && head.y === obstacle100.y ||
      head.x === obstacle101.x && head.y === obstacle101.y ||
      head.x === obstacle102.x && head.y === obstacle102.y ||
      head.x === obstacle103.x && head.y === obstacle103.y ||
      head.x === obstacle104.x && head.y === obstacle104.y ||
      head.x === obstacle105.x && head.y === obstacle105.y ||
      head.x === obstacle106.x && head.y === obstacle106.y ||
      head.x === obstacle107.x && head.y === obstacle107.y ||
      head.x === obstacle108.x && head.y === obstacle108.y ||
      head.x === obstacle109.x && head.y === obstacle109.y ||
      head.x === obstacle110.x && head.y === obstacle110.y ||
      head.x === obstacle111.x && head.y === obstacle111.y ||
      head.x === obstacle112.x && head.y === obstacle112.y ||
      head.x === obstacle113.x && head.y === obstacle113.y ||
      head.x === obstacle114.x && head.y === obstacle114.y ||
      head.x === obstacle115.x && head.y === obstacle115.y ||
      head.x === obstacle116.x && head.y === obstacle116.y ||
      head.x === obstacle117.x && head.y === obstacle117.y ||
      head.x === obstacle118.x && head.y === obstacle118.y ||
      head.x === obstacle119.x && head.y === obstacle119.y ||
      head.x === obstacle120.x && head.y === obstacle120.y ||
      head.x === obstacle121.x && head.y === obstacle121.y ||
      head.x === obstacle122.x && head.y === obstacle122.y ||
      head.x === obstacle123.x && head.y === obstacle123.y ||
      head.x === obstacle124.x && head.y === obstacle124.y ||
      head.x === obstacle125.x && head.y === obstacle125.y ||
      head.x === obstacle126.x && head.y === obstacle126.y ||
      head.x === obstacle127.x && head.y === obstacle127.y ||
      head.x === obstacle128.x && head.y === obstacle128.y ||
      head.x === obstacle129.x && head.y === obstacle129.y ||
      head.x === obstacle130.x && head.y === obstacle130.y ||
      head.x === obstacle131.x && head.y === obstacle131.y ||
      head.x === obstacle132.x && head.y === obstacle132.y ||
      head.x === obstacle133.x && head.y === obstacle133.y ||
      head.x === obstacle134.x && head.y === obstacle134.y ||
      head.x === obstacle135.x && head.y === obstacle135.y ||
      head.x === obstacle136.x && head.y === obstacle136.y ||
      head.x === obstacle137.x && head.y === obstacle137.y ||
      head.x === obstacle138.x && head.y === obstacle138.y ||
      head.x === obstacle139.x && head.y === obstacle139.y ||
      head.x === obstacle140.x && head.y === obstacle140.y ||
      head.x === obstacle141.x && head.y === obstacle141.y ||
      head.x === obstacle142.x && head.y === obstacle142.y ||
      head.x === obstacle143.x && head.y === obstacle143.y ||
      head.x === obstacle144.x && head.y === obstacle144.y ||
      head.x === obstacle145.x && head.y === obstacle145.y ||
      head.x === obstacle146.x && head.y === obstacle146.y ||
      head.x === obstacle147.x && head.y === obstacle147.y ||
      head.x === obstacle148.x && head.y === obstacle148.y ||
      head.x === obstacle149.x && head.y === obstacle149.y ||
      head.x === obstacle150.x && head.y === obstacle150.y ||
      head.x === obstacle151.x && head.y === obstacle151.y ||
      head.x === obstacle152.x && head.y === obstacle152.y ||
      head.x === obstacle153.x && head.y === obstacle153.y ||
      head.x === obstacle154.x && head.y === obstacle154.y ||
      head.x === obstacle155.x && head.y === obstacle155.y ||
      head.x === obstacle156.x && head.y === obstacle156.y ||
      head.x === obstacle157.x && head.y === obstacle157.y ||
      head.x === obstacle158.x && head.y === obstacle158.y ||
      head.x === obstacle159.x && head.y === obstacle159.y ||
      head.x === obstacle160.x && head.y === obstacle160.y ||
      head.x === obstacle161.x && head.y === obstacle161.y ||
      head.x === obstacle162.x && head.y === obstacle162.y ||
      head.x === obstacle163.x && head.y === obstacle163.y ||
      head.x === obstacle164.x && head.y === obstacle164.y ||
      head.x === obstacle165.x && head.y === obstacle165.y ||
      head.x === obstacle166.x && head.y === obstacle166.y ||
      head.x === obstacle167.x && head.y === obstacle167.y ||
      head.x === obstacle168.x && head.y === obstacle168.y ||
      head.x === obstacle169.x && head.y === obstacle169.y ||
      head.x === obstacle170.x && head.y === obstacle170.y ||
      head.x === obstacle171.x && head.y === obstacle171.y ||
      head.x === obstacle172.x && head.y === obstacle172.y ||
      head.x === obstacle173.x && head.y === obstacle173.y ||
      head.x === obstacle174.x && head.y === obstacle174.y ||
      head.x === obstacle175.x && head.y === obstacle175.y ||
      head.x === obstacle176.x && head.y === obstacle176.y ||
      head.x === obstacle177.x && head.y === obstacle177.y ||
      head.x === obstacle178.x && head.y === obstacle178.y ||
      head.x === obstacle179.x && head.y === obstacle179.y ||
      head.x === obstacle180.x && head.y === obstacle180.y ||
      head.x === obstacle181.x && head.y === obstacle181.y ||
      head.x === obstacle182.x && head.y === obstacle182.y ||
      head.x === obstacle183.x && head.y === obstacle183.y ||
      head.x === obstacle184.x && head.y === obstacle184.y ||
      head.x === obstacle185.x && head.y === obstacle185.y ||
      head.x === obstacle186.x && head.y === obstacle186.y ||
      head.x === obstacle187.x && head.y === obstacle187.y ||
      head.x === obstacle188.x && head.y === obstacle188.y ||
      head.x === obstacle189.x && head.y === obstacle189.y ||
      head.x === obstacle190.x && head.y === obstacle190.y ||
      head.x === obstacle191.x && head.y === obstacle191.y ||
      head.x === obstacle192.x && head.y === obstacle192.y ||
      head.x === obstacle193.x && head.y === obstacle193.y ||
      head.x === obstacle194.x && head.y === obstacle194.y ||
      head.x === obstacle195.x && head.y === obstacle195.y ||
      head.x === obstacle196.x && head.y === obstacle196.y ||
      head.x === obstacle197.x && head.y === obstacle197.y ||
      head.x === obstacle198.x && head.y === obstacle198.y ||
      head.x === obstacle199.x && head.y === obstacle199.y ||
      head.x === obstacle200.x && head.y === obstacle200.y ||
      head.x === obstacle201.x && head.y === obstacle201.y ||
      head.x === obstacle202.x && head.y === obstacle202.y ||
      head.x === obstacle203.x && head.y === obstacle203.y ||
      head.x === obstacle204.x && head.y === obstacle204.y ||
      head.x === obstacle205.x && head.y === obstacle205.y ||
      head.x === obstacle206.x && head.y === obstacle206.y ||
      head.x === obstacle207.x && head.y === obstacle207.y ||
      head.x === obstacle208.x && head.y === obstacle208.y ||
      head.x === obstacle209.x && head.y === obstacle209.y ||
      head.x === obstacle210.x && head.y === obstacle210.y ||
      head.x === obstacle211.x && head.y === obstacle211.y ||
      head.x === obstacle212.x && head.y === obstacle212.y ||
      head.x === obstacle213.x && head.y === obstacle213.y ||
      head.x === obstacle214.x && head.y === obstacle214.y ||
      head.x === obstacle215.x && head.y === obstacle215.y ||
      head.x === obstacle216.x && head.y === obstacle216.y ||
      head.x === obstacle217.x && head.y === obstacle217.y ||
      head.x === obstacle218.x && head.y === obstacle218.y ||
      head.x === obstacle219.x && head.y === obstacle219.y ||
      head.x === obstacle220.x && head.y === obstacle220.y ||
      head.x === obstacle221.x && head.y === obstacle221.y ||
      head.x === obstacle222.x && head.y === obstacle222.y ||
      head.x === obstacle223.x && head.y === obstacle223.y ||
      head.x === obstacle224.x && head.y === obstacle224.y ||
      head.x === obstacle225.x && head.y === obstacle225.y ||
      head.x === obstacle226.x && head.y === obstacle226.y ||
      head.x === obstacle227.x && head.y === obstacle227.y ||
      head.x === obstacle228.x && head.y === obstacle228.y ||
      head.x === obstacle229.x && head.y === obstacle229.y ||
      head.x === obstacle230.x && head.y === obstacle230.y ||
      head.x === obstacle231.x && head.y === obstacle231.y ||
      head.x === obstacle232.x && head.y === obstacle232.y ||
      head.x === obstacle233.x && head.y === obstacle233.y ||
      head.x === obstacle234.x && head.y === obstacle234.y ||
      head.x === obstacle235.x && head.y === obstacle235.y ||
      head.x === obstacle236.x && head.y === obstacle236.y

    );
  };
  
  const resetGame = () => {
    location.reload();
  };

  resetEl.addEventListener("click", resetGame);

  const toggleGrid = () => {
    if (!showGrid) {
      showGrid = true;
      showGridEl.innerHTML = `Raster entfernen `
      return;
    }
    showGrid = false;
    showGridEl.innerHTML=`Raster anzeigen`
  };

  showGridEl.addEventListener("click", toggleGrid);
  animate();
})();

console.log(localStorage.getItem("highScore"));


function ScoreEintrag() {

let username = localStorage.getItem("userName");
let highscore = localStorage.getItem("highScore");

console.log(username + " " + highscore);

  let formData = new FormData();
  formData.append('username', username);
  formData.append('score', highscore);

  fetch("https://372401-14.web.fhgr.ch/php/newScore.php",
      {
          body: formData,
          method: "post",
      })

      .then((response) => {

          return response.text();

      })
      .then((data) => {
          console.log(data);
          // document.querySelector('#nachricht').innerHTML = data;

      })

}


function updateScore() {

  let username = localStorage.getItem("userName");
  let highscore = localStorage.getItem("highScore");
  
  let formData = new FormData();
  formData.append('username', username);
  formData.append('score', highscore);

  fetch("https://372401-14.web.fhgr.ch/php/updateScore.php",
      {
          body: formData,
          method: "post",
          headers: {
          }
        })
        .then((res) => {
            // Handle the response if needed
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function holeScores() {
  
  let formData = new FormData();

  fetch("https://372401-14.web.fhgr.ch/php/holeScores.php",
      {
          body: formData,
          method: "post",
          headers: {
          }
        })
.then((res) => {
    console.log("Scores wurden geladen.");
    console.log("Response Headers:", res.headers);

    return res.json();
})
.then((json) => {
    console.log("JSON Data:", json);
    scoresAnzeigen(json); // Pass the JSON data to scoresAnzeigen

})
.catch((error) => {
    console.error('Error:', error);
});
}





var displayedRows = 10; // Initial number of rows to display

function scoresAnzeigen(jsonData) {
  document.getElementById("liste-leaderboard").innerHTML = "";
  // Create a container div with fixed height and scroll
  var containerDiv = document.createElement("div");
  containerDiv.style.height = "500px";
  containerDiv.style.overflowY = "scroll";

  // Create a table element
  var table = document.createElement("table");

  // Create table header
  var thead = table.createTHead();
  var headerRow = thead.insertRow();
  var headers = ["Rang", "Name", "Score"];

  for (var i = 0; i < headers.length; i++) {
    var th = document.createElement("th");
    th.textContent = headers[i];
    headerRow.appendChild(th);
  }

  // Create table body and populate it with data
  var tbody = table.createTBody();

  // Determine the number of rows to display
  var rowsToDisplay = Math.min(displayedRows, jsonData.length);

  for (var i = 0; i < rowsToDisplay; i++) {
    var row = tbody.insertRow();
    var cell0 = row.insertCell(0); // Rank column
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);

    cell0.textContent = i + 1; // Rank starts from 1
    cell1.textContent = jsonData[i].username;
    cell2.textContent = jsonData[i].score;
  }

  // Append the table to the container div
  containerDiv.appendChild(table);

  // Add a button to load more rows
  var loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "Load More";
  loadMoreButton.addEventListener("click", function () {
    displayedRows += 5; // Increase the number of rows to display by 5
    // Remove the existing container div and reload with updated data
    document.getElementById("liste-leaderboard").innerHTML = "";
    scoresAnzeigen(jsonData);
  });

  // Append the "Load More" button
  containerDiv.appendChild(loadMoreButton);

  // Style the "Load More" button
  loadMoreButton.style.display = "block";
  loadMoreButton.style.margin = "auto";
  loadMoreButton.style.marginTop = "15px";

  // Append the container div to the div with id "liste-leaderboard"
  document.getElementById("liste-leaderboard").appendChild(containerDiv);
}



// Leaderboard anzeigen
document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('show-leaderboard');
  var leaderboard = document.querySelector('.leaderboard');
  var canvas = document.getElementById('canvas');
  var play = document.getElementById('play');


  button.addEventListener('click', function () {
      // Toggle the visibility of the leaderboard
      if (leaderboard.style.display === 'none') {
          leaderboard.style.display = 'block';
          button.innerHTML = 'Bestenliste ausblenden';
          canvas.style.display = 'none'; 
          play.style.display = 'none';
          holeScores();

      } else {
          leaderboard.style.display = 'none';
          button.innerHTML = 'Bestenliste anzeigen';
          canvas.style.display = 'block';
          play.style.display = 'block';

      }
  });
  
});

document.addEventListener('DOMContentLoaded', function() {
  var titleSnake = document.querySelector('.title-snake');

  titleSnake.addEventListener('click', function() {
    history.back();
  });
});



