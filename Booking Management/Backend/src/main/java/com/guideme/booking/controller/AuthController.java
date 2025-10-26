package com.guideme.booking.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import com.guideme.booking.model.User;
import com.guideme.booking.service.AuthService;
import com.guideme.booking.dto.LoginDTO;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO dto) {
        User user = authService.login(dto);
        user.setPassword(null); 
        return ResponseEntity.ok(user);
    }
}
