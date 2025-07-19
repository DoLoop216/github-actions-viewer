# 🧭 GitHub Actions Explorer

A cross-platform IDE plugin designed to streamline your GitHub workflow files. Supports [VS Code](https://marketplace.visualstudio.com/items?itemName=LimitlessSoft.github-workflows-explorer), JetBrains IDEs (To be implemented) and Visual Studio (To be implemented).

GitHub doesn't natively support organizing workflow files into nested folders, so everything ends up in `.github/workflows`. This plugin introduces a clever workaround: it mimics folder hierarchies using underscores (`_`) in filenames, giving your workflows the organized structure they deserve.

Use `_` as a directory separator in your filenames. For example:
`first-folder_sub-folder_my-file.yml`
will appear in the plugin interface as:
```
first-folder/
└── sub-folder/
    └── my-file.yml
```

Here’s how your files should be named in `.github/workflows`:
```
crons_danas-update_build.yml
crons_danas-update_release.yml
crons_order-status-check_build.yml
crons_order-status-check_release.yml
web_admin-api_build.yml
web_admin-api_release.yml
web_admin-fe_build.yml
web_admin-fe_release.yml
web_public-api_build.yml
web_public-api_release.yml
web_public-fe_build.yml
web_public-fe_release.yml
tests_web-admin.yml
tests_web-public.yml
```

And this is how they’ll appear in the plugin:
```
crons/
├── danas-update/
│   ├── build.yml
│   └── release.yml
├── order-status-check/
│   ├── build.yml
│   └── release.yml

web/
├── admin-api/
│   ├── build.yml
│   └── release.yml
├── admin-fe/
│   ├── build.yml
│   └── release.yml
├── public-api/
│   ├── build.yml
│   └── release.yml
├── public-fe/
│   ├── build.yml
│   └── release.yml

tests/
├── web-admin.yml
└── web-public.yml
```

Screenshots of the plugin view:
![Example View 1](https://github.com/user-attachments/assets/f77522d3-21dc-44af-9cc8-d09a90f9e1a4)
![Example View 2](https://github.com/user-attachments/assets/d82a50e5-2c8d-42fa-9d1a-1b6b640811f2)

Future plans: support for customizable separators, drag-and-drop folder simulation, and integration with GitHub API for metadata enrichment.
