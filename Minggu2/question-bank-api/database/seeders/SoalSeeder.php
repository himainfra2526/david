<?php

namespace Database\Seeders;

use App\Models\Soal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SoalSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $data = [
            ['matkul' => 'Algoritma dan Pemrograman', 'tahun' => 2022, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Algoritma dan Pemrograman', 'tahun' => 2023, 'tipe' => 'essay'],
            ['matkul' => 'Algoritma dan Pemrograman', 'tahun' => 2024, 'tipe' => 'praktikum'],
            ['matkul' => 'Struktur Data', 'tahun' => 2021, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Struktur Data', 'tahun' => 2022, 'tipe' => 'essay'],
            ['matkul' => 'Struktur Data', 'tahun' => 2023, 'tipe' => 'praktikum'],
            ['matkul' => 'Basis Data', 'tahun' => 2020, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Basis Data', 'tahun' => 2021, 'tipe' => 'essay'],
            ['matkul' => 'Basis Data', 'tahun' => 2023, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Pemrograman Web', 'tahun' => 2022, 'tipe' => 'praktikum'],
            ['matkul' => 'Pemrograman Web', 'tahun' => 2023, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Pemrograman Web', 'tahun' => 2024, 'tipe' => 'essay'],
            ['matkul' => 'Jaringan Komputer', 'tahun' => 2021, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Jaringan Komputer', 'tahun' => 2022, 'tipe' => 'essay'],
            ['matkul' => 'Jaringan Komputer', 'tahun' => 2024, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Sistem Operasi', 'tahun' => 2020, 'tipe' => 'essay'],
            ['matkul' => 'Sistem Operasi', 'tahun' => 2022, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Sistem Operasi', 'tahun' => 2023, 'tipe' => 'praktikum'],
            ['matkul' => 'Matematika Diskrit', 'tahun' => 2021, 'tipe' => 'essay'],
            ['matkul' => 'Matematika Diskrit', 'tahun' => 2022, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Matematika Diskrit', 'tahun' => 2023, 'tipe' => 'essay'],
            ['matkul' => 'Kalkulus', 'tahun' => 2020, 'tipe' => 'pilihan_ganda'],
            ['matkul' => 'Kalkulus', 'tahun' => 2021, 'tipe' => 'essay'],
            ['matkul' => 'Rekayasa Perangkat Lunak', 'tahun' => 2023, 'tipe' => 'essay'],
            ['matkul' => 'Rekayasa Perangkat Lunak', 'tahun' => 2024, 'tipe' => 'pilihan_ganda'],
        ];

        foreach ($data as $item) {
            Soal::create($item);
        }
    }
}
