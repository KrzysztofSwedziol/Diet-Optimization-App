package ki.agh.dyeti.model.util;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductPreferenceId implements Serializable {
    private Long userId;
    private Long productId;
}
