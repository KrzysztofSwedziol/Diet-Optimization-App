package ki.agh.dyeti.service;

import ki.agh.dyeti.dto.UnitDTO;
import ki.agh.dyeti.exception.ResourceNotFoundException;
import ki.agh.dyeti.model.Unit;
import ki.agh.dyeti.repository.UnitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitService {
    private final UnitRepository unitRepository;

    public UnitService(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    public List<UnitDTO> getAllUnits() {
        return unitRepository.findAll().stream()
            .map(UnitDTO::fromEntity)
            .collect(Collectors.toList());
    }

    public UnitDTO getUnit(Long id) {
        return unitRepository.findById(id)
            .map(UnitDTO::fromEntity)
            .orElseThrow(() -> new ResourceNotFoundException("Unit with id " + id + " not found"));
    }

    public UnitDTO createUnit(UnitDTO unitDTO) {
        Unit unit = Unit.builder()
            .name(unitDTO.name())
            .symbol(unitDTO.symbol())
            .build();

        Unit savedUnit = unitRepository.save(unit);

        return UnitDTO.fromEntity(savedUnit);
    }

    public UnitDTO updateUnit(Long id, UnitDTO unitDTO) {
        Unit unit = unitRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Unit with id " + id + " not found"));

        if (unitDTO.name() != null) {
            unit.setName(unitDTO.name());
        }
        if (unitDTO.symbol() != null) {
            unit.setSymbol(unitDTO.symbol());
        }

        Unit updatedUnit = unitRepository.save(unit);

        return UnitDTO.fromEntity(updatedUnit);
    }

    public UnitDTO deleteUnit(Long id) {
        Unit unit = unitRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Unit with id " + id + " not found"));

        unitRepository.delete(unit);

        return UnitDTO.fromEntity(unit);
    }
}
