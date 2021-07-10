// 防抖
export const debounce = (callback, time) => {
	let timeout = null
	return function() {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			callback && callback()
			timeout = null
		}, time)
	}
}
// 节流
export const throttle = (callback, time) => {
	let timeout = null
	return function() {
		if (timeout !== null) return
		timeout = setTimeout(() => {
			callback && callback()
			timeout = null
		}, time)
	}
}
