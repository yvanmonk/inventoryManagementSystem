<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 245)->default(null);
            $table->longText('description')->default(null);
            $table->string('barcode', 245)->default(null);
            $table->string('statut', 245)->default(null);
            $table->string('measure', 245)->default(null);
            $table->string('price', 245)->default(null);
            $table->integer('category_id')->unsigned();
            $table->foreign('category_id')->references('id')->on('categories')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
          Schema::table('products', function(Blueprint $table) {
            $table->dropForeign('products_category_id_foreign');
        });
        Schema::dropIfExists('products');
    }
}
