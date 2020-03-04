<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class CategoryTableSeeder extends Seeder
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
        DB::table('categories')->delete();

		for($i = 0; $i < 100; ++$i)
		{
			$date = $this->randDate();
			DB::table('categories')->insert([
				'name' => 'last_name_categories' . $i,
				'description' => 'description' . $i . ' Lorem proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
				'created_at' => $date,
				'updated_at' => $date
			]);
		}
    }
}
