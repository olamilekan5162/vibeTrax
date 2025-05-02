/**
 * Gets duration of audio from URL
 * @param {string} url - Audio file URL
 * @returns {Promise<number>} - Duration in seconds
 */
export const getAudioDuration = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("No audio URL provided"));
      return;
    }

    const audio = new Audio(url);

    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });

    audio.addEventListener("error", (e) => {
      reject(new Error(`Failed to load audio: ${e.message}`));
    });

    audio.load();
  });
};

/**
 * Formats seconds into MM:SS format
 * @param {number} seconds - Duration in seconds
 * @returns {string} - Formatted duration string
 */
export const formatDuration = (seconds) => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};
