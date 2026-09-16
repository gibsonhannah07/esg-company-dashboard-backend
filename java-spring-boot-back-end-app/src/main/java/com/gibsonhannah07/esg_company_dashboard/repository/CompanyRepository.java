package com.gibsonhannah07.esg_company_dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gibsonhannah07.esg_company_dashboard.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

//    List<Company> findByIndustry(String industry);
}
