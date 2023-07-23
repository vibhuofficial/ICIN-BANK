package com.icinbank.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.icinbank.model.Accounts;
import com.icinbank.model.Message;
import com.icinbank.service.AccountsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class AccountsController {
	
	@Autowired
	private AccountsService accountsService;
	
	@GetMapping("/accounts")
	public List<Accounts> getAllAccounts() {
		return this.accountsService.getAllAccounts();
	}
	
	@GetMapping("/accounts/{accountNumber}")
	public Accounts getAccount(@PathVariable String accountNumber) {
		return this.accountsService.getAccount(accountNumber);
	}
	
	@GetMapping("/accounts/isNetBankingActivated/{accountNumber}")
	public boolean checkIfNetBankingActivated(@PathVariable String accountNumber) {
		return this.accountsService.isNetBankingReg(accountNumber);
	}
	
	@PostMapping("/accounts/add-account")
	public Message addAccount(@RequestBody Accounts account) {
		this.accountsService.putAccount(account);
		return new Message("Account Added!");
	}
	
	@GetMapping("/accounts/netbankingenable/{status}/{accountNumber}")
	public Message enableNetBanking(@PathVariable int status, @PathVariable String accountNumber) {
		Message message = new Message(this.accountsService.updateAccountNetBankingStatus(1, accountNumber));
		return message;
	}
	
	@GetMapping("/accounts/unregisteredUsers")
	public List<Accounts> getUnregisteredAccounts() {
		return this.accountsService.getAllUnregisteredUsers();
	}
	
	@GetMapping("/accounts/depositSavings/{balance}/{accountNumber}")
	public Message depositSavings(@PathVariable int balance, @PathVariable String accountNumber) {
		Message message = new Message(this.accountsService.depositSavings(balance, accountNumber));
		return message;
	}
	
	@GetMapping("/accounts/depositPrimary/{balance}/{accountNumber}")
	public Message depositPrimary(@PathVariable int balance, @PathVariable String accountNumber) {
		Message message = new Message(this.accountsService.depositPrimary(balance, accountNumber));
		return message;
	}
	
	@GetMapping("/accounts/withdrawSavings/{balance}/{accountNumber}")
	public Message withdrawSavings(@PathVariable int balance, @PathVariable String accountNumber) {
		Message message = new Message(this.accountsService.withdrawSavings(balance, accountNumber));
		return message;
	}
	
	@GetMapping("/accounts/withdrawPrimary/{balance}/{accountNumber}")
	public Message withdrawPrimary(@PathVariable int balance, @PathVariable String accountNumber) {
		Message message = new Message(this.accountsService.withdrawPrimary(balance, accountNumber));
		return message;
	}

}
