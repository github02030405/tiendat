package com.tiendat.backend.entity;

import java.util.Base64;

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
@Entity
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 1000)
    private String name;
    @Lob
    @Column(name = "imagedata", columnDefinition = "MEDIUMBLOB")
    private byte[] imageData;
    @ManyToOne
    @JsonIgnoreProperties("galleries")
    private Product  product;
}