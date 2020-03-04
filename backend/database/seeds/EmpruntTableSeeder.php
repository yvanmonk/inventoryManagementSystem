<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EmpruntTableSeeder extends Seeder
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
        for($i = 1; $i <= 100; ++$i)
		{
			$numbers = range(1, 20);

			shuffle($numbers);
			$n = rand(3, 6);
			for($j = 1; $j < $n; ++$j)
			{
				$date = $this->randDate();
				DB::table('product_user')->insert(array(
					'user_id' =>$i ,
					'product_id' => $numbers[$j],
					'created_at' => $date,
					'updated_at' => $date
				));
			}
		}
	}
}
