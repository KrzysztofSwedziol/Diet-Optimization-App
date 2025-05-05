package ki.agh.dyeti.model.util;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlansProductsId implements Serializable {
  private Long planId;
  private Long productId;
}
