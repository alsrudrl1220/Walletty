package com.example.demo.service;


import com.example.demo.entity.FeedbackCommentEntity;
import com.example.demo.entity.FeedbackEntity;
import com.example.demo.repository.FeedbackCommentRepository;
import com.example.demo.repository.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    private final FeedbackCommentRepository feedbackCommentRepository;

    public void save(String content) {
        List<FeedbackCommentEntity> sourceData = feedbackCommentRepository.findAll();

        Random random = new Random();
        int randomIndex = random.nextInt(sourceData.size()); // 무작위 인덱스 선택
        FeedbackCommentEntity randomComment = sourceData.get(randomIndex);

        FeedbackEntity feedbackEntity = new FeedbackEntity();
        feedbackEntity.setContent(content);
        feedbackEntity.setComment(randomComment.getComment());
        feedbackRepository.save(feedbackEntity);

    }

    /*
    public void saveContent(String content) {
        FeedbackEntity feedbackEntity = new FeedbackEntity();
        feedbackEntity.setContent(content);
        feedbackRepository.save(feedbackEntity);

    }
     */

}