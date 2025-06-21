package ki.agh.dyeti.service;

import java.util.List;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.ProductDTO;
import ki.agh.dyeti.dto.request.ProductRequestDTO;
import ki.agh.dyeti.exception.ResourceNotFoundException;
import ki.agh.dyeti.model.Product;
import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.Unit;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.repository.ProductRepository;
import ki.agh.dyeti.repository.UnitRepository;
import ki.agh.dyeti.security.CurrentUserProvider;
import ki.agh.dyeti.security.ResourceAccessValidator;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final UnitRepository unitRepository;
    private final ResourceAccessValidator resourceAccessValidator;
    private final CurrentUserProvider currentUserProvider;

    public ProductService(
            ProductRepository productRepository,
            UnitRepository unitRepository,
            ResourceAccessValidator resourceAccessValidator,
            CurrentUserProvider currentUserProvider) {
        this.productRepository = productRepository;
        this.unitRepository = unitRepository;
        this.resourceAccessValidator = resourceAccessValidator;
        this.currentUserProvider = currentUserProvider;
    }

    public ProductDTO getProduct(Long id) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + id + " not found"));

        resourceAccessValidator.validateOwnership(product);

        return ProductDTO.fromEntity(product);
    }

    public List<ProductDTO> getAllProducts() {
        User user = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        if (user.getRole() == Role.ADMIN) {
            return productRepository.findAll().stream()
                    .map(ProductDTO::fromEntity)
                    .collect(Collectors.toList());
        }

        return productRepository.findAllByOwnerIsNullOrOwner(user).stream()
                .map(ProductDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public ProductDTO createProduct(ProductRequestDTO productRequestDTO) {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        Unit unit = unitRepository
                .findById(productRequestDTO.unitId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Unit with id " + productRequestDTO.unitId() + " not found"));

        Product product = Product.builder()
                .name(productRequestDTO.name())
                .unit(unit)
                .gramsPerUnit(productRequestDTO.gramsPerUnit())
                .kcal100g(productRequestDTO.kcal100g())
                .protein100g(productRequestDTO.protein100g())
                .carbs100g(productRequestDTO.carbs100g())
                .fat100g(productRequestDTO.fat100g())
                .owner(currentUser)
                .build();

        Product savedProduct = productRepository.save(product);

        return ProductDTO.fromEntity(savedProduct);
    }

    public ProductDTO updateProduct(Long id, ProductRequestDTO productRequestDTO) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + id + " not found"));

        resourceAccessValidator.validateOwnership(product);

        if (productRequestDTO.name() != null) {
            product.setName(productRequestDTO.name());
        }
        if (productRequestDTO.unitId() != null) {
            Unit unit = unitRepository
                    .findById(productRequestDTO.unitId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid unit ID"));
            product.setUnit(unit);
        }
        if (productRequestDTO.gramsPerUnit() != null) {
            product.setGramsPerUnit(productRequestDTO.gramsPerUnit());
        }
        if (productRequestDTO.kcal100g() != null) {
            product.setKcal100g(productRequestDTO.kcal100g());
        }
        if (productRequestDTO.protein100g() != null) {
            product.setProtein100g(productRequestDTO.protein100g());
        }
        if (productRequestDTO.carbs100g() != null) {
            product.setCarbs100g(productRequestDTO.carbs100g());
        }
        if (productRequestDTO.fat100g() != null) {
            product.setFat100g(productRequestDTO.fat100g());
        }

        Product updated = productRepository.save(product);
        return ProductDTO.fromEntity(updated);
    }

    public ProductDTO deleteProduct(Long id) {
        Product product = productRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product with id " + id + " not found"));

        resourceAccessValidator.validateOwnership(product);

        productRepository.delete(product);

        return ProductDTO.fromEntity(product);
    }
}
