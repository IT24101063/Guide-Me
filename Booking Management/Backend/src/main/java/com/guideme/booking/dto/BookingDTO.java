package com.guideme.booking.dto;

import com.guideme.booking.model.Booking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {

    private Integer id;
    private String bookingRef;
    private Integer touristId;
    private Integer tourId;
    private String tourTitle;
    private LocalDate bookingDate;
    private Integer guestsCount;
    private BigDecimal totalAmount;
    private String status;
    private String qrCodeData;
    private LocalDate createdAt;
    private String fullName;
    private String email;

    /**
     * map Booking entity to BookingDTO
     */
    public static BookingDTO fromEntity(Booking booking) {
        return BookingDTO.builder()
                .id(booking.getId())
                .bookingRef(booking.getBookingRef())
                .touristId(booking.getTourist().getId().intValue())
                .tourId(booking.getTour().getId().intValue())
                .tourTitle(booking.getTour().getTitle())
                .bookingDate(booking.getBookingDate())
                .guestsCount(booking.getGuestsCount())
                .totalAmount(booking.getTotalAmount())
                .status(booking.getStatus())
                .qrCodeData(booking.getQrCodeData())
                .createdAt(booking.getCreatedAt())
                .fullName(booking.getTourist() != null ? booking.getTourist().getFullName() : booking.getFullName())
                .email(booking.getTourist() != null ? booking.getTourist().getEmail() : booking.getEmail())
                .build();
    }

    
}