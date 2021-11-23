package com.sparta.intellij_ultimate_week041.domain.repository;


import com.sparta.intellij_ultimate_week041.domain.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
