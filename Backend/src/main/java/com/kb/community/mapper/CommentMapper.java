package com.kb.community.mapper;

import com.kb.community.dto.CommentDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    List<CommentDTO> findByPostId(@Param("postId") Long postId);
    void insertComment(CommentDTO commentDTO);
}