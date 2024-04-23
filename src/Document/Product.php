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
use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ODM\MongoDB\Id\UuidGenerator;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ODM\Document(
    db: 'productservice',
    collection: "products",
    repositoryClass: ProductRepository::class
)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    normalizationContext: ['groups' => ['product.read']]
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
    #[ApiProperty(identifier: false)]
    #[ODM\Id(strategy: 'NONE', type: 'uuid')]
    #[ODM\Field]
    private ?UuidGenerator $id = null;

    #[ODM\Field(length: 100)]
    private ?string $product_id = null;

    #[Groups(['product.read'])]
    #[ODM\Field(length: 255)]
    private ?string $name = null;

    #[Groups(['product.read'])]
    #[ODM\Field(length: 255)]
    private ?string $description = null;

    #[ApiProperty(identifier: true)]
    #[Groups(['product.read'])]
    #[ODM\Field(length: 255)]
    private ?string $slug = null;

    #[ApiFilter(filterClass: RangeFilter::class, properties: ['product_price'])]
    #[Groups(['product.read'])]
    #[ODM\Field(type: Types::DECIMAL, precision: 5, scale: 2)]
    private ?string $price = null;

    // #[Groups(['product.read'])]
    // #[ODM\Field(nullable: true)]
    // private ?int $stock_quantity = null;

    #[Groups(['product.read'])]
    #[ODM\Field(length: 255)]
    private ?string $status = null;

    // #[Groups(['product.read'])]
    // #[ODM\Field(type: Types::DATETIME_MUTABLE)]
    // private ?\DateTimeInterface $production_date = null;

    // #[Groups(['product.read'])]
    // #[ODM\Field(type: Types::DATETIME_MUTABLE)]
    // private ?\DateTimeInterface $expiry_date = null;

    #[Groups(['product.read'])]
    #[ODM\Field(nullable: true)]
    private ?\DateInterval $warranty = null;

    #[Groups(['product.read'])]
    #[ODM\Field(type: Types::SIMPLE_ARRAY, nullable: true)]
    private ?array $colors = null;

    #[Groups(['product.read'])]
    #[ODM\Field(type: Types::SIMPLE_ARRAY, nullable: true)]
    private ?array $sizes = null;

    #[Groups(['product.read'])]
    #[ODM\Field(length: 255, nullable: true)]
    private ?string $weight = null;

    #[Groups(['product.read'])]
    #[ODM\Field(length: 255, nullable: true)]
    private ?string $image = null;

    #[Groups(['product.read'])]
    #[ODM\Field(length: 100, nullable: true)]
    private ?string $category = null;

    public function getId(): ?UuidGenerator
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

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

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
