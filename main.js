let c = document.getElementById("my-canvas");
let ctx = c.getContext("2d");

let backgroundImg = document.createElement("img");

backgroundImg.onload = () => {
  ctx.drawImage(backgroundImg, 0, 0, 1400, 600);
};

backgroundImg.src = "/images/background.jpg";

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "/images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  backward: [1, 2, 3, 4, 5, 6],
  forward: [1, 2, 3, 4, 5, 6],
};

let loadImages = (callback) => {
  let images = {
    idle: [],
    kick: [],
    punch: [],
    backward: [],
    forward: [],
  };
  let imagesToLoad = 0;

  ["idle", "kick", "punch", "backward", "forward"].forEach(
    (animation) => {
      let animationFrames = frames[animation];
      imagesToLoad = imagesToLoad + animationFrames.length;

      animationFrames.forEach((frameNumber) => {
        let path = imagePath(frameNumber, animation);

        loadImage(path, (image) => {
          images[animation][frameNumber - 1] = image;
          imagesToLoad = imagesToLoad - 1;

          if (imagesToLoad == 0) {
            callback(images);
          }
        });
      });
    }
  );
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 0, 600, 600);
      ctx.drawImage(backgroundImg, 0, 0, 1400, 600);
      ctx.drawImage(image, 0, 0, 600, 600);
    }, index * 100);
  });

  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  queuedAnimation = [];

  let aux = () => {
    let selectedAnimation;

    if (queuedAnimation.length == 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimation.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };

  aux();

  document.getElementById("Kick").onclick = () => {
    queuedAnimation.push("kick");
  };

  document.getElementById("Punch").onclick = () => {
    queuedAnimation.push("punch");
  };
  document.getElementById("Backward").onclick = () => {
    queuedAnimation.push("backward");
  };

  document.getElementById("Forward").onclick = () => {
    queuedAnimation.push("forward");
  };

  document.addEventListener("keyup", (event) => {
    const key = event.key;

    if (key == "ArrowDown") {
      queuedAnimation.push("kick");
    } else if (key == "ArrowUp") {
      queuedAnimation.push("punch");
    } else if (key == "ArrowRight") {
      queuedAnimation.push("forward");
    } else if (key == "ArrowLeft") {
      queuedAnimation.push("backward");
    } 
  });
});
