<?php

namespace App\Message;

final class ProductMessage
{
    public function __construct(private array $message)
    {
    }

    public function getOperation(): string
    {
        return $this->message['operation'];
    }

    public function getPayload(): array
    {
        return $this->message['payload'];
    }
}
