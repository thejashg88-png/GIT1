package com.girmiti.frms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.girmiti.frms.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
