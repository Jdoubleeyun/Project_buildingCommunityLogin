package com.sparta.intellij_ultimate_week041.controller;

import com.sparta.intellij_ultimate_week041.models.Memo;
import com.sparta.intellij_ultimate_week041.repository.MemoRepository;
import com.sparta.intellij_ultimate_week041.dto.MemoRequestDto;
import com.sparta.intellij_ultimate_week041.service.MemoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class MemoController {

    private final MemoRepository memoRepository;
    private final MemoService memoService;

    @PostMapping("/api/boards")
    public Memo createMemo(@RequestBody MemoRequestDto requestDto) {
        Memo memo = new Memo(requestDto);
        return memoRepository.save(memo);
    }
    @GetMapping("/api/boards")
    public List<Memo> getMemos() {
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();
        return memoRepository.findAllByModifiedAtBetweenOrderByModifiedAtDesc(start, end);
    }
    @GetMapping("/api/boards/{id}")
    public List<Memo> getIdMemos(@PathVariable Long id) {
        return memoRepository.findAllById(id);
    }
    @PutMapping("/api/boards/{id}")
    public Long updateMemo(@PathVariable Long id, @RequestBody MemoRequestDto requestDto) {
        memoService.update(id, requestDto);
        return id;
    }
    @DeleteMapping("/api/boards/{id}")
    public Long deleteMemo(@PathVariable Long id) {
        memoRepository.deleteById(id);
        return id;
    }
}
