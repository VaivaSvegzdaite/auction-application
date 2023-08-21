package com.auctionapp.service;

import com.auctionapp.model.auction.Auction;
import com.auctionapp.model.product.Product;
import com.auctionapp.repository.AuctionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;

    public AuctionService (AuctionRepository auctionRepository)
    {
        this.auctionRepository = auctionRepository;
    }

    public Auction createAuction (Auction auction)
    {
        return auctionRepository.save(auction);
    }

    public List<Auction> getAllAuctions()
    {
        return auctionRepository.findAll();
    }

    public Optional<Auction> getAuctionById (Long id)
    {
        return auctionRepository.findById(id);
    }

    public Auction updateAuction (Auction auction)
    {
        return auctionRepository.save(auction);
    }

    public void deleteAuction (Long id)
    {
        auctionRepository.deleteById(id);
    }
}