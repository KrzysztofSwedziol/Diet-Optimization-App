package ki.agh.dyeti.service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import ki.agh.dyeti.dto.ProductDTO;
import ki.agh.dyeti.dto.ProductPreferenceDTO;
import ki.agh.dyeti.exception.AccessDeniedException;
import ki.agh.dyeti.exception.ResourceNotFoundException;
import ki.agh.dyeti.model.Product;
import ki.agh.dyeti.model.ProductPreference;
import ki.agh.dyeti.model.Role;
import ki.agh.dyeti.model.User;
import ki.agh.dyeti.model.util.ProductPreferenceId;
import ki.agh.dyeti.repository.ProductPreferenceRepository;
import ki.agh.dyeti.repository.ProductRepository;
import ki.agh.dyeti.security.CurrentUserProvider;
import ki.agh.dyeti.security.ResourceAccessValidator;
import org.springframework.stereotype.Service;

@Service
public class ProductPreferenceService {

    private final ProductPreferenceRepository productPreferenceRepository;
    private final ProductRepository productRepository;
    private final CurrentUserProvider currentUserProvider;
    private final ResourceAccessValidator resourceAccessValidator;

    public ProductPreferenceService(
            ProductPreferenceRepository productPreferenceRepository,
            ProductRepository productRepository,
            CurrentUserProvider currentUserProvider,
            ResourceAccessValidator resourceAccessValidator) {
        this.productPreferenceRepository = productPreferenceRepository;
        this.productRepository = productRepository;
        this.currentUserProvider = currentUserProvider;
        this.resourceAccessValidator = resourceAccessValidator;
    }

    public List<ProductPreferenceDTO> getAllProductPreferences() {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        if (currentUser.getRole() == Role.ADMIN) {
            return productPreferenceRepository.findAll().stream()
                    .map(ProductPreferenceDTO::fromEntity)
                    .collect(Collectors.toList());
        }

        List<Product> products = productRepository.findAllByOwnerIsNullOrOwner(currentUser);
        Map<Long, Double> preferenceMap = productPreferenceRepository.findByOwnerId(currentUser.getId()).stream()
                .collect(Collectors.toMap(
                        preference -> preference.getProduct().getId(), ProductPreference::getPreference));

        return products.stream()
                .map(product -> new ProductPreferenceDTO(
                        ProductDTO.fromEntity(product), preferenceMap.getOrDefault(product.getId(), 0.0)))
                .collect(Collectors.toList());
    }

    public List<ProductPreferenceDTO> getProductPreferencesByUserId(Long userId) {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        if (currentUser.getRole() == Role.ADMIN || currentUser.getId().equals(userId)) {
            return productPreferenceRepository.findByOwnerId(currentUser.getId()).stream()
                    .map(ProductPreferenceDTO::fromEntity)
                    .collect(Collectors.toList());
        }

        throw new AccessDeniedException("You do not have permission to access this resource");
    }

    @Transactional
    public ProductPreferenceDTO createProductPreference(ProductPreferenceDTO productPreferenceDTO) {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        if (productPreferenceDTO.preference() == null
                || productPreferenceDTO.preference() <= ProductPreference.LOWEST_PREFERENCE
                || productPreferenceDTO.preference() > ProductPreference.HIGHEST_PREFERENCE) {
            throw new IllegalArgumentException("Preference must be between 0 and 10");
        }

        Product product = productRepository
                .findById(productPreferenceDTO.product().id())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Product with id " + productPreferenceDTO.product().id() + " does not exist"));

        ProductPreferenceId id = new ProductPreferenceId(currentUser.getId(), product.getId());

        if (productPreferenceRepository.existsById(id)) {
            throw new IllegalStateException("Product preference with id " + id + " already exists");
        }

        ProductPreference productPreference = ProductPreference.builder()
                .id(id)
                .owner(currentUser)
                .product(product)
                .preference(productPreferenceDTO.preference())
                .build();

        ProductPreference savedProductPreference = productPreferenceRepository.save(productPreference);

        return ProductPreferenceDTO.fromEntity(savedProductPreference);
    }

    @Transactional
    public ProductPreferenceDTO updateProductPreference(ProductPreferenceDTO productPreferenceDTO) {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        ProductPreferenceId id = new ProductPreferenceId(
                currentUser.getId(), productPreferenceDTO.product().id());

        return productPreferenceRepository
                .findById(id)
                .map(existingProductPreference -> {
                    // Preference exists → update
                    existingProductPreference.setPreference(productPreferenceDTO.preference());
                    ProductPreference updated = productPreferenceRepository.save(existingProductPreference);
                    return ProductPreferenceDTO.fromEntity(updated);
                })
                .orElseGet(() -> {
                    // Preference does not exist → create
                    return createProductPreference(productPreferenceDTO);
                });
    }

    @Transactional
    public ProductPreferenceDTO deleteProductPreference(Long productId) {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        ProductPreferenceId id = new ProductPreferenceId(currentUser.getId(), productId);
        ProductPreference exisitingProductPreference = productPreferenceRepository
                .findById(id)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Product preference with id " + id + " does not exist"));

        resourceAccessValidator.validateOwnership(exisitingProductPreference);

        productPreferenceRepository.delete(exisitingProductPreference);

        return ProductPreferenceDTO.fromEntity(exisitingProductPreference);
    }

    public Map<Product, Double> getProductPreferencesMapByUserId(Long userId) {
        User currentUser = currentUserProvider
                .getCurrentUser()
                .orElseThrow(() -> new IllegalStateException("Current user is not logged in"));

        if (currentUser.getRole() == Role.ADMIN || currentUser.getId().equals(userId)) {
            return productPreferenceRepository.findByOwnerId(userId).stream()
                    .collect(Collectors.toMap(ProductPreference::getProduct, ProductPreference::getPreference));
        }

        throw new AccessDeniedException("You do not have permission to access this resource");
    }
}
