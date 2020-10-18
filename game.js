import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
	if (gameOver) {
		// 按ok，重新載入該頁面
		if (confirm('You lost. Press ok to restart.')) {
		  window.location = '/Snake_Game'
		}
		return
	}

	// 每隔1/60秒呼叫一次函數，並用當時的timestamp做參數傳給該函數。
	window.requestAnimationFrame(main)

	// 相差秒數
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
	
	// 調整SNAKE_SPEED，設定呼叫函式的間隔時間
	if (secondsSinceLastRender < 1 / SNAKE_SPEED) return
	// console.log("Render")

	lastRenderTime = currentTime
	// console.log(currentTime)
	// console.log(lastRenderTime)

	// 遊戲結束，重設畫面
	update() 
	// 遊戲繼續，繪製畫面
	draw() 
}

window.requestAnimationFrame(main)

function update() {
	updateSnake()
	updateFood()
	checkDeath()
}

function draw() {
	// 移除原本的SNAKE
	gameBoard.innerHTML = '' 

	// 加上移動後的SNAKE
	drawSnake(gameBoard)

	// 加上下一個隨機出現的食物
	drawFood(gameBoard)
}

// 確認遊戲是否結束
function checkDeath() {
	// SNAKE超出範圍或碰到自己
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}