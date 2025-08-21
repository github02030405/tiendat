package com.tiendat.backend.entity;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String title;
    private int price;
    private int discount;
    private String thumbnail;
    private String description;
    private Date created_at;
    private Date update_at;
    private int deleted;
    @ManyToOne
    private Category category;
    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<Gallery>galleries;
    @OneToMany(mappedBy = "product")
    @JsonIgnoreProperties("product")
    private List<OrderDetail>orderDetails;
}
