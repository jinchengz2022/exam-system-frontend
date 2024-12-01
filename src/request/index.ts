import axios from "axios";
import {
  AddExamRequest,
  ExamListRequest,
  GetCodeRequest,
  RegisterRequest,
  SaveExamRequest,
} from "./type";

const userServiceInstance = axios.create({
  baseURL: "http://localhost:3001/",
  timeout: 3000,
});

const examServiceInstance = axios.create({
  baseURL: "http://localhost:3002/",
  timeout: 3000,
});

examServiceInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

const Register = async (params: RegisterRequest) => {
  return await userServiceInstance.post("/Register", params);
};

const Login = async (
  params: Pick<RegisterRequest, "password" | "userName">
) => {
  const res = await userServiceInstance.post("/Login", params);
  if (res.data.token && res.data.userId && res.data.userName) {
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ userName: res.data.userName, userId: res.data.userId })
    );
    localStorage.setItem("token", res.data.token);
  }
  return res;
};

const GetCode = async (params: GetCodeRequest) => {
  return await userServiceInstance.get("/GetCode", {
    params,
  });
};

const UpdatePassword = async (params: RegisterRequest) => {
  return await userServiceInstance.post("/UpdatePassword", params);
};

const AddExam = async (params: AddExamRequest) => {
  return await examServiceInstance.post("/AddExam", params);
};

const SaveExam = async (params: SaveExamRequest) => {
  return await examServiceInstance.post("/SaveExam", params);
};

const DeleteExam = async (id: number) => {
  return await examServiceInstance.delete(`/DeleteExam/${id}`);
};

const PublishExam = async (id: number) => {
  return await examServiceInstance.put(`/PublishExam/${id}`);
};

const ExamList = async (params: ExamListRequest) => {
  return await examServiceInstance.get("/ExamList", { params });
};

export const userRequest = {
  Register,
  Login,
  GetCode,
  UpdatePassword,
};

export const examRequest = {
  AddExam,
  SaveExam,
  DeleteExam,
  PublishExam,
  ExamList,
};
