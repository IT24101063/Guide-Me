package com.guideme.booking.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.guideme.booking.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Optional<Booking> findByBookingRef(String bookingRef);
    List<Booking> findByTouristId(Integer touristId);
    List<Booking> findByTourId(Integer tourId);
    boolean existsByBookingRef(String bookingRef);
    void deleteByBookingRef(String bookingRef);
}