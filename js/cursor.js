const cursor = document.querySelector('.cursor');
export function onMouseMove(event) {
    cursor.style.top = (event.pageY - 10) + 'px';
    cursor.style.left = (event.pageX - 10) + 'px';
}
export function onMouseClick(event) {
    cursor.classList.add('expand');
    setTimeout(() => {
        cursor.classList.remove('expand');
    }, 500);
}