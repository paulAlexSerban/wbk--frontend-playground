PROJECT_NAME="My New Project"
PROJECT_CATEGORY="interactions"
PROJECT_TEMPLATE="handlebars-template"
PROJECT_SLUG="my-new-project"
PROJECT_DESCRIPTION="A new project created from the handlebars template."
PROJECT_SOURCE="Frontend Forge"
PROJECT_SOURCE_URL="http://localhost:3000"

yarn new:project \
    --name "$PROJECT_NAME" \
    --category "$PROJECT_CATEGORY" \
    --template "$PROJECT_TEMPLATE" \
    --slug "$PROJECT_SLUG" \
    --description "$PROJECT_DESCRIPTION" \
    --source "$PROJECT_SOURCE" \
    --source-url "$PROJECT_SOURCE_URL"