<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SoalController;

Route::get('/soal', [SoalController::class, 'index']);
Route::post('/soal', [SoalController::class, 'store']);
Route::get('/soal/{id}', [SoalController::class, 'show']);
Route::put('/soal/{id}', [SoalController::class, 'update']);
Route::delete('/soal/{id}', [SoalController::class, 'destroy']);