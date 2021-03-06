# ...
export PROJECT = feedbacker

# target:
# target: all - Default target. Does nothing
.PHONY: all
all:
	@echo "Hello $(LOGNAME), nothing to do by default"


# target: help - Display callable targets
.PHONY: help
help:
	@egrep "^# target:|-\ .+" [Mm]akefile --color=auto|column -t -s -



# ========= pull ==============
pull:
	@echo "---> pull python:2.7-slim"
	@docker pull python:2.7-slim
	# ...
	@echo "---> pull nginx:1.12.1-alpine"	
	@docker pull nginx:1.12.1-alpine

# target:
# target: ===== build ======= - ============================

# target: build_frontface - build frontface image
.PHONY: build_frontface
build_frontface:
	@docker-compose \
		-p $(PROJECT) \
		-f build.yml \
		build \
		frontface


# target: build_router - build router image
.PHONY: build_router
build_router:
	@docker-compose \
		-p $(PROJECT) \
		-f build.yml \
		build \
		router		

# target: build_all - build all image
.PHONY: build_all
build_all:
	@echo "---> build frontface"
	@make build_frontface
	# ...
	@echo "---> build router"
	@make build_router

# target:
# target: ===== bootstrap === - ============================


# target: bootstrap_frontface - bootstrap frontface contaner
.PHONY: bootstrap_frontface
bootstrap_frontface:
	@docker-compose \
		-p $(PROJECT) \
		-f bootstrap.yml \
		run \
		--rm \
		frontface


# target: bootstrap_all - bootstrap all image
.PHONY: bootstrap_all
bootstrap_all:
	@echo "---> bootstrap frontface"
	@make bootstrap_frontface

# target:
# target: ===== shell ======= - ============================

# target: shell_frontface - shell frontface container
.PHONY: shell_frontface
shell_frontface:
	@docker-compose \
		-p $(PROJECT) \
		-f run.yml \
		run \
		--rm \
		--service-ports \
		--name $(PROJECT)_frontface_1 \
		frontface \
		/bin/bash


# target: shell_router - shell router container
.PHONY: shell_router
shell_router:
	@docker-compose \
		-p $(PROJECT) \
		-f shell.yml \
		run \
		--rm \
		--service-ports \
		--name $(PROJECT)_router_1 \
		router \
		/bin/sh		



# target:
# target: ===== misc ======== - ============================

# target: down - run all contaner in project
.PHONY: up
up:
	@docker-compose \
		-p $(PROJECT) \
		-f run.yml \
		up

# target: down - shutdown all contaner in project
.PHONY: down
down:
	@docker-compose \
		-p $(PROJECT) \
		-f run.yml \
		down	


# target: ps - watch all process all contaner in project
.PHONY: ps
ps:
	@docker-compose \
		-p $(PROJECT) \
		-f run.yml \
		ps

# target: clear - clear untuged images in project
.PHONY: clear
clear:
	@../../scripts/clear_untagged.sh


# target: images - show all images in project
.PHONY: images
images:
	@docker images |grep $(PROJECT)


# target: volumes - show all volumes in project
.PHONY: volumes
volumes:
	@docker volume ls |grep $(PROJECT)


# target: rmi - remove all images in project
.PHONY: rmi
rmi:
	@docker rmi `docker images |grep $(PROJECT) |xargs -L1 | awk '{print $1}'`


# target: rmvol - remove all volumes in project
.PHONY: rmvol
rmvol:
	@docker volume rm `docker volume ls |grep $(PROJECT) |xargs -L1 | awk "{print $2}"`
# ...




