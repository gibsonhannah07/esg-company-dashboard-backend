package com.gibsonhannah07.esg_company_dashboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gibsonhannah07.esg_company_dashboard.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
