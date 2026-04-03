<?php

namespace App\Http\Controllers;

use App\Models\Soal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SoalController extends Controller
{
    // GET /soal - Menampilkan semua soal
    public function index(Request $request)
    {
        $query = Soal::query();

        // BONUS: Filter by matkul
        if ($request->has('matkul')) {
            $query->where('matkul', 'like', '%' . $request->matkul . '%');
        }

        // BONUS: Filter by tipe
        if ($request->has('tipe')) {
            $query->where('tipe', $request->tipe);
        }

        // BONUS: Pagination
        $perPage = $request->get('per_page', 10);
        $soal = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Daftar soal berhasil diambil',
            'data' => $soal
        ], 200);
    }

    // POST /soal - Menambah soal baru
    public function store(Request $request)
    {
        // BONUS: Validasi input
        $validator = Validator::make($request->all(), [
            'matkul' => 'required|string|max:255',
            'tahun' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'tipe' => 'required|in:pilihan_ganda,essay,praktikum'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $soal = Soal::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Soal berhasil ditambahkan',
            'data' => $soal
        ], 201);
    }

    // GET /soal/{id} - Menampilkan 1 soal
    public function show($id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json([
                'success' => false,
                'message' => 'Soal tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Detail soal berhasil diambil',
            'data' => $soal
        ], 200);
    }

    // PUT /soal/{id} - Update soal
    public function update(Request $request, $id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json([
                'success' => false,
                'message' => 'Soal tidak ditemukan'
            ], 404);
        }

        // BONUS: Validasi input
        $validator = Validator::make($request->all(), [
            'matkul' => 'sometimes|required|string|max:255',
            'tahun' => 'sometimes|required|integer|min:2000|max:' . (date('Y') + 1),
            'tipe' => 'sometimes|required|in:pilihan_ganda,essay,praktikum'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $soal->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Soal berhasil diupdate',
            'data' => $soal
        ], 200);
    }

    // DELETE /soal/{id} - Hapus soal
    public function destroy($id)
    {
        $soal = Soal::find($id);

        if (!$soal) {
            return response()->json([
                'success' => false,
                'message' => 'Soal tidak ditemukan'
            ], 404);
        }

        $soal->delete();

        return response()->json([
            'success' => true,
            'message' => 'Soal berhasil dihapus'
        ], 200);
    }
}
