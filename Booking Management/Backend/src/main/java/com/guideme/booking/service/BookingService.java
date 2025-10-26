package com.guideme.booking.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.guideme.booking.dto.BookingDTO;
import com.guideme.booking.model.Booking;
import com.guideme.booking.model.Tour;
import com.guideme.booking.model.User;
import com.guideme.booking.repository.BookingRepository;
import com.guideme.booking.repository.TourRepository;
import com.guideme.booking.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepo;
    private final TourRepository tourRepo;
    private final UserRepository userRepo;

    public Booking createBooking(BookingDTO req) {
        Tour tour = tourRepo.findById(req.getTourId().longValue())
                    .orElseThrow(() -> new EntityNotFoundException("Tour not found"));

        User tourist = userRepo.findById(req.getTouristId().longValue())
                            .orElseThrow(() -> new EntityNotFoundException("User not found"));


        // compute total
        BigDecimal total = BigDecimal.valueOf(tour.getPrice())
                             .multiply(BigDecimal.valueOf(req.getGuestsCount()));

        Booking booking = new Booking();
        booking.setBookingRef(generateBookingRef());
        booking.setTour(tour);
        booking.setTourist(tourist);
        booking.setBookingDate(req.getBookingDate());
        booking.setGuestsCount(req.getGuestsCount());
        booking.setTotalAmount(total);
        booking.setStatus("CONFIRMED");
        booking.setCreatedAt(LocalDate.now());
        booking.setFullName(tourist.getFullName());
        booking.setEmail(tourist.getEmail());

        // set QR payload (simple)
        booking.setQrCodeData(booking.getBookingRef() + "|tour:" + tour.getId() + "|user:" + tourist.getId());

        return bookingRepo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll(); 
    }

    public Booking getByRef(String ref) {
        return bookingRepo.findByBookingRef(ref).orElseThrow(() -> new EntityNotFoundException("Booking not found"));
    }

    public List<Booking> getBookingsForUser(Integer touristId) {
        return bookingRepo.findByTouristId(touristId);
    }

    public void cancelBooking(String ref) {
        Booking b = getByRef(ref);
        b.setStatus("CANCELLED");
        bookingRepo.save(b);
    }

    private String generateBookingRef(){
        String uuid = UUID.randomUUID().toString().substring(0,8).toUpperCase();
        return "BOOK-" + LocalDate.now().format(DateTimeFormatter.BASIC_ISO_DATE) + "-" + uuid;
    }

    // Update booking
    public Booking updateBooking(String ref, BookingDTO req) {
    Booking booking = bookingRepo.findByBookingRef(ref)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        if (req.getTourId() != null) {
            Tour tour = tourRepo.findById(req.getTourId().longValue())
                    .orElseThrow(() -> new EntityNotFoundException("Tour not found"));
            booking.setTour(tour);
        }

        if (req.getTouristId() != null) {
            User tourist = userRepo.findById(req.getTouristId().longValue())
                    .orElseThrow(() -> new EntityNotFoundException("User not found"));
            booking.setTourist(tourist);
            booking.setFullName(tourist.getFullName());
        }

        if (req.getBookingDate() != null)
            booking.setBookingDate(req.getBookingDate());

        if (req.getGuestsCount() != null)
            booking.setGuestsCount(req.getGuestsCount());

        if (req.getStatus() != null)
            booking.setStatus(req.getStatus());

        BigDecimal newTotal = BigDecimal.valueOf(booking.getTour().getPrice())
                .multiply(BigDecimal.valueOf(booking.getGuestsCount()));
        booking.setTotalAmount(newTotal);

        return bookingRepo.save(booking);
    }

    // Delete booking
    public void deleteBooking(String ref) {
        Booking booking = bookingRepo.findByBookingRef(ref)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        bookingRepo.delete(booking);
    }
}

