package ki.agh.dyeti.model.util;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipesProductsId implements Serializable {
  private Long recipeId;
  private Long productId;
}
