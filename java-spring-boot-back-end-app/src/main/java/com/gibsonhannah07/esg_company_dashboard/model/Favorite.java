package com.gibsonhannah07.esg_company_dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favorites")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;   // ← replaces User

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public Favorite() {}

    public Favorite(String sessionId, Company company) {
        this.sessionId = sessionId;
        this.company = company;
    }

    public Long getId() {
        return id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
