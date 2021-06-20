import SecureLS from 'secure-ls';

export const storeUserDataToLocalStorage = (key, value, encrypt) => {
  if (encrypt) {
    let encryptStorage = new SecureLS({
      encodingType: 'rabbit',
      isCompression: false,
    });
    encryptStorage.set(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getUserDataFromLocalStorage = (key, isEcnrypted) => {
  if (isEcnrypted) {
    let ls = new SecureLS({ encodingType: 'rabbit', isCompression: false });
    return ls.get(key);
  }
  return JSON.parse(localStorage.getItem(key));
};

let accessToken = "";

export const setAccessToken = (s) => {
  
  accessToken = s;
};

export const getAccessToken = () => {
  
  return accessToken;
};
