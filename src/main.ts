// ページが読み込まれたら実行
window.addEventListener("DOMContentLoaded", async () => onContentLoaded());

let sticks: HTMLElement[];
let stickFactors: number[];

async function onContentLoaded() {
  initializeStickScroll();
  window.addEventListener("scroll", () => onScroll(sticks, stickFactors));
  await displayLoadingScreenUntilImagesLoad();
}

function initializeStickScroll() {
  sticks = Array.from(document.querySelectorAll(".stick")) as HTMLElement[];
  stickFactors = Array.from(sticks, () => Math.random() * (0.9 - 0.6) + 0.6);
}

function onScroll(sticks: HTMLElement[], stickFactors: number[]) {
  const scrolled = window.scrollY;
  
  // 各stickのスクロール位置を調整
  sticks.forEach((stick, index) => {
    const factor = stickFactors[index];
    stick.style.transform = `translateY(${scrolled * factor}px)`;
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
