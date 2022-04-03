# Spotify Preparation

## Authenticate Account

> https://accounts.spotify.com/authorize?client_id=CLIENT_ID_HERE&response_type=code&redirect_uri=http
%3A%2F%2Flocalhost:3000&scope=user-read-currently-playing

Get the &code from the uri

> AQAUkKKx9Zo0PgWmri9kfnxeCx3n6eNgXhS6t4_kjfFM_vrQm0WRKVJi2xtCp35Glcc9JlP6FTuAOpX9B9FWbOBBZ5bKBcHHgg3z6n66hmApnAeambhKeQ_vxg6kHvqsH6Aa3hxYoNVgzZeVgxbjVFQn7O6wPzFXtEt7VyDkzmUAuYn9bGMtpL--5KCrWG-OfcTN0hHd

Encrypt your client_id:client_secret in base64

> ODYwNzYzZDYxZDJlNGQ3NDg4NmE4YjM4YmQ0YWI1MWU6MDJlYzZmMTBlYzJlNDI1ZGI4Mzg4YmU0YzJjMTAzM2E=

Call with `curl` the authorization API

```shell
curl -H "Authorization: Basic ODYwNzYzZDYxZDJlNGQ3NDg4NmE4YjM4YmQ0YWI1MWU6MDJlYzZmMTBlYzJlNDI1ZGI4Mzg4YmU0YzJjMTAzM2E=" -d grant_type=authorization_code -d code=AQAUkKKx9Zo0PgWmri9kfnxeCx3n6eNgXhS6t4_kjfFM_vrQm0WRKVJi2xtCp35Glcc9JlP6FTuAOpX9B9FWbOBBZ5bKBcHHgg3z6n66hmApnAeambhKeQ_vxg6kHvqsH6Aa3hxYoNVgzZeVgxbjVFQn7O6wPzFXtEt7VyDkzmUAuYn9bGMtpL--5KCrWG-OfcTN0hHd -d redirect_uri=http%3A%2F%2Flocalhost:3000 https://accounts.spotify.com/api/token
```

> Response

```json
{"access_token":"BQD3iE9H0PBHKC5l6oAKVho_dpiQyLCTnnVc7dcAqJ3MclZVYS7vpb565Fxy197FJIMCxEnsVeiW8FTdR_QVyxzK4sp0vK2u2gWWvIV7fNqfJwDMCbTiP5sC1oyITS72twFzWg9r8lYgz4x5dbBdEIcOPqwtFHxuEEUG-B83xEc","token_type":"Bearer","expires_in":3600,"refresh_token":"AQBwCTgmAl8CxW2tFwtHFziurbTcxx_gOVP3Jq5kCFQbIkI-Gue18yGQrn3muiTriEDNmYwUFeqXyvJgegNRLwdGuiSj7h8NWN1X2rrcsAug3TTzUP0nUK0wUwSFQXVxMd4","scope":"user-read-currently-playing"}
```

curl -X "GET" "https://api.spotify.com/v1/me/player/currently-playing" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQD3iE9H0PBHKC5l6oAKVho_dpiQyLCTnnVc7dcAqJ3MclZVYS7vpb565Fxy197FJIMCxEnsVeiW8FTdR_QVyxzK4sp0vK2u2gWWvIV7fNqfJwDMCbTiP5sC1oyITS72twFzWg9r8lYgz4x5dbBdEIcOPqwtFHxuEEUG-B83xEc"