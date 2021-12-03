//export const api = "https://api.avill.com.co/api/";
//export const api = "http://192.168.1.51/Webapp/app/controller/";

// export const api = "http://192.168.1.2:8000/api/";
import axios from "axios";

export default axios.create({
  baseURL: `https://api.avill.com.co/api/`,
  //baseURL: `http://192.168.1.4:8000/api/`,
});
