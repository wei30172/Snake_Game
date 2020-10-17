import { getInputDirection } from './input.js'

// 決定每幾秒執行幾次(SNAKE每秒移動幾次)
export const SNAKE_SPEED = 5

// 起始位置在畫面中間
const snakeBody = [ { x: 11, y: 11} ]

// default，吃到FOOD前，SNAKE不會變長
let newSegments = 0 

export function update() {
	// SNAKE區塊加長
	addSegments() 
	
	// 取得第一個方塊的移動方向
	const inputDirection = getInputDirection()

	// 從最後一個區塊開始，每個區塊移動到前一個方塊的位置(除了第一個區塊)
  for (let i = snakeBody.length - 2; i >=0; i--) {
		snakeBody[i + 1] = { ...snakeBody[i]} 
	}

	// 根據方向決定第一個區塊的移動位置
	snakeBody[0].x += inputDirection.x
	snakeBody[0].y += inputDirection.y
	
}

export function draw(gameBoard) {
  // console.log("draw_snake")
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

// SNAKE區塊加長數量
export function expandSnake(amount) {
	newSegments += amount
}

// SNAKE觸碰到FOOD
export function onSnake(position, { ignoreHead = false } = {}) {
	// some() 測試陣列中是否有元素符合條件，回傳布林值。
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index === 0) return false
		return equalPositions(segment, position)
	})
}

export function getSnakeHead() {
  return snakeBody[0]
}

// SNAKE碰到自己(不包含碰到第一個區塊)
export function snakeIntersection() {
  	return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
	return pos1.x === pos2.x &&  pos1.y === pos2.y
}

function addSegments() {
	for (let i = 0; i < newSegments; i++)
	// Snake尾端加上區塊(加上的區塊 = 原本snakeBody陣列中最後區塊的位置)
	snakeBody.push({ ...snakeBody[snakeBody.length -1] })
	// 等同snakeBody[snakeBody.length] = { ...snakeBody[snakeBody.length -1 ]}

	// Snake尾端加上區塊的動作只會執行一次，因此加區塊執行完，newSegments歸零
	newSegments = 0
}