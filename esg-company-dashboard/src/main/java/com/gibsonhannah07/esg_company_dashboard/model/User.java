package com.gibsonhannah07.esg_company_dashboard.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    //later I'll add favoriteCompany using onetomany

    public User() {}

    public User(String name) {
        this.name = name;
    }

    //getters and setters
}
