# github-actions-explorer
This should be plugin supported by multiple IDEs like JetBrain IDEs, VS and VS Code, supporting separate view for workflow files.
Since GitHub is too lazy to make feature of organizing files within multi layered directory, this plugin should mimick sub-folder structure using file names.

Name your files with some underscores (_) like `first-folder_sub-folder_my-file.yml` and see magic

<img width="650" height="531" alt="image" src="https://github.com/user-attachments/assets/f77522d3-21dc-44af-9cc8-d09a90f9e1a4" />
<img width="1187" height="504" alt="image" src="https://github.com/user-attachments/assets/d82a50e5-2c8d-42fa-9d1a-1b6b640811f2" />


General idea is having files named as:
 - crons_danas-update_build.yml
 - crons_danas-update_release.yml
 - crons_order-status-check_build.yml
 - crons_order-status-check_release.yml
 - web_admin-api_build.yml
 - web_admin-api_release.yml
 - web_admin-fe_build.yml
 - web_admin-fe_release.yml
 - web_public-api_build.yml
 - web_public-api_release.yml
 - web_public-fe_build.yml
 - web_public-fe_release.yml
 - tests_web-admin.yml
 - tests_web-public.yml

which would remain within root .github/workflows directory, however within viewer would be organized as:
 - crons
   - danas-update
     - build.yml
     - release.yml
   - order-status-check
     - build.yml
     - release.yml
   - web
     - admin-api
       - build.yml
       - relase.yml
     - admin-fe
       - build.yml
       - release.yml
     - public-api
       - build.yml
       - relase.yml
     - public-fe
       - build.yml
       - release.yml
   - tests
     - web-admin.yml
     - web-publice.yml

To achieve this, plan is to use `_` as directory separator
