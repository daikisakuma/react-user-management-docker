@extends('layouts.taskapp')

@section('content')
<link href="{{ asset('css/reactUserManagement.css') }}" rel="stylesheet">
<div class="task2">
    <div
        id="react-user-management"
        data-asset={{ asset('') }}
        data-api-get-user={{ route('api.get.user') }}
        data-api-get-all-users={{ route('api.get.all.users') }}
        data-api-update-user={{ route('api.update.user') }}
    ></div>
</div>
@endsection
