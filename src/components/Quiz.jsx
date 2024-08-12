import { useCallback, useState , useRef } from "react";
import QUESTIONS from '../questions.js'
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz(){
    const [userAnswers , setUserAnswers] = useState([]); 

    const activeQuestionIndex = userAnswers.length;
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length; 

    const handleSelectAnswer = useCallback( function handleSelectAnswer(selectedAnswer) { 
        setUserAnswers((prev)=>{
            return [...prev , selectedAnswer];
        }); 
    } , []);  

    const handleSkipAnswer = useCallback(()=> handleSelectAnswer(null), [handleSelectAnswer]);

    if(quisIsComplete){
        return <Summary userAnswers={userAnswers} />
    }

    return(
        <div id="quiz">
            <Question 
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSkipAnswer={handleSkipAnswer}
                onSelectAnswer={handleSelectAnswer}
            />
        </div>
    );
}

