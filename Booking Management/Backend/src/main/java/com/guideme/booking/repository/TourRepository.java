package com.guideme.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guideme.booking.model.Tour;

public interface TourRepository extends JpaRepository<Tour, Long> {
}
