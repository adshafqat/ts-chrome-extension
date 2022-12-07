To build from ts to js
npm run dist


Open Telemantory Required packages
npm install @opentelemetry/api    @opentelemetry/context-zone    @opentelemetry/exporter-collector   @opentelemetry/instrumentation-document-load   @opentelemetry/propagator-b3 @opentelemetry/sdk-trace-base    @opentelemetry/sdk-trace-web @opentelemetry/instrumentation-xml-http-request
sudo npm install copyfiles -g

If you want to mofdify otel config
sudo vi /etc/otelcol/config.yaml
sudo service otelcol restart
sudo service otelcol status
journalctl | grep otelcol 

Solution to send data to Open tel. The prerequisist for this is that opentelemetry should be installed on the vm. The disadvatage of local opentel instance is that you can't run jaeger or zipkin instances becuase it says that ports are already used 
https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-http

Helpful solution (Not used)
https://stackoverflow.com/questions/63485673/how-to-correctly-use-opentelemetry-exporter-with-opentelemetry-collector-in-clie/63489195#63489195

To start the docker container containing both zipkin and opentel use below command under docker folder (Not used)
sudo docker compose up

Jaeger URL
http://localhost:16686/search

Zipkin URL (Not used)
http://127.0.0.1:9411/zipkin/dependency

The final issue. I am seeing this error in the browser. It seems like webpage cannot push data to url: "http://localhost:55680/v1/traces",
Failed to load resource: net::ERR_CONNECTION_RESET



References
Good article (Not Used)
https://scoutapm.com/blog/opentelemetry-in-javascript

local collector setup (Used)
https://scoutapm.com/blog/configuring-opentelemetry-collector
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.66.0/otelcol_0.66.0_linux_amd64.deb
sudo dpkg -i otelcol_0.66.0_linux_amd64.deb 

Running otel agent as a docker container (Not used)
sudo docker pull otel/opentelemetry-collector:0.66.0
sudo docker run otel/opentelemetry-collector:0.66.0
sudo docker run -v $(pwd)/collector-config.yaml:/etc/otelcol/config.yaml otel/opentelemetry-collector:0.66.0



Local Jaeger setup (not used)
sudo docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:latest






Useful git commands
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/adshafqat/ts-chrome-extension.git
git push -u origin main
