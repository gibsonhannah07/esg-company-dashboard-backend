package com.gibsonhannah07.esg_company_dashboard.controller;

import com.gibsonhannah07.esg_company_dashboard.model.Company;
import com.gibsonhannah07.esg_company_dashboard.model.User;
import com.gibsonhannah07.esg_company_dashboard.repository.CompanyRepository;
import com.gibsonhannah07.esg_company_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    // GET all companies (seeded + user-added)
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

    // POST a new company added by a user
    @PostMapping
    public ResponseEntity<?> createCompany(@RequestBody CompanyRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());

        if (user.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid userId");
        }

        Company company = new Company(
                request.getName(),
                request.getIndustry(),
                request.getNetZeroBy(),
                request.getRenewableEnergyPct(),
                request.getWomenInLeadershipPct(),
                request.getCeoPayRatio(),
                request.getNotes(),
                request.getSource(),
                user.get(),
                LocalDateTime.now()
        );

        Company saved = companyRepository.save(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Request body shape for POST /api/companies
    static class CompanyRequest {
        private Long userId;
        private String name;
        private String industry;
        private String netZeroBy;
        private String renewableEnergyPct;
        private String womenInLeadershipPct;
        private String ceoPayRatio;
        private String notes;
        private String source;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getIndustry() { return industry; }
        public void setIndustry(String industry) { this.industry = industry; }

        public String getNetZeroBy() { return netZeroBy; }
        public void setNetZeroBy(String netZeroBy) { this.netZeroBy = netZeroBy; }

        public String getRenewableEnergyPct() { return renewableEnergyPct; }
        public void setRenewableEnergyPct(String renewableEnergyPct) { this.renewableEnergyPct = renewableEnergyPct; }

        public String getWomenInLeadershipPct() { return womenInLeadershipPct; }
        public void setWomenInLeadershipPct(String womenInLeadershipPct) { this.womenInLeadershipPct = womenInLeadershipPct; }

        public String getCeoPayRatio() { return ceoPayRatio; }
        public void setCeoPayRatio(String ceoPayRatio) { this.ceoPayRatio = ceoPayRatio; }

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }

        public String getSource() { return source; }
        public void setSource(String source) { this.source = source; }
    }
}