<?php

namespace App\MessageHandler;

use App\Message\ProductMessage;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
final class ProductMessageHandler
{
    public function __invoke(ProductMessage $message)
    {
        // do something with your message
    }
}
