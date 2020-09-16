FROM grafana/grafana:latest

# Add dynatrace plugin source
ADD . /var/lib/grafana/plugins/grafana-dynatrace-datasource

USER root

# Install prerequisites
RUN apk update \
    && apk add gnupg \
    && apk add curl \
    && apk add nodejs \
    && apk add npm \
    && npm install yarn -g

# Change into the dynatrace plugin directory
WORKDIR /var/lib/grafana/plugins/grafana-dynatrace-datasource

# Install dependencies and build the dynatrace plugin
RUN yarn install \
    && npm run build \
    && chown -R grafana:grafana /var/lib/grafana/plugins

USER grafana

WORKDIR /