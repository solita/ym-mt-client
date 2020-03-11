export const isTsv = rfo => {
  return rfo.materials !== undefined && rfo.materials.length > 0 && rfo.materials[0].useTsv;
};
