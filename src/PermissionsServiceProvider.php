<?php

namespace Wijzijnweb\LaravelInertiaPermissions;

use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\ServiceProvider;
use Spatie\Permission\Models\Permission;
use Wijzijnweb\LaravelInertiaPermissions\App\Models\PermissionGroup;

class PermissionsServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->publishesMigrations([__DIR__.'/../database/migrations']);

        Inertia::share([
            'user_permissions' => function () {
                $user = auth()->user();
                return $user ? [
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                    'roles' => $user->roles->pluck('name'),
                    'uses_wildcards' => config('permission.enable_wildcard_permission', false),
                    'debug' => config('app.debug', false),
                ] : [];
            },
            // 'permissions' => function () {
            //     return [
            //         'groups' => PermissionGroup::with('permissions')->get(),
            //         'permissions' => Permission::get(),
            //         'roles' => Role::get(),
            //     ];
            // },
        ]);
    }
}
