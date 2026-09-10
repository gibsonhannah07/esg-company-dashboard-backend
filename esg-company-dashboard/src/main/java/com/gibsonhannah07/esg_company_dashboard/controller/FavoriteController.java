package com.gibsonhannah07.esg_company_dashboard.controller;

import com.gibsonhannah07.esg_company_dashboard.model.Company;
import com.gibsonhannah07.esg_company_dashboard.model.Favorite;
import com.gibsonhannah07.esg_company_dashboard.model.User;
import com.gibsonhannah07.esg_company_dashboard.repository.CompanyRepository;
import com.gibsonhannah07.esg_company_dashboard.repository.FavoriteRepository;
import com.gibsonhannah07.esg_company_dashboard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = "http://localhost:3000")
public class FavoriteController {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CompanyRepository companyRepository;

    // GET all favorites for a specific user
    @GetMapping("/user/{userId}")
    public List<Favorite> getFavoritesByUser(@PathVariable Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    // POST a new favorite (add a company to a user's favorites)
    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestBody FavoriteRequest request) {
        Optional<User> user = userRepository.findById(request.getUserId());
        Optional<Company> company = companyRepository.findById(request.getCompanyId());

        if (user.isEmpty() || company.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid userId or companyId");
        }

        if (favoriteRepository.existsByUserIdAndCompanyId(request.getUserId(), request.getCompanyId())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Company is already favorited by this user");
        }

        Favorite favorite = new Favorite(user.get(), company.get(), LocalDateTime.now());
        Favorite saved = favoriteRepository.save(favorite);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // DELETE (unfavorite) a favorite by its own id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        if (!favoriteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        favoriteRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    // request body  for POST /api/favorites
    static class FavoriteRequest {
        private Long userId;
        private Long companyId;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public Long getCompanyId() { return companyId; }
        public void setCompanyId(Long companyId) { this.companyId = companyId; }
    }
}