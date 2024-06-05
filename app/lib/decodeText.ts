export const encode = (text: string) => {
  try {
    return btoa(text?.trim()?.toString());
  } catch (error) {
    return text;
  }
};

export const decode = (text: string) => {
  try {
    return atob(text?.trim()?.toString());
  } catch (error) {
    return text;
  }
};
