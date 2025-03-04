function startQuiz(quizType){
    alert(`Starting ${quizType.charAt(0).toUpperCase() +quizType.slice(1)} Quiz!`);

    window.location.href=`${quizType}-quiz.html`;
}