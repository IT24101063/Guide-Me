package com.guideme.booking.controller;

import com.guideme.booking.dto.TourDTO;
import com.guideme.booking.model.Tour;
import com.guideme.booking.repository.TourRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tours")
@CrossOrigin(origins = "http://localhost:4200")
public class TourController {

    private final TourRepository repo;

    public TourController(TourRepository repo) {
        this.repo = repo;
    }

    // GET all tours
    @GetMapping
    public ResponseEntity<List<TourDTO>> getAllTours() {
        List<TourDTO> tours = repo.findAll().stream()
                .map(TourDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tours);
    }

    // GET tour by ID
    @GetMapping("/{id}")
    public ResponseEntity<TourDTO> getTourById(@PathVariable Long id) {
        Tour tour = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id " + id));
        return ResponseEntity.ok(TourDTO.fromEntity(tour));
    }

    // CREATE new tour
    @PostMapping
    public ResponseEntity<TourDTO> createTour(@RequestBody TourDTO dto) {
        Tour tour = dto.toEntity(); 
        Tour saved = repo.save(tour);
        return ResponseEntity.status(HttpStatus.CREATED).body(TourDTO.fromEntity(saved));
    }

    // UPDATE existing tour
    @PutMapping("/{id}")
    public ResponseEntity<TourDTO> updateTour(@PathVariable Long id, @RequestBody TourDTO dto) {
        Tour existingTour = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tour not found with id " + id));

        // Update fields
        existingTour.setTitle(dto.getTitle());
        existingTour.setDescription(dto.getDescription());
        existingTour.setPrice(dto.getPrice());
        existingTour.setDurationDays(dto.getDurationDays());
        existingTour.setLocation(dto.getLocation());
        existingTour.setStartDate(dto.getStartDate());

        // Save updated tour
        Tour saved = repo.save(existingTour);
        return ResponseEntity.ok(TourDTO.fromEntity(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
