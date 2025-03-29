const randomizer = (num: number) => {
  const rngResult = Math.floor(Math.random() * num) + 1;
  return rngResult;
};

export default randomizer;