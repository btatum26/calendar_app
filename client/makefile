build:
	docker build -t react-app .

run:
	docker run -i -d -p 8000:8000 react-app

run-all:
	docker build -t react-app .
	docker run -i -d -p 8000:8000 --name calendar-app react-app

stop:
	docker container stop calendar-app
	docker container rm calendar-app

restart:
	docker container stop calendar-app
	docker container rm calendar-app
	docker build -t react-app .
	docker run -i -d -p 8000:8000 --name calendar-app react-app