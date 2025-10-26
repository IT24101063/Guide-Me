package com.guideme.booking.dto;

import com.guideme.booking.model.Tour;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourDTO {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private Integer durationDays;
    private String location;
    private String startDate;

    public static TourDTO fromEntity(Tour tour) {
        if (tour == null) return null;

        return TourDTO.builder()
                .id(tour.getId())
                .title(tour.getTitle())
                .description(tour.getDescription())
                .price(tour.getPrice())
                .durationDays(tour.getDurationDays())
                .location(tour.getLocation())
                .startDate(tour.getStartDate())
                .build();
    }

    public Tour toEntity() {
        return Tour.builder()
                .id(this.id)
                .title(this.title)
                .description(this.description)
                .price(this.price)
                .durationDays(this.durationDays)
                .location(this.location)
                .startDate(this.startDate)
                .build();
    }
}
