import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = "AUTHENTICATE";
export const AUTO_LOGIN = "AUTO_LOGIN";

export const autoLogin = (mobile) => {
  return{type:AUTO_LOGIN,mobile}
}

export const authentication = (mobile) => {
    return async dispatch => {
      dispatch ({
        type: AUTHENTICATE,
        productData: {
          mobile
        }
      });
      saveData(mobile)
    }
};

export const logout = () => {
   AsyncStorage.removeItem('mobile');
   return { type: LOGOUT };
};
const saveData = async(mobile) => {
  try {
    AsyncStorage.setItem("mobile",mobile)
  } catch (error) {
    
  }
}