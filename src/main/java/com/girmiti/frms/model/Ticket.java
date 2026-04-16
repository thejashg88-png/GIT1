package com.girmiti.frms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ticket_seq_gen")
    @SequenceGenerator(
            name = "ticket_seq_gen",
            sequenceName = "ticket_sequence",
            initialValue = 10000000,
            allocationSize = 1
    )
    private Long ticketId;

    @Column(nullable = false)
    private String customerId;

    @Column(nullable = false)
    private String description;

    private String status;

    // 🔹 Default Constructor
    public Ticket() {
    }

    // 🔹 Parameterized Constructor
    public Ticket(Long ticketId, String customerId, String description, String status) {
        this.ticketId = ticketId;
        this.customerId = customerId;
        this.description = description;
        this.status = status;
    }

    // 🔹 Getters and Setters

    public Long getTicketId() {
        return ticketId;
    }

    public void setTicketId(Long ticketId) {
        this.ticketId = ticketId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}