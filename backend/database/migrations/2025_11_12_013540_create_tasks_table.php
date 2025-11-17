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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->comment('ユーザーID')->constrained();    //ユーザーID
            $table->string('title', 50)->comment('タスク名');
            $table->string('content', 250)->nullable()->comment('タスク詳細');
            $table->tinyInteger('status')->default(1)->comment('ステータス');
            $table->dateTime('start_date')->comment('開始日時');                
            $table->dateTime('due_date')->nullable()->comment('完了期限');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
