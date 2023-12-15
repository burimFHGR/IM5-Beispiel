(function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // canvas size
  const canvasSize = 680;
  const w = (canvas.width = canvasSize);
  const h = (canvas.height = canvasSize);
  const canvasFillColor = "#000d36";
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
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2),
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
    y: Math.floor(cellCount / 2) - 2,
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
    y: Math.floor(cellCount / 2) - 6,
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
    y: Math.floor(cellCount / 2) - 8,
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
    x: Math.floor(cellCount / 2),
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
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 12,
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
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 14,
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
    x: Math.floor(cellCount / 2),
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
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 18,
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
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) - 20,
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
    x: Math.floor(cellCount / 2),
    y: Math.floor(cellCount / 2) + 21,
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
    y: Math.floor(cellCount / 2) + 14,
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
    x: Math.floor(cellCount / 2) + 13,
    y: Math.floor(cellCount / 2) + 15,
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
    x: Math.floor(cellCount / 2) + 15,
    y: Math.floor(cellCount / 2) + 18,
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
    x: Math.floor(cellCount / 2) + 16,
    y: Math.floor(cellCount / 2) + 18,
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
    x: Math.floor(cellCount / 2) + 17,
    y: Math.floor(cellCount / 2) + 18,
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
    x: Math.floor(cellCount / 2) + 18,
    y: Math.floor(cellCount / 2) + 18,
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
    x: Math.floor(cellCount / 2) + 18,
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
    x: Math.floor(cellCount / 2) + 18,
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
    x: Math.floor(cellCount / 2) + 18,
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
    const obstacles = [obstacle, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacle7, obstacle8, obstacle9, obstacle10, obstacle11, obstacle12, obstacle13, obstacle14, obstacle15, obstacle16, obstacle17, obstacle18, obstacle19, obstacle20, obstacle21, obstacle22, obstacle23, obstacle24, obstacle25, obstacle26, obstacle27, obstacle28, obstacle29, obstacle30, obstacle31, obstacle32, obstacle33, obstacle34, obstacle35, obstacle36, obstacle37, obstacle38, obstacle39, obstacle40, obstacle41, obstacle42, obstacle43, obstacle44, obstacle45, obstacle46, obstacle47, obstacle48, obstacle49, obstacle50, obstacle51, obstacle52, obstacle53, obstacle54, obstacle55, obstacle56, obstacle57, obstacle58, obstacle59, obstacle60, obstacle61, obstacle62, obstacle63, obstacle64, obstacle65, obstacle66, obstacle67, obstacle68, obstacle69, obstacle70, obstacle71, obstacle72, obstacle73, obstacle74, obstacle75, obstacle76, obstacle77, obstacle78, obstacle79, obstacle80, obstacle81, obstacle82, obstacle83, obstacle84, obstacle85, obstacle86, obstacle87, obstacle88, obstacle89, obstacle90, obstacle91, obstacle92, obstacle93, obstacle94, obstacle95, obstacle96, obstacle97, obstacle98, obstacle99, obstacle100];
  
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

    if (score > 1 && !hasRun) {
      setTimeout(() => {
        var name = prompt('Herzlichen Glückwunsch, du hast es ins Leaderboard geschafft! Bitte gib hier deinen Namen ein:');
        
         // Speichern des Namens im LocalStorage
         localStorage.setItem('userName', name);

        // Do something with the entered name, e.g., display it
        alert('Klicke auf Leaderboard anzeigen, um zu sehen, wie sich ' + name + ' im Vergleich zu anderen Spielern positioniert!');
        
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
        alert('Gratuliere ' + localStorage.getItem("userName") + ', du hast deinen Highscore geknackt! Das Leaderboard wurde angepasst.');
        updateScore();
        location.reload();
      }, 1000); // 1000 milliseconds = 1 second
    }

    if (score <= 2) {
      setTimeout(() => {
        alert('Versuche es erneut! Um auf das Leaderboard zu gelangen, musst du mindestens 3 Punkte erzielen.');
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
    setTimeout(animate, 1000 / frameRate);
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
      head.x === obstacle100.x && head.y === obstacle100.y

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
  var headers = ["Rank", "Username", "Score"];

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
