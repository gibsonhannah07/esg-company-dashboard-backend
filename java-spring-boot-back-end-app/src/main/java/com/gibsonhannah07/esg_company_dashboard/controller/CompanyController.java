package com.gibsonhannah07.esg_company_dashboard.controller;

import com.gibsonhannah07.esg_company_dashboard.model.Company;
import com.gibsonhannah07.esg_company_dashboard.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:5173")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    // GET all companies
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

    // DELETE a company added by a user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        if (!companyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        companyRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // POST a new company (no login required)
    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody CompanyRequest request) {

        Company company = new Company();
        company.setName(request.getName());
        company.setIndustry(request.getIndustry());
        company.setNetZeroBy(request.getNetZeroBy());
        company.setRenewableEnergyPct(request.getRenewableEnergyPct());
        company.setWomenInLeadershipPct(request.getWomenInLeadershipPct());
        company.setCeoPayRatio(request.getCeoPayRatio());
        company.setNotes(request.getNotes());
        company.setSource(request.getSource());
        company.setAddedBy(request.getAddedBy());
        company.setCreatedAt(LocalDateTime.now());

        Company saved = companyRepository.save(company);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Request body for POST /api/companies
    static class CompanyRequest {
        private String name;
        private String industry;
        private String netZeroBy;
        private String renewableEnergyPct;
        private String womenInLeadershipPct;
        private String ceoPayRatio;
        private String notes;
        private String source;
        private String addedBy;

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

        public String getAddedBy() { return addedBy; }
        public void setAddedBy(String addedBy) { this.addedBy = addedBy; }
    }

    //update company notes
    @PutMapping("/{id}/notes")
    public ResponseEntity<Company> updateCompanyNotes(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        Company company = companyRepository.findById(id).orElse(null);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        String notes = body.get("notes");
        company.setNotes(notes);

        Company updated = companyRepository.save(company);
        return ResponseEntity.ok(updated);
    }

}
