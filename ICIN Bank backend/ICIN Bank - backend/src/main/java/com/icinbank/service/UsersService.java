package com.icinbank.service;

import java.util.List;

import com.icinbank.model.Users;

public interface UsersService {
	
	public Users getUserViaUserId(String loginUserId);
	public String putUser(Users user);
	public String updateLoginPassword(String newPassword, String accountNumber);
	public String checkUserByIdAndPassword(String loginUserId, String loginUserPassword);
	public String blockUser(String loginUserId);
	public String unblockUser(String loginUserId);
	public List<Users> getAllBlockedUser();
	public List<Users> getAllUser();

}
