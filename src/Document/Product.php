<?php

namespace App\Document;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ODM\MongoDB\Id\UuidGenerator;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

#[ODM\Document(collection: "products", repositoryClass: ProductRepository::class)]
#[ApiResource]
class Product
{
    #[ODM\Id(strategy: 'none', type: 'uuid')]
    #[ODM\Field]
    private ?UuidGenerator $id = null;

    #[ODM\Field(length: 255)]
    private ?string $name = null;

    #[ODM\Field(length: 255)]
    private ?string $description = null;

    #[ODM\Field(length: 255)]
    private ?string $slug = null;

    #[ODM\Field(type: Types::DECIMAL, precision: 5, scale: 2)]
    private ?string $price = null;

    #[ODM\Field(nullable: true)]
    private ?int $stock_quantity = null;

    #[ODM\Field(length: 255)]
    private ?string $status = null;

    #[ODM\Field(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $production_date = null;

    #[ODM\Field(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $expiry_date = null;

    #[ODM\Field(nullable: true)]
    private ?\DateInterval $warranty = null;

    #[ODM\Field(type: Types::SIMPLE_ARRAY, nullable: true)]
    private ?array $colors = null;

    #[ODM\Field(type: Types::SIMPLE_ARRAY, nullable: true)]
    private ?array $sizes = null;

    #[ODM\Field(length: 255, nullable: true)]
    private ?string $weight = null;

    #[ODM\Field(length: 255, nullable: true)]
    private ?string $image = null;

    #[ODM\Field(length: 100, nullable: true)]
    private ?string $category = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getStockQuantity(): ?int
    {
        return $this->stock_quantity;
    }

    public function setStockQuantity(?int $stock_quantity): static
    {
        $this->stock_quantity = $stock_quantity;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getProductionDate(): ?\DateTimeInterface
    {
        return $this->production_date;
    }

    public function setProductionDate(\DateTimeInterface $production_date): static
    {
        $this->production_date = $production_date;

        return $this;
    }

    public function getExpiryDate(): ?\DateTimeInterface
    {
        return $this->expiry_date;
    }

    public function setExpiryDate(\DateTimeInterface $expiry_date): static
    {
        $this->expiry_date = $expiry_date;

        return $this;
    }

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
