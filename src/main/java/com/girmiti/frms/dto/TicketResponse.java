package com.girmiti.frms.dto;

public class TicketResponse {

    private Long ticketId;
    private String customerId;
    private String description;
    private String status;

    public TicketResponse(Long ticketId, String customerId, String description, String status) {
        this.ticketId = ticketId;
        this.customerId = customerId;
        this.description = description;
        this.status = status;
    }

   
    public Long getTicketId() {
        return ticketId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getDescription() {
        return description;
    }

    public String getStatus() {
        return status;
    }
}