build:
	cd server && $(MAKE) build
	cd client && $(MAKE) build

build-server:
	cd server && $(MAKE) build

build-client:
	cd client && $(MAKE) build

run:
	docker compose up -d

stop:
	docker compose down