package com.girmiti.frms.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class TicketRequest {
    
	
	@NotNull(message = "CustomerId must not be null")
    @Pattern(regexp = "^\\d{10}$", message = "CustomerId must be exactly 10 digits and numeric")
    private String customerId;
	
    @NotNull(message = "Description must not be null")
    @NotBlank(message = "Description must not be blank")
    @Size(min = 1, max = 100, message = "Description must be between 1 and 100 characters")
    private String description;

  
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
}
