package com.tiendat.backend.entity;
    
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonIgnore;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class InforUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullname;
    private String phone_number;
    private String address;
    private Date date;
    private Integer status;
    @ManyToOne 
    private User user;
    @OneToMany(mappedBy = "inforUser")
    @JsonIgnore
    private List<Orders> orders;
}
