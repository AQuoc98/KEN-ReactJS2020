


export const QUESTION_TYPE={
    RADIO:"radio",
    CHECKBOX:"checkbox",
    SHORT_ANSWER:"short-answer"
}

export const QUESTIONS= [
    {
      type: "radio",
      require:false,
      questionName:"",
      answers: [
        {
          content: "Trả lời...",
          booleanResult: false,
        },
      ],
    },
    {
        type: "checkbox",
        require:false,
        questionName:"",
        answers: [
          {
            content: "Trả lời...",
            booleanResult: false,
          },
          {
            content: "Trả lời...",
            booleanResult: false,
          },
          {
            content: "Trả lời...",
            booleanResult: false,
          },
          {
            content: "Trả lời...",
            booleanResult: false,
          },
        ],
      },
      {
        type: "short-answer",
        require:false,
        questionName:"",
        answers:null
      },
  ]