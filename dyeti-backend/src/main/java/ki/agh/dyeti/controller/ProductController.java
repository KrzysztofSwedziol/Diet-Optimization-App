package ki.agh.dyeti.controller;

import ki.agh.dyeti.dto.ProductDTO;
import ki.agh.dyeti.dto.request.ProductRequestDTO;
import ki.agh.dyeti.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping()
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductDTO getProductById(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PostMapping()
    public ProductDTO createProduct(@RequestBody ProductRequestDTO productRequestDTO) {
        return productService.createProduct(productRequestDTO);
    }

    @PutMapping("/{id}")
    public ProductDTO updateProduct(
        @PathVariable Long id,
        @RequestBody ProductRequestDTO productRequestDTO
    ) {
        return productService.updateProduct(id, productRequestDTO);
    }

    @DeleteMapping("/{id}")
    public ProductDTO deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }
}
