package ki.agh.dyeti.model;

import jakarta.persistence.*;
import ki.agh.dyeti.model.util.RecipesProductsId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "recipes_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(RecipesProductsId.class)
public class RecipesProducts {

    @Id
    private Long recipeId;

    @Id
    private Long productId;

    private Double quantity;

    @Enumerated(EnumType.STRING)
    private PortionType portionType;
}
