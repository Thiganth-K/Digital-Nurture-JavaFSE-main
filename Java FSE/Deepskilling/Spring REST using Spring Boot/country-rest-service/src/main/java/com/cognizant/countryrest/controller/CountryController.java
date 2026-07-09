package com.cognizant.countryrest.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cognizant.countryrest.model.Country;
import com.cognizant.countryrest.service.CountryService;

@RestController
@RequestMapping("/api/countries")
public class CountryController {

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    // GET /api/countries - Get all countries
    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = countryService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    // GET /api/countries/{code} - Get country by code
    @GetMapping("/{code}")
    public ResponseEntity<Country> getCountryByCode(@PathVariable String code) {
        Optional<Country> country = countryService.getCountryByCode(code.toUpperCase());
        return country.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    // GET /api/countries/search?name=xxx - Search countries by name
    @GetMapping("/search")
    public ResponseEntity<List<Country>> searchByName(@RequestParam String name) {
        List<Country> countries = countryService.searchByName(name);
        return ResponseEntity.ok(countries);
    }

    // POST /api/countries - Add a new country
    @PostMapping
    public ResponseEntity<Country> addCountry(@RequestBody Country country) {
        Country saved = countryService.addCountry(country);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT /api/countries/{code} - Update country name
    @PutMapping("/{code}")
    public ResponseEntity<Country> updateCountry(@PathVariable String code, @RequestBody Country country) {
        Country updated = countryService.updateCountry(code.toUpperCase(), country.getName());
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE /api/countries/{code} - Delete a country
    @DeleteMapping("/{code}")
    public ResponseEntity<Void> deleteCountry(@PathVariable String code) {
        boolean deleted = countryService.deleteCountry(code.toUpperCase());
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // GET /api/countries/hello - Hello World REST endpoint
    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld() {
        return ResponseEntity.ok("Hello World from Spring REST!");
    }
}
