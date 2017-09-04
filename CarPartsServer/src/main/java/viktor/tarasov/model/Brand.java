package viktor.tarasov.model;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;
import java.util.List;

import static lombok.AccessLevel.PRIVATE;

@Getter
@Entity
@FieldDefaults(level = PRIVATE)
public class Brand {

    @Id
    @GeneratedValue
    Integer id;


    @Setter
    @Column(nullable = false)
    String name;


    @Setter
    @OneToMany(mappedBy = "brand")
    List<CarModel> models;
}
