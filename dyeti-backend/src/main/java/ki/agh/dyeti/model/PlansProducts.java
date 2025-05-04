package ki.agh.dyeti.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import ki.agh.dyeti.model.util.PlansProductsId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "plans_products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(PlansProductsId.class)
public class PlansProducts {

  @Id private Integer planId;

  @Id private Integer productId;

  private Double quantity;
}
