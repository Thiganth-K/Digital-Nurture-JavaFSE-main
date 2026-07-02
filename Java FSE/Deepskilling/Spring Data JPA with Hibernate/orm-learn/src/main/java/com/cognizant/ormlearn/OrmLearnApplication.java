package com.cognizant.ormlearn;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);
    private static CountryService countryService;

    public static void main(String[] args) {
        LOGGER.info("Starting OrmLearnApplication...");
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        countryService = context.getBean(CountryService.class);
        
        LOGGER.info("Inside main - Spring Boot Application Context Loaded successfully.");

        // Running testing methods sequentially to verify JPA operations
        testGetAllCountries();
        testFindCountryByCode();
        testFindCountryByCodeNotFound();
        testAddCountry();
        testUpdateCountry();
        testDeleteCountry();
        testFindCountriesByNameContaining();
        
        LOGGER.info("OrmLearnApplication executions completed successfully.");
    }

    private static void testGetAllCountries() {
        LOGGER.info("--- START: testGetAllCountries ---");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.debug("Fetched countries list size: {}", countries.size());
        LOGGER.info("Fetched countries: {}", countries);
        LOGGER.info("--- END: testGetAllCountries ---\n");
    }

    private static void testFindCountryByCode() {
        LOGGER.info("--- START: testFindCountryByCode ('IN') ---");
        try {
            Country country = countryService.findCountryByCode("IN");
            LOGGER.debug("Found Country: {}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Country not found: ", e);
        }
        LOGGER.info("--- END: testFindCountryByCode ---\n");
    }

    private static void testFindCountryByCodeNotFound() {
        LOGGER.info("--- START: testFindCountryByCode ('XX' - Expecting Exception) ---");
        try {
            Country country = countryService.findCountryByCode("XX");
            LOGGER.debug("Found Country: {}", country);
        } catch (CountryNotFoundException e) {
            LOGGER.info("Expected Exception caught successfully: {}", e.getMessage());
        }
        LOGGER.info("--- END: testFindCountryByCodeNotFound ---\n");
    }

    private static void testAddCountry() {
        LOGGER.info("--- START: testAddCountry ---");
        String code = "ZZ";
        String name = "TestCountryZZ";
        
        Country country = new Country(code, name);
        LOGGER.info("Adding Country: {}", country);
        countryService.addCountry(country);
        
        try {
            Country fetched = countryService.findCountryByCode(code);
            LOGGER.debug("Verified Country in database: {}", fetched);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Failed to verify added country: ", e);
        }
        LOGGER.info("--- END: testAddCountry ---\n");
    }

    private static void testUpdateCountry() {
        LOGGER.info("--- START: testUpdateCountry ---");
        String code = "ZZ";
        String newName = "UpdatedTestCountryZZ";
        
        LOGGER.info("Updating Country {} name to: {}", code, newName);
        try {
            countryService.updateCountry(code, newName);
            Country fetched = countryService.findCountryByCode(code);
            LOGGER.debug("Verified Updated Country in database: {}", fetched);
        } catch (CountryNotFoundException e) {
            LOGGER.error("Failed to update country: ", e);
        }
        LOGGER.info("--- END: testUpdateCountry ---\n");
    }

    private static void testDeleteCountry() {
        LOGGER.info("--- START: testDeleteCountry ---");
        String code = "ZZ";
        
        LOGGER.info("Deleting Country with code: {}", code);
        countryService.deleteCountry(code);
        
        try {
            countryService.findCountryByCode(code);
            LOGGER.error("Error: Country still exists after deletion!");
        } catch (CountryNotFoundException e) {
            LOGGER.debug("Verified deletion successfully: Country {} is no longer in database.", code);
        }
        LOGGER.info("--- END: testDeleteCountry ---\n");
    }

    private static void testFindCountriesByNameContaining() {
        LOGGER.info("--- START: testFindCountriesByNameContaining ('ia') ---");
        String keyword = "ia";
        List<Country> countries = countryService.findCountriesByNameContaining(keyword);
        LOGGER.debug("Found {} countries containing '{}'", countries.size(), keyword);
        for (Country country : countries) {
            LOGGER.info("Country matches partial name search: {}", country);
        }
        LOGGER.info("--- END: testFindCountriesByNameContaining ---\n");
    }
}
