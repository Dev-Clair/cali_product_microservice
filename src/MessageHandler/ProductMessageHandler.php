<?php

namespace App\MessageHandler;

use App\Document\Product;
use App\Message\ProductMessage;
use App\Repository\ProductRepository;
use Doctrine\ODM\MongoDB\DocumentManager;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class ProductMessageHandler
{
    public function __construct(
        private DocumentManager $documentManager,
        private ProductRepository $productRepository,
        private LoggerInterface $logger
    ) {
    }

    public function __invoke(ProductMessage $message)
    {
        $operation = $message->getOperation();

        $payload = $message->getPayload();

        switch ($operation) {
            case 'post':
                $product = new Product();
                $product->setProductID($payload['product_id']);
                $product->setName($payload['name']);
                $product->setDescription($payload['description']);
                $product->setSlug($payload['slug']);
                $product->setStatus($payload['status']);
                $product->setWarranty($payload['warranty']);
                $product->setColors($payload['colors']);
                $product->setSizes($payload['sizes']);
                $product->setWeight($payload['weight']);
                $product->setImagePath($payload['image_path']);
                $product->setCategory($payload['category']);

                $this->create($product);
                break;

            case 'patch':
                $product_id = $payload['product_id'];

                $product = $this->productRepository->findOneBy(['product_id' => $product_id]);

                if (empty($product)) {
                    $this->logger->error(
                        'Cannot find product',
                        [
                            'operation' => 'PATCH',
                            'product_id' => $product_id,
                        ]
                    );
                    exit();
                }

                $payload['name'] ?? $product->setName($payload['name']);
                $payload['description'] ?? $product->setDescription($payload['description']);
                $payload['slug'] ?? $product->setSlug($payload['slug']);
                $payload['status'] ?? $product->setStatus($payload['status']);
                $payload['warranty'] ?? $product->setWarranty($payload['warranty']);
                $payload['colors'] ?? $product->setColors($payload['colors']);
                $payload['sizes'] ?? $product->setSizes($payload['sizes']);
                $payload['weight'] ?? $product->setWeight($payload['weight']);
                $payload['image_path'] ?? $product->setImagePath($payload['image_path']);
                $payload['category'] ?? $product->setCategory($payload['category']);

                $this->update($product);
                break;

            case 'delete':
                $product_id = $payload['product_id'];

                $product = $this->productRepository->findOneBy(['product_id' => $product_id]);

                if (empty($product)) {
                    $this->logger->error(
                        'Cannot find product',
                        [
                            'operation' => 'DELETE',
                            'product_id' => $product_id,
                        ]
                    );
                    exit();
                }

                $this->remove($product);
                break;

            default:
                throw new \RuntimeException('Invalid Product Operation');
                break;
        }
    }

    private function create(Product $product)
    {
        $this->documentManager->persist($product);
        $this->documentManager->flush();
    }

    private function update()
    {
        $this->documentManager->flush();
    }

    private function remove(Product $product)
    {
        $this->documentManager->remove($product);
        $this->documentManager->flush();
    }
}
