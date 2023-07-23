package com.icinbank.service;

import java.util.List;

import com.icinbank.model.Cheque;

public interface ChequeService {
	
	public List<Cheque> getAllChequeBookIssued(String accountNumber);
	public String generateChequeBookRequest(String accountNumber, String accountType);
	public int getChequeBookCount(String accountNumber);
	public String isSomeChequeBookRequested(String accountNumber, String accountType);
	public String changeChequeBookStatus(String chequeBookNumber);
	public List<Cheque> getAllPendingChequeBookRequests();

}
