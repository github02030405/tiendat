package com.tiendat.backend.entity;
import java.util.Date;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String rote;
    private Date order_date;
    private int total_money;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "order")
    private List<OrderDetail>orderDetails;
    @ManyToOne
    private InforUser inforUser;
    
}