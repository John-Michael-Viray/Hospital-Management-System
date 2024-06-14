<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                "Apple iPhone 13",
                "Samsung Galaxy S21 Ultra",
                "OnePlus 10 Pro",
                "Xiaomi Mi 11",
                "Google Pixel 6 Pro",
                "OPPO Find X5 Pro",
                "Vivo X70 Pro+",
                "Realme GT 2 Pro",
                "Asus ROG Phone 5",
                "Nokia X20"
            ]),
            'description' => $this->faker->randomElement([
                "Flagship iPhone with powerful performance.",
                "Premium Android phone with a stunning display.",
                "Smooth performance with OxygenOS.",
                "Affordable flagship with high-resolution display.",
                "Great camera with vibrant display.",
                "Sleek design with focus on camera.",
                "Balanced performance and camera quality.",
                "Powerful chipset with fast charging.",
                "Gaming-focused with high-refresh-rate display.",
                "Durable with clean Android experience."
            ]),
            'price' => $this->faker->randomElement([
                49999.99,
                65999.99,
                48999.99,
                39999.99,
                55000.99,
                59999.99,
                44999.99,
                34999.99,
                44999.99,
                19999.99
            ]),
        ];
    }
}
