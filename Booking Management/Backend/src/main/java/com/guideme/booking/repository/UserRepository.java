package com.guideme.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.guideme.booking.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
