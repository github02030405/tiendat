package com.tiendat.backend.entity;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullname;
    private String email;
    private String phone_number;
    private String address;
    private String password;
    private Date create_at;
    private Date updated_at;
    private int deleted;
    private String thumbnail;
    @OneToMany (mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore  
    List<Orders>order;
    @OneToMany(mappedBy = "user")
    @JsonIgnore  
    List<InforUser>inforUser;
}
