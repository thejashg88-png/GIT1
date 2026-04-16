package com.girmiti.frms.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.girmiti.frms.dto.TicketRequest;
import com.girmiti.frms.dto.TicketResponse;
import com.girmiti.frms.exception.ValidationException;
import com.girmiti.frms.model.Ticket;
import com.girmiti.frms.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository repository;

    public TicketResponse createTicket(TicketRequest request) {

    	if (request.getCustomerId() == null || request.getCustomerId().isEmpty()) {
    	    throw new ValidationException("Customer ID is required");
    	}

    	if (request.getDescription() == null || request.getDescription().isEmpty()) {
    	    throw new ValidationException("Description is required");
    	}
    	
        Ticket ticket = new Ticket();
        ticket.setCustomerId(request.getCustomerId());
        ticket.setDescription(request.getDescription());
        ticket.setStatus("OPEN");

        Ticket saved = repository.save(ticket);
        

        return new TicketResponse(
                saved.getTicketId(),
                saved.getCustomerId(),
                saved.getDescription(),
                saved.getStatus()
        );
    }

    public List<TicketResponse> getAllTickets() {
        return repository.findAll()
                .stream()
                .map(t -> new TicketResponse(
                        t.getTicketId(),
                        t.getCustomerId(),
                        t.getDescription(),
                        t.getStatus()))
                .collect(Collectors.toList());
    }
}