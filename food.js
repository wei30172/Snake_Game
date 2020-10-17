import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

// FOOD的位置會隨機出現在第1格到第21個(含)之間
let food = getRandomFoodPosition() 

// 決定每吃掉一個FOOD，SNAKE身體加長幾格
const EXPANSION_RATE = 3 

export function update() {
  // 如果SNAKE觸碰到FOOD(FOOD與SNAKE某一部分位置相同)
  if (onSnake(food)) { 
    // SNAKE區塊會加長數量
    expandSnake(EXPANSION_RATE) 

    // 取下一個隨機出現的FOOD
     food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  
  // FOOD為空值，或FOOD為SNAKE時，隨機產生新的FOOD
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}