# Implementing Spatie's Permissions package into Inertia Laravel project.

Easy to use package to implement Spatie's Permissions package into Inertia Laravel project. 

## Installation

You can install the package via composer:

```bash
composer require martinshaw/laravel-inertia-react-permissions
```

You can publish and run the migrations with

```bash
php artisan migrate
```

Add the following to your vite.config.js file
    
```js
resolve: {
    alias: {
        '@laravel-inertia-permissions': '/vendor/martinshaw/laravel-inertia-react-permissions/resources/js'
    }
}
```

Optionally, you can add the following to your jsconfig.json file:
```json
{
    "compilerOptions": {
        "paths": {
            "@laravel-inertia-permissions/*": ["./vendor/martinshaw/laravel-inertia-react-permissions/resources/js/*"]
        }
    }
}
```

[//]: # (Optionally, you can publish the views using)

[//]: # ()
[//]: # (```bash)

[//]: # (php artisan vendor:publish --tag=":package_slug-views")

[//]: # (```)

## Usage

Permissions and Roles are automatically Shared with Inertia. 
You can access them in your Vue components like this:

```js
import usePermissions from '@laravel-inertia-permissions/Uses/usePermissions';

const { can, is } = usePermissions()

if (can('edit articles')) {
    // do something
}

if (is('writer')) {
    // do something
}
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Credits

- [Wij zijn WEB](https://github.com/wijzijnweb)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
