export const AuthenStep = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER'
}

export const FirstFlowStep = {
  AUTHEN: 'AUTHEN',
  SELECT_LEVEL: 'SELECT_LEVEL',
  SELECT_TOPIC: 'SELECT_TOPIC',
  SELECT_WORD: 'SELECT_WORD'
}

export const Actions = {
  INCREMENT: 'increment'
}

export const Getters = {
  EXAMPLE: 'example'
}

export const validateMessage: {
    [key: string]: {
        required?: {
            message: string;
        };
        valid?: {
            pattern: any;
            message: string;
        };
        length?: {
            min?: number;
            max?: number;
            message: string;
        };
        equal?: {
            field: string;
            message: string;
        };
    }
} = {
  email: {
    required: {
      message: 'Email không được để trống'
    },
    valid: {
      pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Email không đúng định dạng'
    }
  },
  password: {
    required: {
      message: 'Password không được để trống'
    },
    length: {
      max: 30,
      min: 6,
      message: 'Password phải có độ dài từ 6 - 30 ký tự'
    }
  }
}
