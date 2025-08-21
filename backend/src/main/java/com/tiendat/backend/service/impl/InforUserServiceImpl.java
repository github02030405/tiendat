package com.tiendat.backend.service.impl;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiendat.backend.entity.InforUser;
import com.tiendat.backend.entity.User;
import com.tiendat.backend.repository.InforUserRespository;
import com.tiendat.backend.service.InforUserService;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Service
public class InforUserServiceImpl implements InforUserService{
    @Autowired
    private InforUserRespository inforUserRespository;
    @Override
    public InforUser createInforUser(InforUser inforUser,HttpSession session) {
        User user = (User) session.getAttribute("user");
        List<InforUser> listinfor=inforUserRespository.findallByUser(user.getId());
      //   if(listinfor.size()==0 ||listinfor == null){
      //     inforUser.setStatus(1);
      // }
      for (InforUser i : listinfor) {
        if(i.getStatus()==1){
            i.setStatus(0);
            inforUserRespository.save(i);
        }
       }
       inforUser.setStatus(1);
        inforUser.setUser(user);
        inforUser.setDate(new Date());
      return inforUserRespository.save(inforUser);
    }
    @Override
    public InforUser updateStatus(Long inforUserId, HttpSession session) {
      User user=(User) session.getAttribute("user");
        List<InforUser>allInfor = inforUserRespository.findallByUser(user.getId());
     Optional <InforUser> optionalinfor = inforUserRespository.findById(inforUserId);
      if(!optionalinfor .isPresent()){
        throw new IllegalArgumentException("Order with ID " + inforUserId + " not found");
    }
    InforUser infor = optionalinfor.get();
       if(infor.getStatus()==0){
        infor.setStatus(1);
       }
       inforUserRespository.save(infor);
       for (InforUser i : allInfor) {
        if(!i.getId().equals(infor.getId())){
            i.setStatus(0);
            inforUserRespository.save(i);
        }
       }
       return infor;
    }
    @Override
    public List<InforUser> getallByUser(HttpSession session) {
      User user =(User) session.getAttribute("user");
     return inforUserRespository.findallByUser(user.getId());
    }
    @Override
    public InforUser updateInforUser(Long inforUserId, InforUser inforUser) {
      Optional<InforUser> optionalinforUser =inforUserRespository.findById(inforUserId);
      if(!optionalinforUser.isPresent()){
        throw new IllegalArgumentException("không có data");
      }
      InforUser t=optionalinforUser.get();
      t.setAddress(inforUser.getAddress());
      t.setPhone_number(inforUser.getPhone_number());
      t.setFullname(inforUser.getFullname());
      return t;
    }
    @Override
    public void deletId(Long inforUserId) {
       inforUserRespository.deleteById(inforUserId);
    }
}
