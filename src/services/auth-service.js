import { postRequestToApi } from "@/utils.js";

function loginRequest(data) {
  return postRequestToApi("http://localhost:5000/auth/login", data);
}

function registerRequest(data) {
  console.log(data);
  return postRequestToApi("http://localhost:5000/auth/register", data);
}

function forgotRequest(data) {
  return postRequestToApi("http://localhost:5000/auth/forgot", data);
}

function resetRequest(data) {
  return postRequestToApi("http://localhost:5000/auth/reset", data);
}

export { loginRequest, registerRequest, forgotRequest, resetRequest };
