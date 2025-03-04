package com.example.Quiz_App.service;

import com.example.Quiz_App.entity.QuizQuestion;
import com.example.Quiz_App.repo.QuestionRepo;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.PublicKey;
import java.util.List;

@Service
public class QuestionService {

    @Autowired
    QuestionRepo questionRepo;

    public List<QuizQuestion> getAllQuestions(){

        List<QuizQuestion> questionRepoAll =questionRepo.findAll();
        return questionRepoAll;
    }
    public QuizQuestion saveQuestion(QuizQuestion question){

        QuizQuestion save=questionRepo.save(question);
        return save;
    }
}
