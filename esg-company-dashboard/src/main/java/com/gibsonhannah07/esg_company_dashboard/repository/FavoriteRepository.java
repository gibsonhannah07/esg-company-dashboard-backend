package com.gibsonhannah07.esg_company_dashboard.repository;

import com.gibsonhannah07.esg_company_dashboard.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    // get all favorites belonging to a specific user
    List<Favorite> findByUserId(Long userId);

    // check if a user already favorited a specific company/prevents duplicates
    boolean existsByUserIdAndCompanyId(Long userId, Long companyId);
}