import { useCallback, useState } from "react";
import QUESTIONS from '../questions.js'
import quizComplete from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz(){
    const [userAnswers , setUserAnswers] = useState([]); 
    const [answerState , setAnswerState] = useState('');

    const activeQuestionIndex = answerState === '' ?  userAnswers.length : userAnswers.length-1 ;
    const quisIsComplete = activeQuestionIndex === QUESTIONS.length; 

    const handleSelectAnswer = useCallback( function handleSelectAnswer(selectedAnswer) { 
        setAnswerState('answered');
        setUserAnswers((prev)=>{
            return [...prev , selectedAnswer];
        }); 

        setTimeout(()=>{
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]){
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }

            setTimeout( setAnswerState('') , 2000);
        } , 1000);
    } , [activeQuestionIndex]);  

    const handleSkipAnswer = useCallback(()=> handleSelectAnswer(null), [handleSelectAnswer]);
    
    console.log();
    console.log('activeQuestionINdex' , activeQuestionIndex);

    const shuffledAnswers = QUESTIONS[activeQuestionIndex].answers; 
    shuffledAnswers.sort(()=> Math.random() - 0.5);


    if(quisIsComplete){
        return <div id="summary">
            <img src={quizComplete} alt="" />
            <h2>Quiz Completed!</h2>
        </div>
    }

 
    return(
        <div id="quiz">
        <div id="question">
            <QuestionTimer key={activeQuestionIndex} timeout={10000} onTimeout={handleSkipAnswer} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <ul id="answers">
            {shuffledAnswers.map(answer=>{
                const isSelected = userAnswers[userAnswers.length - 1 ] === answer;
                let cssClasses = ''; 
                if(answerState === 'answered' && isSelected){
                    cssClasses = 'selected'
                }

                if((answerState === 'correct' || answerState === 'wrong') && isSelected)
                    cssClasses= answerState;

                
                return(
                    <li className="answer" key={answer}>
                        <button className={cssClasses} onClick={()=>handleSelectAnswer(answer)}>{answer}</button>
                    </li>
                );  
            }
            )}
            </ul>
        </div>
        </div>
    );
}

