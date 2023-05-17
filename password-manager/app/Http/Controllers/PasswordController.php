<?php

namespace App\Http\Controllers;

use App\Models\Password;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    public function index()
    {
        return response()->json(Password::all(), 200);
    }

    public function show(Password $password)
    {
        return response()->json($password, 200);
    }

    public function store(Request $request)
    {
        $password = Password::create($request->validate([
            'name' => 'required|string',
            'password' => 'required|string'
        ]));

        return response()->json($password, 201);
    }

    public function update(Password $password, Request $request)
    {
        $password->update($request->validate([
            'name' => 'required|string',
            'password' => 'required|string'
        ]));

        return response()->json($password, 200);
    }

    public function destroy(Password $password)
    {
        $password->delete();

        return response()->json(null, 204);
    }
}
