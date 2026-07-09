package com.cognizant.ormlearn;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.model.Department;
import com.cognizant.ormlearn.model.Employee;
import com.cognizant.ormlearn.model.Skill;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.DepartmentService;
import com.cognizant.ormlearn.service.EmployeeService;
import com.cognizant.ormlearn.service.SkillService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrmLearnApplication.class);
    private static CountryService countryService;
    private static DepartmentService departmentService;
    private static EmployeeService employeeService;
    private static SkillService skillService;

    public static void main(String[] args) {
        LOGGER.info("Starting OrmLearnApplication...");
        ApplicationContext context = SpringApplication.run(OrmLearnApplication.class, args);
        countryService = context.getBean(CountryService.class);
        departmentService = context.getBean(DepartmentService.class);
        employeeService = context.getBean(EmployeeService.class);
        skillService = context.getBean(SkillService.class);
        
        LOGGER.info("Inside main - Spring Boot Application Context Loaded successfully.");

        // ═══════════════════════════════════════════════════════════════
        // Hands-On 1: Country CRUD Operations
        // ═══════════════════════════════════════════════════════════════
        testGetAllCountries();
        testFindCountryByCode();
        testFindCountryByCodeNotFound();
        testAddCountry();
        testUpdateCountry();
        testDeleteCountry();
        testFindCountriesByNameContaining();

        // ═══════════════════════════════════════════════════════════════
        // Hands-On 2: O/R Mapping Demonstration
        // ═══════════════════════════════════════════════════════════════
        testGetAllDepartments();
        testGetDepartmentWithEmployees();
        testGetEmployeeWithSkills();
        testGetAllSkills();

        // ═══════════════════════════════════════════════════════════════
        // Hands-On 3: JPQL / HQL and Native Query
        // ═══════════════════════════════════════════════════════════════
        testFindEmployeesWithHighSalary();
        testFindEmployeesByDepartmentName();
        testFindAllEmployeesOrderBySalary();
        testFindEmployeesByNameKeyword();
        
        LOGGER.info("OrmLearnApplication executions completed successfully.");
    }

    // ══════════════════════════════════════════════════════════════════
    // Hands-On 1: Country CRUD
    // ══════════════════════════════════════════════════════════════════

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

    // ══════════════════════════════════════════════════════════════════
    // Hands-On 2: O/R Mapping
    // ══════════════════════════════════════════════════════════════════

    private static void testGetAllDepartments() {
        LOGGER.info("--- START: testGetAllDepartments ---");
        List<Department> departments = departmentService.getAllDepartments();
        LOGGER.debug("Fetched {} departments", departments.size());
        for (Department dept : departments) {
            LOGGER.info("Department: {}", dept);
        }
        LOGGER.info("--- END: testGetAllDepartments ---\n");
    }

    private static void testGetDepartmentWithEmployees() {
        LOGGER.info("--- START: testGetDepartmentWithEmployees (Department ID: 1 - Engineering) ---");
        Optional<Department> optDept = departmentService.findById(1);
        if (optDept.isPresent()) {
            Department dept = optDept.get();
            LOGGER.info("Department: {}", dept);
            List<Employee> employees = employeeService.findByDepartmentId(dept.getId());
            LOGGER.debug("Found {} employees in department '{}'", employees.size(), dept.getName());
            for (Employee emp : employees) {
                LOGGER.info("  Employee: {}", emp);
            }
        } else {
            LOGGER.warn("Department ID 1 not found.");
        }
        LOGGER.info("--- END: testGetDepartmentWithEmployees ---\n");
    }

    private static void testGetEmployeeWithSkills() {
        LOGGER.info("--- START: testGetEmployeeWithSkills (Employee ID: 1 - Alice) ---");
        Optional<Employee> optEmp = employeeService.findById(1);
        if (optEmp.isPresent()) {
            Employee emp = optEmp.get();
            LOGGER.info("Employee: {}", emp);
            Set<Skill> skills = emp.getSkills();
            LOGGER.debug("Employee '{}' has {} skills", emp.getName(), skills.size());
            for (Skill skill : skills) {
                LOGGER.info("  Skill: {}", skill);
            }
        } else {
            LOGGER.warn("Employee ID 1 not found.");
        }
        LOGGER.info("--- END: testGetEmployeeWithSkills ---\n");
    }

    private static void testGetAllSkills() {
        LOGGER.info("--- START: testGetAllSkills ---");
        List<Skill> skills = skillService.getAllSkills();
        LOGGER.debug("Fetched {} skills", skills.size());
        for (Skill skill : skills) {
            LOGGER.info("Skill: {}", skill);
        }
        LOGGER.info("--- END: testGetAllSkills ---\n");
    }

    // ══════════════════════════════════════════════════════════════════
    // Hands-On 3: JPQL / HQL and Native Query
    // ══════════════════════════════════════════════════════════════════

    private static void testFindEmployeesWithHighSalary() {
        LOGGER.info("--- START: testFindEmployeesWithHighSalary (> $70,000) [JPQL] ---");
        List<Employee> employees = employeeService.findEmployeesWithSalaryGreaterThan(new BigDecimal("70000"));
        LOGGER.debug("Found {} employees with salary > $70,000", employees.size());
        for (Employee emp : employees) {
            LOGGER.info("  High-salary Employee: {}", emp);
        }
        LOGGER.info("--- END: testFindEmployeesWithHighSalary ---\n");
    }

    private static void testFindEmployeesByDepartmentName() {
        LOGGER.info("--- START: testFindEmployeesByDepartmentName ('Engineering') [JPQL] ---");
        List<Employee> employees = employeeService.findByDepartmentName("Engineering");
        LOGGER.debug("Found {} employees in 'Engineering'", employees.size());
        for (Employee emp : employees) {
            LOGGER.info("  Engineering Employee: {}", emp);
        }
        LOGGER.info("--- END: testFindEmployeesByDepartmentName ---\n");
    }

    private static void testFindAllEmployeesOrderBySalary() {
        LOGGER.info("--- START: testFindAllEmployeesOrderBySalary [Native Query] ---");
        List<Employee> employees = employeeService.findAllOrderBySalaryDesc();
        LOGGER.debug("Fetched {} employees ordered by salary DESC", employees.size());
        for (Employee emp : employees) {
            LOGGER.info("  Employee: {}", emp);
        }
        LOGGER.info("--- END: testFindAllEmployeesOrderBySalary ---\n");
    }

    private static void testFindEmployeesByNameKeyword() {
        LOGGER.info("--- START: testFindEmployeesByNameKeyword ('al') [JPQL LIKE] ---");
        List<Employee> employees = employeeService.findByNameContaining("al");
        LOGGER.debug("Found {} employees with name containing 'al'", employees.size());
        for (Employee emp : employees) {
            LOGGER.info("  Matching Employee: {}", emp);
        }
        LOGGER.info("--- END: testFindEmployeesByNameKeyword ---\n");
    }
}
