import Dexie from "dexie";

const db = new Dexie("MyDatabase");
db.version(1).stores({ scores: "++id, name, time" });

// Yeni bir skor eklemek için fonksiyon
export const addScore = (name, time) => {
  db.scores.add({ name, time });
};

export const getAllScores = () => {
  return db.scores
    .orderBy("time")
    .toArray()
    .then((scores) => {
      const formattedScores = scores.map((score) => {
        const { minutes, seconds } = getMinutesAndSecondsFromTimeString(
          score.time
        );
        const formattedTime = `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`;
        return { ...score, time: formattedTime };
      });

      return formattedScores;
    });
};
// kişi bulmak için name parametresi ile arama yapar ve ilk bulduğu kişiyi döndürür
export const getScoreByName = (name) => {
  return db.scores
    .where("name")
    .equals(name)
    .first()
    .then((score) => {
      return score;
    });
};

const getMinutesAndSecondsFromTimeString = (timeString) => {
  if (typeof timeString !== "string" || !timeString.includes(":")) {
    return { minutes: 0, seconds: 0 };
  }

  const [minutesStr, secondsStr] = timeString.split(":");
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsStr, 10);
  return { minutes, seconds };
};
