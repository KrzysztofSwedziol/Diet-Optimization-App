package ki.agh.dyeti.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean uncountable;
    private String productName;
    private Integer kcal100g;
    private Integer protein100g;
    private Integer carbs100g;
    private Integer fat100g;
}
