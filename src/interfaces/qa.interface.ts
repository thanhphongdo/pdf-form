export interface AnswerInterface {
    id?: any;
    type?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    label?: string;
    content?: string;
    value?: any;
    bgColor?: string;
    opacity?: number;
    borderColor?: string;
    checked?: boolean;
    textAnswer?: string;
}

export interface QuestionInterface {
    id?: any;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    label?: string;
    content?: string;
    value?: any;
    bgColor?: string;
    opacity?: number;
    borderColor?: string;
    answers?: AnswerInterface[];
}

export interface QAInterface {
    question: QuestionInterface,
    answers: AnswerInterface[]
}

export interface FormDataInterface {
    id: any;
    qa: QAInterface[];
}