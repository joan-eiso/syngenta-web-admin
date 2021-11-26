export const searchByQuery = (query, data) => {
  const regex = RegExp(`^${query}`, 'i');
  let results = data.filter((item) => {
    return Object.keys(item).find((key) => regex.test(item[key]));
  }); 
  return results;
}
