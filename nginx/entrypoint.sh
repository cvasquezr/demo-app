#!/bin/sh
# Substitute only ${PORT} — leaves nginx variables like $host, $backend intact
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g "daemon off;"
