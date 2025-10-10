setup_venv:
	@echo "Setting up virtual environment..."
	@python3.12 -m venv .venv

# run this manually if you want to activate the virtual environment - make does not support activating venvs directly
# activate_venv:
# 	@echo "Activating virtual environment..."
# 	. .venv/bin/activate

install_deps:
	@echo "Installing dependencies..."
	@pip install -r requirements.txt	
	@echo "Dependencies installed."

lint:
	@echo "Linting..."
	@pylint . --rcfile=.pylintrc -r y
	@echo "Linting done."
