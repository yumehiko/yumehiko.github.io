var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ページが読み込まれたら実行
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () { return onContentLoaded(); }));
// Stickオブジェクトを定義
import { Stick } from "./Stick.js";
// Stickの配列を定義
const sticks = [];
function onContentLoaded() {
    return __awaiter(this, void 0, void 0, function* () {
        generateSticks();
        window.addEventListener("scroll", () => onScroll());
        yield displayLoadingScreenUntilImagesLoad();
    });
}
function generateSticks() {
    const stickWrappers = document.querySelectorAll(".sticks-wrapper");
    stickWrappers.forEach(wrapper => {
        // その中にあるstickクラスエレメントを全て取得
        const stickElements = wrapper.querySelectorAll(".stick");
        stickElements.forEach(stickElement => {
            // Stickオブジェクトを生成
            const factor = Math.random() * (0.9 - 0.6) + 0.6;
            const stick = new Stick(stickElement, factor);
            // 配列に保存
            sticks.push(stick);
        });
    });
}
function onScroll() {
    const scrolled = window.scrollY;
    // Stick配列にアクセスして、スクロール処理を行う
    sticks.forEach(stick => {
        stick.shift(scrolled);
    });
}
function populateSticksWithRandomImages() {
    return __awaiter(this, void 0, void 0, function* () {
        const imageFolder = "assets/images/";
        const imageCount = 3;
        const loadingPromises = [];
        sticks.forEach(stick => {
            const numberOfImages = Math.floor(Math.random() * 3) + 5;
            for (let i = 0; i < numberOfImages; i++) {
                const img = document.createElement("img");
                const randomImageIndex = Math.floor(Math.random() * imageCount);
                img.src = `${imageFolder}Dummy${randomImageIndex}.png`;
                img.className = "image-item";
                img.alt = "";
                const imageLoadPromise = new Promise((resolve) => {
                    img.onload = () => resolve();
                    img.onerror = () => {
                        console.error("Failed to load an image");
                        resolve();
                    };
                });
                loadingPromises.push(imageLoadPromise);
                stick.appendChild(img);
            }
        });
        return Promise.all(loadingPromises);
    });
}
function displayLoadingScreenUntilImagesLoad() {
    return __awaiter(this, void 0, void 0, function* () {
        showLoadingScreen();
        try {
            yield populateSticksWithRandomImages();
        }
        catch (error) {
            console.error("An error occurred while loading images:", error);
        }
        hideLoadingScreen();
    });
}
function showLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (!loadingScreen)
        return;
    loadingScreen.classList.remove("fade-out"); // もし fade-out クラスが残っていれば削除
    loadingScreen.style.display = "block"; // または "flex", "grid" などレイアウトに合わせて
}
function hideLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    if (!loadingScreen)
        return;
    loadingScreen.classList.add("fade-out");
    // アニメーションが終わるのを待つ（ここでは0.3秒後）
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 300);
}
