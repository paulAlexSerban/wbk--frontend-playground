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

### Nikola Makefile
PY?=
NIKOLA?=nikola
NIKOLAOPTS=

BASEDIR=$(CURDIR)


init-site:
	@echo "Initializing Nikola site..."
	@$(NIKOLA) init --demo site
	@echo "Nikola site initialized."

build:
	@echo "Building the site..."
	@
	cd site && $(NIKOLA) build $(NIKOLAOPTS)
	@echo "Site built."

clean:
	@echo "Cleaning the output directory..."
	@$(NIKOLA) clean
	@echo "Output directory cleaned."

serve:
	@echo "Serving the site at http://localhost:8000 ..."
	@$(NIKOLA) serve $(NIKOLAOPTS)
	@echo "Site is being served."