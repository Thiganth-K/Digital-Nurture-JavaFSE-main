package com.cognizant.ormlearn.repository;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.cognizant.ormlearn.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    // Query Method: find employees by department id
    List<Employee> findByDepartmentId(int departmentId);

    // JPQL Query: find employees with salary greater than a given value
    @Query("SELECT e FROM Employee e WHERE e.salary > :salary")
    List<Employee> findEmployeesWithSalaryGreaterThan(@Param("salary") BigDecimal salary);

    // JPQL Query: find employees by department name
    @Query("SELECT e FROM Employee e WHERE e.department.name = :deptName")
    List<Employee> findByDepartmentName(@Param("deptName") String deptName);

    // Native Query: find all employees ordered by salary descending
    @Query(value = "SELECT * FROM employee ORDER BY em_salary DESC", nativeQuery = true)
    List<Employee> findAllOrderBySalaryDesc();

    // JPQL Query: find employees whose name contains a keyword
    @Query("SELECT e FROM Employee e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> findByNameContaining(@Param("keyword") String keyword);
}
