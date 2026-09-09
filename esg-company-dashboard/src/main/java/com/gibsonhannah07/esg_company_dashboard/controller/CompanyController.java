package com.gibsonhannah07.esg_company_dashboard.controller;

import com.gibsonhannah07.esg_company_dashboard.repository.CompanyRepository;
import com.gibsonhannah07.esg_company_dashboard.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    // GET all companies; from the hardcoded unit 1 list
    @GetMapping
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // GET a single company by id
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        Optional<Company> company = companyRepository.findById(id);
        return company.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}