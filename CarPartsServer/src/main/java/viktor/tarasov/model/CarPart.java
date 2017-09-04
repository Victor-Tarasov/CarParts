package viktor.tarasov.model;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import static lombok.AccessLevel.PRIVATE;

@Getter
@Setter
@Entity
@FieldDefaults(level = PRIVATE)
public class CarPart {

    @Id
    @NotEmpty
    @Size(max = 15)
    @Pattern(regexp = "^[A-Za-z0-9]+$")
    String partCode;

    @NotEmpty
    @Size(max = 120)
    String name;

    @NotEmpty
    @Size(max = 300)
    String description;

    @ManyToOne
    CarModel model;
}
