export function convertCalToKJ(calories) {
  return (calories / 1000) * 4.184;
}

export function convertMinutesToDuration(time) {
  return time < 60 ? `${time} min` : `${time / 60} hr ${time % 60} min`;
}
