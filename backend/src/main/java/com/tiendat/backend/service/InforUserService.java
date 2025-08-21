package com.tiendat.backend.service;
import java.util.List;

import com.tiendat.backend.entity.InforUser;

import jakarta.servlet.http.HttpSession;
public interface InforUserService {
    public InforUser createInforUser(InforUser inforUser,HttpSession session);
    public InforUser updateStatus(Long inforUserId,HttpSession session);
    public List<InforUser> getallByUser(HttpSession session);
    public void deletId(Long inforUserId);
    public InforUser updateInforUser(Long inforUserId,InforUser inforUser);
}