#!/bin/sh
# Read the real DNS resolver from the container's resolv.conf
DNS_RESOLVER=$(grep nameserver /etc/resolv.conf | head -1 | awk '{print $2}')
DNS_RESOLVER=${DNS_RESOLVER:-1.1.1.1}

# nginx requires IPv6 resolver addresses in brackets: [fd12::10]
if echo "$DNS_RESOLVER" | grep -q ':'; then
    DNS_RESOLVER="[$DNS_RESOLVER]"
fi
export DNS_RESOLVER

# Substitute only ${PORT} and ${DNS_RESOLVER} — nginx vars like $host are left intact
envsubst '${PORT} ${DNS_RESOLVER}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g "daemon off;"
