package com.gibsonhannah07.esg_company_dashboard.repository;

import com.gibsonhannah07.esg_company_dashboard.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {}
