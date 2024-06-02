export const encode = (text: string) => {
  try {
    return btoa(encodeURIComponent(text));
  } catch (error) {
    return text;
  }
};

export const decode = (text: string) => {
  try {
    return atob(decodeURIComponent(text));
  } catch (error) {
    return text;
  }
};
