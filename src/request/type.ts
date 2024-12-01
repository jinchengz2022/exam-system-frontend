export interface RegisterRequest {
  userName: string;
  password: string;
  email: string;
  captcha: string;
}

export interface GetCodeRequest {
  action?: "register" | "updatePwd";
  to: string;
}

export interface AddExamRequest {
  name: string;
  content: string;
}

export interface SaveExamRequest {
    examId: number;
    content: string;
  }

  export interface ExamListRequest {
    userId: number;
    pageSize: number;
    pageNumber: number;
    name?: string;
  }
 