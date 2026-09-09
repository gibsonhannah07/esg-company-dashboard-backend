package com.gibsonhannah07.esg_company_dashboard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String industry;
    private String netZeroBy;
    private String renewableEnergyPct;
    private String womenInLeadershipPct;
    private String ceoPayRatio;

    @Column(length = 1000)
    private String notes;

    private String source;

    public Company() {}

    public Company(String name, String industry, String netZeroBy,
                   String renewableEnergyPct, String womenInLeadershipPct,
                   String ceoPayRatio, String notes, String source) {
        this.name = name;
        this.industry = industry;
        this.netZeroBy = netZeroBy;
        this.renewableEnergyPct = renewableEnergyPct;
        this.womenInLeadershipPct = womenInLeadershipPct;
        this.ceoPayRatio = ceoPayRatio;
        this.notes = notes;
        this.source = source;
    }

    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
}