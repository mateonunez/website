const randomNumber = (min = 0, max = 10) => {
  return min + Math.floor(Math.random() * (max - (min - 1)));
};

const randomDirection = number => {
  const direction = Math.floor(Math.random() * 2);

  return direction === 0 ? -number : number;
};
export { randomNumber, randomDirection };
