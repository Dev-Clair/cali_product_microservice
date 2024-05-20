<?php

namespace App\Document;

use ApiPlatform\Doctrine\Odm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Odm\Filter\RangeFilter;
use ApiPlatform\Doctrine\Odm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ProductRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations\Field;
use Doctrine\ODM\MongoDB\Mapping\Annotations\Id;
use Symfony\Component\Serializer\Annotation\Groups;

#[Document(
    db: 'productservice',
    collection: "products",
    repositoryClass: ProductRepository::class
)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post()
    ],
    normalizationContext: ['groups' => ['product.read']],
    denormalizationContext: ['groups' => ['product.write']],
)]
#[ApiFilter(
    filterClass: SearchFilter::class,
    properties: [
        'name' => 'partial',
        'price' => 'exact',
        'category' => 'exact'
    ]
)]
#[ApiFilter(
    filterClass: OrderFilter::class,
    properties: [
        'name',
        'price'
    ]
)]
class Product
{
    #[ApiProperty(identifier: true)]
    #[Id(strategy: 'UUID', type: 'string')]
    private ?string $id = null;

    #[Field()]
    private ?string $product_id = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field()]
    private ?string $name = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field()]
    private ?string $description = null;

    #[ApiProperty(identifier: false)]
    #[Groups(['product.read', 'product.write'])]
    #[Field()]
    private ?string $slug = null;

    #[ApiFilter(filterClass: RangeFilter::class, properties: ['product_price'])]
    #[Groups(['product.read', 'product.write'])]
    #[Field()]
    private ?string $price = null;

    // #[Groups(['product.read'])]
    // #[Field(nullable: true)]
    // private ?int $stock_quantity = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field()]
    private ?string $status = null;

    // #[Groups(['product.read'])]
    // #[Field(type: Types::DATETIME_MUTABLE)]
    // private ?\DateTimeInterface $production_date = null;

    // #[Groups(['product.read'])]
    // #[Field(type: Types::DATETIME_MUTABLE)]
    // private ?\DateTimeInterface $expiry_date = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field(nullable: true)]
    private ?\DateInterval $warranty = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field(nullable: true)]
    private ?array $colors = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field(nullable: true)]
    private ?array $sizes = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field(nullable: true)]
    private ?string $weight = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field(nullable: true)]
    private ?string $image_path = null;

    #[Groups(['product.read', 'product.write'])]
    #[Field(nullable: true)]
    private ?string $category = null;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getProductID(): ?string
    {
        return $this->product_id;
    }

    public function setProductID(string $product_id): static
    {
        $this->product_id = $product_id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    // public function getStockQuantity(): ?int
    // {
    //     return $this->stock_quantity;
    // }

    // public function setStockQuantity(?int $stock_quantity): static
    // {
    //     $this->stock_quantity = $stock_quantity;

    //     return $this;
    // }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    // public function getProductionDate(): ?\DateTimeInterface
    // {
    //     return $this->production_date;
    // }

    // public function setProductionDate(\DateTimeInterface $production_date): static
    // {
    //     $this->production_date = $production_date;

    //     return $this;
    // }

    // public function getExpiryDate(): ?\DateTimeInterface
    // {
    //     return $this->expiry_date;
    // }

    // public function setExpiryDate(\DateTimeInterface $expiry_date): static
    // {
    //     $this->expiry_date = $expiry_date;

    //     return $this;
    // }

    public function getWarranty(): ?\DateInterval
    {
        return $this->warranty;
    }

    public function setWarranty(?\DateInterval $warranty): static
    {
        $this->warranty = $warranty;

        return $this;
    }

    public function getColors(): ?array
    {
        return $this->colors;
    }

    public function setColors(?array $colors): static
    {
        $this->colors = $colors;

        return $this;
    }

    public function getSizes(): ?array
    {
        return $this->sizes;
    }

    public function setSizes(?array $sizes): static
    {
        $this->sizes = $sizes;

        return $this;
    }

    public function getWeight(): ?string
    {
        return $this->weight;
    }

    public function setWeight(?string $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->image_path;
    }

    public function setImagePath(?string $image_path): static
    {
        $this->image_path = $image_path;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): static
    {
        $this->category = $category;

        return $this;
    }
}
