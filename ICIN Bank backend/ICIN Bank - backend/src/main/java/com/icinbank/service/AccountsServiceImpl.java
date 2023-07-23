package com.icinbank.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.icinbank.model.Accounts;
import com.icinbank.model.Transactions;
import com.icinbank.repository.AccountsRepository;

@Service(value = "accountsService")
public class AccountsServiceImpl implements AccountsService{
	
	@Autowired
	private AccountsRepository accountsRepository;
	
	@Override
	public List<Accounts> getAllAccounts() {
		return this.accountsRepository.findAll();
	}

	@Override
	public Accounts getAccount(String accountNumber) {
		List<Accounts> list = this.accountsRepository.getAccountByAccountNumber(accountNumber);
		if(list.size() == 0) {
			return null;
		}
		return list.get(0);
	}

	@Override
	public boolean isNetBankingReg(String accountNumber) {
		List<Accounts> list = this.accountsRepository.findAll();
		for(Accounts account : list) {
			if(account.getAccountNumber().equals(accountNumber)) {
				if(account.getAccountIsNetBankingReg() == 0) {
					return false;
				}
				return true;
			}
		}
		return false;
	}

	@Override
	public String putAccount(Accounts account) {
		List<Accounts> accounts = this.accountsRepository.findAll();
		for(Accounts temp : accounts) {
			if(temp.getAccountNumber().equals(account.getAccountNumber())) {
				return "Account already exists!";
			}else {
				this.accountsRepository.save(account);
			}
		}
		return "Account successfully created";
	}

	@Override
	public String updateAccountNetBankingStatus(int status, String accountNumber) {
		this.accountsRepository.updateAccountNetBankingStatus(1, accountNumber);
		return "Account is now net banking enabled";
	}

	@Override
	public List<Accounts> getAllUnregisteredUsers() {
		return this.accountsRepository.getAllUnregisteredUsers(1);
	}

	@Override
	public String depositPrimary(int balance, String accountNumber) {
		this.accountsRepository.depositPrimary(balance, accountNumber);
		return "Deposit to primary account is successful";
	}

	@Override
	public String depositSavings(int balance, String accountNumber) {
		this.accountsRepository.depositSavings(balance, accountNumber);
		return "Deposit to savings account is successful";
	}
	
	@Override
	public String withdrawPrimary(int balance, String accountNumber) {
		this.accountsRepository.depositPrimary(balance, accountNumber);
		return "Withdrawal from primary account is successful";
	}

	@Override
	public String withdrawSavings(int balance, String accountNumber) {
		this.accountsRepository.depositSavings(balance, accountNumber);
		return "Withdrawal from savings account is successful";
	}


}
