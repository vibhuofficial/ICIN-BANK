package com.icinbank.service;

import java.util.List;

import com.icinbank.model.FrontendTransaction;
import com.icinbank.model.Transactions;

public interface TransactionsService {
	
	public List<Transactions> getAllPendingTransactions();
	public String addTransaction(Transactions transactions);
	public List<FrontendTransaction> getTransactionsForAccountNumber(String accountNumber);
	public List<FrontendTransaction> getFilteredTransactions(String accountNumber, String startDate, String endDate);
	String updateTransaction(int id);
}
