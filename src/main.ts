// ページが読み込まれたら実行
window.addEventListener("DOMContentLoaded", async () => onContentLoaded());

// Stickオブジェクトを定義
import { Stick } from "./Stick.js";

// Stickの配列を定義
const sticks: Stick[] = [];


async function onContentLoaded() {
  generateSticks();
  window.addEventListener("scroll", () => onScroll());
  await displayLoadingScreenUntilImagesLoad();
}

function generateSticks() {
  const stickWrappers = document.querySelectorAll(".sticks-wrapper");

  stickWrappers.forEach(wrapper => {
    // その中にあるstickクラスエレメントを全て取得
    const stickElements = wrapper.querySelectorAll(".stick") as NodeListOf<HTMLElement>;

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

async function populateSticksWithRandomImages() {
  const imageFolder = "assets/images/";
  const imageCount = 3;
  const loadingPromises: Promise<void>[] = [];

  sticks.forEach(stick => {
    const numberOfImages = Math.floor(Math.random() * 3) + 5;

    for(let i = 0; i < numberOfImages; i++) {
      const img = document.createElement("img");
      const randomImageIndex = Math.floor(Math.random() * imageCount);
      img.src = `${imageFolder}Dummy${randomImageIndex}.png`;
      img.className = "image-item";
      img.alt = "";

      const imageLoadPromise = new Promise<void>((resolve) => {
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
}

async function displayLoadingScreenUntilImagesLoad() {
  showLoadingScreen();
  try {
    await populateSticksWithRandomImages();
  } catch (error) {
    console.error("An error occurred while loading images:", error);
  }
  hideLoadingScreen();
}

function showLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (!loadingScreen) return;
  loadingScreen.classList.remove("fade-out");  // もし fade-out クラスが残っていれば削除
  loadingScreen.style.display = "block";  // または "flex", "grid" などレイアウトに合わせて
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");
  if (!loadingScreen) return;
  loadingScreen.classList.add("fade-out");

  // アニメーションが終わるのを待つ（ここでは0.3秒後）
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 300);
}
