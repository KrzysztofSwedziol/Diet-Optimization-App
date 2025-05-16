package ki.agh.dyeti.service;

import ki.agh.dyeti.repository.PlansProductsRepository;
import ki.agh.dyeti.repository.ProductRepository;
import ki.agh.dyeti.repository.RecipesProductsRepository;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final PlansProductsRepository plansProductsRepository;
    private final RecipesProductsRepository recipesProductsRepository;

    public ProductService(
            ProductRepository productRepository,
            PlansProductsRepository plansProductsRepository,
            RecipesProductsRepository recipesProductsRepository) {
        this.productRepository = productRepository;
        this.plansProductsRepository = plansProductsRepository;
        this.recipesProductsRepository = recipesProductsRepository;
    }
}
