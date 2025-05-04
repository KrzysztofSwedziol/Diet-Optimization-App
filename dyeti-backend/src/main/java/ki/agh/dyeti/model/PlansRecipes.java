package ki.agh.dyeti.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import ki.agh.dyeti.model.util.PlansRecipesId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "plans_recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(PlansRecipesId.class)
public class PlansRecipes {

  @Id private Integer planId;

  @Id private Integer recipeId;
}
