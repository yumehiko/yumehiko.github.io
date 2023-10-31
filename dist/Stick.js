export class Stick {
    constructor(element, factor) {
        this.element = element;
        this.factor = factor;
        // Stickをランダムに回転させる
        this.angle = Math.floor(Math.random() * 10) - 5; // -5から5度の範囲で
        // 初期のY座標を少しランダムにずらす
        // 上揃えをランダムにずらす
        const randomMarginTop = Math.floor(Math.random() * 180); // 0から180pxの範囲で。
        this.element.style.marginTop = `${randomMarginTop}px`;
        this.element.style.transform = `rotate(${this.angle}deg)`;
    }
    shift(scrolled) {
        const deltaX = Math.sin(this.angle * (Math.PI / 180)) * scrolled * this.factor; // 水平方向の移動
        const deltaY = Math.cos(this.angle * (Math.PI / 180)) * scrolled * this.factor; // 垂直方向の移動
        this.element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${this.angle}deg)`;
    }
    appendChild(child) {
        this.element.appendChild(child);
    }
}
