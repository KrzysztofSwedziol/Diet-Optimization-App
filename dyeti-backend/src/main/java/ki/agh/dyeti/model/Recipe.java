package ki.agh.dyeti.model;

import jakarta.persistence.*;
import ki.agh.dyeti.model.util.Ownable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe implements Ownable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipeName;
    private String description;
    private String steps;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
