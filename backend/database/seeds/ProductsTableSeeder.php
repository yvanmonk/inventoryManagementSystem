<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductsTableSeeder extends Seeder
{


	 private function randDate()
	{
		return Carbon::createFromDate(null, rand(1, 12), rand(1, 28));
	}

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->delete();
		
		for($i = 0; $i < 20; ++$i)
		{
			$date = $this->randDate();
			DB::table('products')->insert(array(
					'name' => 'name' . $i,
					'description' => 'description' . $i . ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, Exceperuollit anim id est laborum.',
					'barcode' => 'barcode' . $i,
					'statut' => 'statut' . $i,
					'measure' => 'measure' . $i,
					'price' => 'price' . $i,
					'created_at' => $date,
					'updated_at' => $date
				));
		}
    }
}
