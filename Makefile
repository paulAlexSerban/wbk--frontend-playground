# CLEAN
clean-ds-store:
	@echo "REMOVING all .DS_Store files"
	@rm -rfv .DS_Store & rm -rfv */.DS_Store & rm -rfv */*/.DS_Store & rm -rfv */*/*/.DS_Store & rm -rfv */*/*/*/.DS_Store

clean-core-dist-app: clean-ds-store
	@echo "CLEANING ./core/dist/app/*"
	@rm -rfv ./core/dist/app

clean-core-dist: clean-core-dist-app
	@rm -rfv ./core/dist

# INSTALL
install-core-static:
	@bash core/.bash install-static

# RELEASE
release-site:
	@cp -rfv ./core/dist/app/* ./docs