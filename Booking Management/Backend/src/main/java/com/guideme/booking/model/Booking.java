package com.guideme.booking.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="booking_ref", unique = true, nullable=false)
    private String bookingRef;

    @ManyToOne
    @JoinColumn(name="tourist_id", nullable=false)
    private User tourist;

    @ManyToOne
    @JoinColumn(name="tour_id", nullable=false)
    private Tour tour;

    private LocalDate bookingDate;
    private Integer guestsCount;
    private BigDecimal totalAmount;
    private String status;
    @Column(columnDefinition = "nvarchar(max)")
    private String qrCodeData;
    private LocalDate createdAt;

    @Column(name = "full_name")
    private String fullName; 
    private String email;
    
}
