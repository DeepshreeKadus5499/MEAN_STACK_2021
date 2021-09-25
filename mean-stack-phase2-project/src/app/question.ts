export class Question {
    id:number;
    question: string;
    option: { optionid: number, name: string } [];
    answer: number;
    selected:number;
}
