package ki.agh.dyeti.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String planName;
    private java.time.LocalDateTime planDate;
    private Integer energyReq;
    private Integer proteinReq;
    private Integer fatReq;
    private Integer carbsReq;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
