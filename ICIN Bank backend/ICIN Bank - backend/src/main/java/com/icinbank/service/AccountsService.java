package com.icinbank.service;

import java.util.List;

import com.icinbank.model.Accounts;

public interface AccountsService {
	
	public List<Accounts> getAllAccounts();
	public Accounts getAccount(String accountNumber);
	public boolean isNetBankingReg(String accountNumber);
	public String putAccount(Accounts account);
	public String updateAccountNetBankingStatus(int status, String accountNumber);
	public List<Accounts> getAllUnregisteredUsers();
	public String depositPrimary(int balance, String accountNumber);
	public String depositSavings(int balance, String accountNumber);
	public String withdrawPrimary(int balance, String accountNumber);
	public String withdrawSavings(int balance, String accountNumber);
}
