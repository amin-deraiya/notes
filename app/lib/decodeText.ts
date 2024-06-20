export const encode = (text: string) => {
  try {
    return btoa(btoa(btoa(btoa(btoa(btoa(btoa(text?.trim()?.toString())))))));
  } catch (error) {
    return text;
  }
};

export const decode = (text: string) => {
  try {
    return atob(atob(atob(atob(atob(atob(atob(text?.trim()?.toString())))))));
  } catch (error) {
    return text;
  }
};
