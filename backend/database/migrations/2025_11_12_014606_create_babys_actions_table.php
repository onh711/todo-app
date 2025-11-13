<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('babys_actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('actionid')->comment('アクションID')->constrained(table:'babys', indexName:'id'); 
            $table->tinyInteger('action')->comment('アクション');
            $table->boolean('cry')->default(false)->comment('泣いていたか'); 
            $table->timestamp('action_date')->comment('行動時間');
            $table->tinyInteger('milk_amount')->nullable()->comment('ミルクを飲んだ量');
            $table->string('memo', 250)->nullable()->comment('メモ');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('babys_actions');
    }
};
