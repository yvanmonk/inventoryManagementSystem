<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UserTableSeeder extends Seeder
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
       DB::table('users')->delete();

		for($i = 0; $i < 10; ++$i)
		{
			$date = $this->randDate();
			DB::table('users')->insert([
				'name' => 'name' . $i,
				'first_name' => 'first_name' . $i,
				'phone' => 'tel' . $i,
				'email' => 'email' . $i ,
				'role' => 'role' . $i ,
				'city' => 'city' . $i ,
				'address' => 'address' . $i ,
				'password' => 'password' . $i,
				'poste' => 'poste' . $i,
				'created_at' => $date,
				'updated_at' => $date
			]);
		}
    }
}
