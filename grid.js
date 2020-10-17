  
const GRID_SIZE = 21

// CSS Grid 第一個位置從1開始(非從0)

// FOOD的位置會隨機出現在第1格到第21個(含)之間
export function randomGridPosition() {
  return {
    // 取得1~21(含)之間的隨機整數
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1
  }
}

// 當SNAKE超出範圍(不在第1格~第21個之間)
export function outsideGrid(position) {
  return (
    position.x < 1 || position.x > GRID_SIZE ||
    position.y < 1 || position.y > GRID_SIZE
  )
}