package viktor.tarasov.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

import static lombok.AccessLevel.PRIVATE;

@Getter
@Entity
@FieldDefaults(level = PRIVATE)
public class CarModel {

    @Id
    @GeneratedValue
    Integer id;

    @Setter
    @Column(nullable = false)
    String name;

    @Setter
    @ManyToOne
    @JsonIgnore
    Brand brand;
}
