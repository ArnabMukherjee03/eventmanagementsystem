import axios from "axios";

export function signup(signupData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/auth/signup",signupData);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function login(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post("/auth/login",loginData);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get("/auth/check");
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}



export function verifyUser(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const tokenData = {token: token}
      const response = await axios.post("/auth/verifyuser",tokenData);
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function logOut() {
  return new Promise(async (resolve, reject) => {
    try {

      const response = await axios.get("/auth/logout");
      const data = await response.data;
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

