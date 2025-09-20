package ki.agh.dyeti.dto;

import java.time.LocalDateTime;
import ki.agh.dyeti.model.Plan;
// TODO: Synchronize it with new version of algo this is jus placeholder for my scope, add products here

public record PlanDTO(
        String planName,
        String planDescription,
        LocalDateTime planDate,
        Integer energyReq,
        Integer proteinReq,
        Integer carbsReq,
        Integer fatReq) {
    public static PlanDTO fromEntity(Plan plan) {
        return new PlanDTO(
                plan.getPlanName(),
                plan.getPlanDescription(),
                plan.getPlanDate(),
                plan.getEnergyReq(),
                plan.getProteinReq(),
                plan.getCarbsReq(),
                plan.getFatReq());
    }
}
