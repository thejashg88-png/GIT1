package com.girmiti.frms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.girmiti.frms.dto.TicketRequest;
import com.girmiti.frms.dto.TicketResponse;
import com.girmiti.frms.service.TicketService;

@RestController
@RequestMapping("/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketService service;

    @PostMapping
    public TicketResponse createTicket(@RequestBody TicketRequest request) {
        return service.createTicket(request);
    }

    @GetMapping
    public List<TicketResponse> getAllTickets() {
        return service.getAllTickets();
    }
}