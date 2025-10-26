package com.guideme.booking.service;

import org.springframework.stereotype.Service;
import com.guideme.booking.dto.LoginDTO;
import com.guideme.booking.model.User;  
import com.guideme.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;

    public User login(LoginDTO loginDTO) {
        User user = userRepo.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginDTO.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user; 
    }
}
