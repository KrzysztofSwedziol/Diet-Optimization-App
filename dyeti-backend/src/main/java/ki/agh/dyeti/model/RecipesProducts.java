package ki.agh.dyeti.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
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
    private Integer recipeId;

    @Id
    private Integer productId;

    private Double quantity;
    private PortionType portionType;
}
