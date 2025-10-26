package com.guideme.booking.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.guideme.booking.dto.BookingDTO;
import com.guideme.booking.model.Booking;
import com.guideme.booking.service.BookingService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @GetMapping
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> list = bookingService.getAllBookings().stream()
                .map(BookingDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<BookingDTO> create(@Valid @RequestBody BookingDTO req) {
        Booking b = bookingService.createBooking(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(BookingDTO.fromEntity(b));
    }

    @GetMapping("/{ref}")
    public ResponseEntity<BookingDTO> getByRef(@PathVariable String ref) {
        return ResponseEntity.ok(BookingDTO.fromEntity(bookingService.getByRef(ref)));
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookingDTO>> getForUser(@PathVariable Integer userId) {
        List<BookingDTO> list = bookingService.getBookingsForUser(userId).stream().map(BookingDTO::fromEntity).collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PostMapping("/cancel/{ref}")
    public ResponseEntity<Void> cancel(@PathVariable String ref) {
        bookingService.cancelBooking(ref);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{ref}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable String ref, @RequestBody BookingDTO dto) {
        Booking updated = bookingService.updateBooking(ref, dto);
        return ResponseEntity.ok(BookingDTO.fromEntity(updated));
    }

    @DeleteMapping("/{ref}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String ref) {
        bookingService.deleteBooking(ref);
        return ResponseEntity.noContent().build();
    }
}

