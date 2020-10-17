let inputDirection = { x: 0, y: 0}
let lastInputDirection = { x: 0, y: 0}

window.addEventListener('keydown', e => {
	switch (e.key) {
		// 若原本是上下移動，則沒有作用
		case 'ArrowUp':
			if (lastInputDirection.y !== 0) break 
			inputDirection = { x: 0, y: -1 }
			break
		case 'ArrowDown':
			if (lastInputDirection.y !== 0) break
			inputDirection = { x: 0, y: 1 }
			break
		
		// 若原本是左右移動，則沒有作用
		case 'ArrowLeft':
			if (lastInputDirection.x !== 0) break
			inputDirection = { x: -1, y: 0 }
			break
		case 'ArrowRight':
			if (lastInputDirection.x !== 0) break
			inputDirection = { x: 1, y: 0 }
			break
	}
})

export function getInputDirection() {
	lastInputDirection = inputDirection
  return inputDirection
}