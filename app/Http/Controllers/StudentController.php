<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $students = Student::all();
        return $students;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required',
            'nim' => 'required',
            'email' => 'required|email',
            'jurusan' => 'required',
        ]);

        $student = Student::create($data);

        return response()->json([
            'status' => 'success',
            'data' => $student
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $student = Student::find($id);

        if ($student) {
            return response()->json([
                'status' => 'success',
                'data' => $student
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'student not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if ($student) {
            $student->update($request->all());
            return response()->json([
                'status' => 'success',
                'data' => $student
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'student not found'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = Student::find($id);

        if ($student) {
            $student->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'data was deleted'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'data not found'
            ], 404);
        }
    }
}
