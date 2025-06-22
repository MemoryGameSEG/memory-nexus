export const playSound = (src) => {
    const sound = new Audio(src);
    sound.play();
  };
  
  export const playLoop = (src) => {
    const music = new Audio(src);
    music.loop = true;
    music.volume = 0.4;
    music.play();
    return music;
  };
  