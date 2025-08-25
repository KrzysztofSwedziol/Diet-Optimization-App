package ki.agh.dyeti.controller;

import java.util.List;
import ki.agh.dyeti.dto.UnitDTO;
import ki.agh.dyeti.service.UnitService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/unit")
public class UnitController {
    private final UnitService unitService;

    public UnitController(UnitService unitService) {
        this.unitService = unitService;
    }

    @PostMapping()
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    public UnitDTO createUnit(@RequestBody UnitDTO unitDTO) {
        return unitService.createUnit(unitDTO);
    }

    @GetMapping()
    public List<UnitDTO> getAllUnits() {
        return unitService.getAllUnits();
    }

    @GetMapping("/{id}")
    public UnitDTO getUnit(@PathVariable long id) {
        return unitService.getUnit(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    public UnitDTO updateUnit(@PathVariable long id, @RequestBody UnitDTO unitDTO) {
        return unitService.updateUnit(id, unitDTO);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','OWNER')")
    public UnitDTO deleteUnit(@PathVariable long id) {
        return unitService.deleteUnit(id);
    }
}
