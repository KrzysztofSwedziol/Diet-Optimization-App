package ki.agh.dyeti.model;

import jakarta.persistence.*;
import ki.agh.dyeti.model.util.Ownable;
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
public class Product implements Ownable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    @Column(name = "grams_per_unit")
    private Double gramsPerUnit;

    @Column(name = "kcal_100g")
    private Double kcal100g;

    @Column(name = "protein_100g")
    private Double protein100g;

    @Column(name = "carbs_100g")
    private Double carbs100g;

    @Column(name = "fat_100g")
    private Double fat100g;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
