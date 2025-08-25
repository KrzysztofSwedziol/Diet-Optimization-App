package ki.agh.dyeti.model;

import jakarta.persistence.*;
import ki.agh.dyeti.model.util.PlanProductId;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "plan_product")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlanProduct {

    @EmbeddedId
    private PlanProductId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("planId")
    @JoinColumn(name = "plan_id", nullable = false)
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Double quantity;
}
