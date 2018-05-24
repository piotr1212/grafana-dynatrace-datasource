## Dynatrace Datasource - graph metrics from Dynatrace

Grafana Plugin to Graph timeseries from Dynatraces API

![](https://raw.githubusercontent.com/piotr1212/grafana-dynatrace-datasource/master/docs/example_panel.png)

More information on the [Dynatrace API](https://www.dynatrace.com/support/help/dynatrace-api/timeseries/how-do-i-fetch-the-metrics-of-monitored-entities/)


## Limitations and issues

- Only proxy mode supported
- Only on premise installations
- Problems and events API are not implemented, only Timeseries


## Installation

Checkout in `grafana/data/plugins`, run the commands listed in "Dev setup" and restart Grafana.


### Dev setup

```
npm install yarn
./node_modules/yarn/bin/yarn install
npm run build
```

## Building a custom Grafana image

Checkout in `grafana-dynatrace-datasource`, create a `Dockerfile`:

```
FROM grafana/grafana:latest

# Add dynatrace plugin source
ADD grafana-dynatrace-datasource /var/lib/grafana/plugins/grafana-dynatrace-datasource

USER root

# Install prerequisites
RUN apt-get update \
    && apt-get install -y gnupg \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && apt-get install -y nodejs \
    && npm install yarn -g

# Change into the dynatrace plugin directory
WORKDIR /var/lib/grafana/plugins/grafana-dynatrace-datasource

# Install dependencies and build the dynatrace plugin
RUN yarn install \
    && npm run build \
    && chown -R grafana:grafana /var/lib/grafana/plugins

USER grafana

WORKDIR /

```

Build and run:

```
docker build -t grafana:latest-with-plugins .
docker run -d -p 3000:3000 grafana:latest-with-plugins
```

### Changelog

1.0.0
- Initial release
