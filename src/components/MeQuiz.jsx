import { useCallback, useState } from "react";
import MeQuestion from './MeQuestion'
import QUESTIONS from '../questions.js';
import Summary from "./Summary";

export default function MeQuiz(){
    const [userAnswer , setUserAnswer] = useState([]);
    const activeQuestionIndex = userAnswer.length;
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length; 


    const handleSelectAnswer = useCallback( function handleSelectAnswer(answer){
        setUserAnswer(prev => {
            return [...prev , answer];
        });
    },[]);

    const handleSkipAnswer = useCallback(()=>{handleSelectAnswer(null)},[handleSelectAnswer]);


    if(quisIsComplete){
        return <Summary userAnswers={userAnswer} />
    }

    return(
        <div id="quiz">
        <MeQuestion 
            key={activeQuestionIndex}
            index={activeQuestionIndex}
            onSkipAnswer={handleSkipAnswer}
            onSelectAnswer={handleSelectAnswer}
        />
    </div>
    );

}