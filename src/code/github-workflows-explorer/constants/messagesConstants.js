const COULD_NOT_PARSE_SINGLE_FILE_BECAUSE_NAMING = 'Could not parse your github workflow files within view because some file does not follow naming convention. Be sure to name your files as `some-file.yml` or if you want them within directories then use underscore (_) as directory separator. Example: this-is_multiple_sub-directories_and-then-file-at-the-end.yml.'
const CREATE_WORKFLOWS_DIRECTORY_PROMPT = "'.github/workflows' directory doesn't exist. Create it?";
const CREATE_WORKFLOWS_DIRECTORY_SUCCESS = 'Directory created successfully.';
const CREATE_WORKFLOWS_DIRECTORY_FAILURE = 'Failed to create directory.';
const NO_WORKFLOW_FILES_MESSAGE = 'No workflow files within repository';

module.exports = {
    COULD_NOT_PARSE_SINGLE_FILE_BECAUSE_NAMING,
    CREATE_WORKFLOWS_DIRECTORY_PROMPT,
    CREATE_WORKFLOWS_DIRECTORY_SUCCESS,
    CREATE_WORKFLOWS_DIRECTORY_FAILURE,
    NO_WORKFLOW_FILES_MESSAGE
}