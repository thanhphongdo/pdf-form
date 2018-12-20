export interface AnswerInterface {
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
}

export interface QuestionInterface {
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
}

export interface QAInterface {
    question: QuestionInterface,
    answers: AnswerInterface[]
}