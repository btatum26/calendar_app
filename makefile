build:
	cd express-app && $(MAKE) build
	cd react-app && $(MAKE) build

build-server:
	cd expres-app && $(MAKE) build

build-client:
	cd react-app && $(MAKE) build

run:
	docker compose up -d

stop:
	docker compose down