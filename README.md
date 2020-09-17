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

Checkout in `grafana-dynatrace-datasource`

Build and run:

```
cd grafana-dynatrace-datasource
docker build -t grafana:latest-with-plugins .
docker run -d -p 3000:3000 grafana:latest-with-plugins
```

### Changelog

1.0.1
- Initial release
- Update Dockerfile to build with Grafana v7.0+
