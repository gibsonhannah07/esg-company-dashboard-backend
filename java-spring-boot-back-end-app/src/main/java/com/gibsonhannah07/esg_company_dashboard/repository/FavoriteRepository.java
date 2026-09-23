package com.gibsonhannah07.esg_company_dashboard.repository;

import com.gibsonhannah07.esg_company_dashboard.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findBySessionId(String sessionId);
}
