package com.gibsonhannah07.esg_company_dashboard.controller;

import com.gibsonhannah07.esg_company_dashboard.model.Company;
import com.gibsonhannah07.esg_company_dashboard.model.Favorite;
import com.gibsonhannah07.esg_company_dashboard.repository.CompanyRepository;
import com.gibsonhannah07.esg_company_dashboard.repository.FavoriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:5173")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // GET favorites for a session
    @GetMapping("/session/{sessionId}")
    public List<Favorite> getFavoritesBySession(@PathVariable String sessionId) {
        return favoriteRepository.findBySessionId(sessionId);
    }

    // POST add favorite
    @PostMapping
    public ResponseEntity<Favorite> addFavorite(@RequestBody FavoriteRequest request) {

        Company company = companyRepository.findById(request.getCompanyId())
                .orElse(null);

        if (company == null) {
            return ResponseEntity.badRequest().build();
        }

        Favorite favorite = new Favorite(request.getSessionId(), company);
        Favorite saved = favoriteRepository.save(favorite);

        return ResponseEntity.ok(saved);
    }

    // DELETE favorite
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        if (!favoriteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        favoriteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    static class FavoriteRequest {
        private String sessionId;
        private Long companyId;

        public String getSessionId() { return sessionId; }
        public void setSessionId(String sessionId) { this.sessionId = sessionId; }

        public Long getCompanyId() { return companyId; }
        public void setCompanyId(Long companyId) { this.companyId = companyId; }
    }
}
